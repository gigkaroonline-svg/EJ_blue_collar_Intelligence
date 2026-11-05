import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';

import '../../../core/errors/api_error.dart';
import '../data/catalog_repository.dart';
import '../models/catalog_job.dart';

/// Search-as-you-type job/trade field (backed by `/jobs`, not `/skills`).
class JobSearchField extends ConsumerStatefulWidget {
  const JobSearchField({
    super.key,
    required this.onSelected,
    this.initial,
    this.label,
  });

  final ValueChanged<CatalogJob?> onSelected;
  final CatalogJob? initial;
  final String? label;

  @override
  ConsumerState<JobSearchField> createState() => _JobSearchFieldState();
}

class _JobSearchFieldState extends ConsumerState<JobSearchField> {
  CatalogJob? _selected;
  String _query = '';
  Timer? _debounce;
  Completer<List<CatalogJob>>? _inflight;
  List<CatalogJob> _lastOptions = const [];

  @override
  void initState() {
    super.initState();
    _selected = widget.initial;
  }

  @override
  void dispose() {
    _debounce?.cancel();
    super.dispose();
  }

  void _showError(Object error) {
    final message = error is ApiError ? error.error : error.toString();
    ScaffoldMessenger.maybeOf(context)
      ?..hideCurrentSnackBar()
      ..showSnackBar(SnackBar(content: Text(message)));
  }

  Future<List<CatalogJob>> _search(String raw) async {
    final query = raw.trim();
    _query = query;

    if (_inflight != null && !_inflight!.isCompleted) {
      _inflight!.complete(_lastOptions);
    }

    final completer = Completer<List<CatalogJob>>();
    _inflight = completer;

    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 300), () async {
      try {
        final matches = await ref.read(catalogRepositoryProvider).searchJobs(query);
        if (!mounted || _query != query) {
          if (!completer.isCompleted) completer.complete(_lastOptions);
          return;
        }
        _lastOptions = matches;
        if (!completer.isCompleted) completer.complete(matches);
      } catch (e) {
        if (!completer.isCompleted) completer.complete(_lastOptions);
        if (mounted) _showError(e);
      }
    });

    return completer.future;
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    return Autocomplete<CatalogJob>(
      displayStringForOption: (job) => job.name,
      optionsBuilder: (value) => _search(value.text),
      onSelected: (job) {
        setState(() => _selected = job);
        widget.onSelected(job);
      },
      initialValue: _selected == null ? null : TextEditingValue(text: _selected!.name),
      fieldViewBuilder: (context, controller, focusNode, onFieldSubmitted) {
        return TextFormField(
          controller: controller,
          focusNode: focusNode,
          textInputAction: TextInputAction.search,
          decoration: InputDecoration(
            labelText: widget.label ?? l10n.primaryTrade,
            hintText: 'Search a trade (e.g. Mason)',
            prefixIcon: const Icon(Icons.handyman_outlined),
            suffixIcon: _selected != null
                ? Icon(
                    Icons.check_circle,
                    color: Theme.of(context).colorScheme.primary,
                  )
                : null,
          ),
          validator: (_) {
            if (_selected == null) return l10n.requiredField;
            return null;
          },
          onChanged: (text) {
            if (_selected != null && text.trim() != _selected!.name) {
              setState(() => _selected = null);
              widget.onSelected(null);
            }
          },
          onFieldSubmitted: (_) => onFieldSubmitted(),
        );
      },
      optionsViewBuilder: (context, onSelected, options) {
        if (options.isEmpty) {
          return const SizedBox.shrink();
        }
        return Align(
          alignment: Alignment.topLeft,
          child: Material(
            elevation: 4,
            borderRadius: BorderRadius.circular(8),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxHeight: 220, maxWidth: 360),
              child: ListView.builder(
                padding: EdgeInsets.zero,
                shrinkWrap: true,
                itemCount: options.length,
                itemBuilder: (context, index) {
                  final option = options.elementAt(index);
                  return ListTile(
                    dense: true,
                    leading: const Icon(Icons.handyman_outlined),
                    title: Text(option.name),
                    onTap: () => onSelected(option),
                  );
                },
              ),
            ),
          ),
        );
      },
    );
  }
}
