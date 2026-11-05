import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../core/errors/api_error.dart';
import '../core/ui/app_shimmer.dart';
import '../features/uploads/data/uploads_repository.dart';
import '../theme/app_styles.dart';
import 'availability_actions.dart';
import 'availability_chip.dart';
import 'tradesperson.dart';
import 'tradespeople_provider.dart';
import 'document_ui.dart';
import 'work_history_tile.dart';

class TradespersonDetailPage extends ConsumerWidget {
  const TradespersonDetailPage({super.key, required this.tradespersonId});

  final String tradespersonId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final asyncList = ref.watch(tradespeopleProvider);
    final textTheme = Theme.of(context).textTheme;

    return asyncList.when(
      loading: () => Scaffold(
        appBar: AppBar(title: Text(l10n.tradesperson)),
        body: const TradespersonDetailSkeleton(),
      ),
      error: (error, _) {
        final message = error is ApiError ? error.error : 'Something went wrong';
        return Scaffold(
          appBar: AppBar(title: Text(l10n.tradesperson)),
          body: Center(child: Text(message)),
        );
      },
      data: (tradespeople) {
        Tradesperson? tradesperson;
        for (final item in tradespeople) {
          if (item.id == tradespersonId) {
            tradesperson = item;
            break;
          }
        }

        if (tradesperson == null) {
          return Scaffold(
            appBar: AppBar(title: Text(l10n.tradesperson)),
            body: Center(child: Text(l10n.tradespersonNotFound)),
          );
        }

        final person = tradesperson;
        final personal = person.personal;

        return DefaultTabController(
          length: 3,
          child: Scaffold(
            appBar: AppBar(
              title: Text(personal.fullName),
              actions: [
                Builder(
                  builder: (buttonContext) {
                    return TextButton(
                      onPressed: () {
                        final tab =
                            DefaultTabController.of(buttonContext).index;
                        buttonContext.push(
                          '/tradesperson/$tradespersonId/edit?tab=$tab',
                        );
                      },
                      child: Text(l10n.editTradesperson),
                    );
                  },
                ),
              ],
            ),
            body: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding: EdgeInsets.fromLTRB(20.w, 12.h, 20.w, 0),
                  child: Card(
                    child: Padding(
                      padding: AppStyles.cardPadding,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(personal.fullName, style: textTheme.headlineSmall),
                          const SizedBox(height: 8),
                          AvailabilityChip(
                            isAvailable: person.isReadyToWork,
                            onTap: () => changeAvailability(context, ref, person),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                TabBar(
                  tabs: [
                    Tab(text: l10n.personal),
                    Tab(text: l10n.documents),
                    Tab(text: l10n.experience),
                  ],
                ),
                Expanded(
                  child: TabBarView(
                    children: [
                      _PersonalTab(personal: personal),
                      _DocumentsTab(documents: person.documents),
                      _ExperienceTab(tradesperson: person),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _PersonalTab extends StatelessWidget {
  const _PersonalTab({required this.personal});

  final TradespersonPersonal personal;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    return ListView(
      padding: AppStyles.detailPadding,
      children: [
        _InfoCard(
          rows: [
            _InfoRow(label: l10n.phone, value: '+91 ${personal.phoneNumber}'),
            _InfoRow(label: l10n.gender, value: personal.gender),
            _InfoRow(label: l10n.dateOfBirth, value: personal.dateOfBirth),
          ],
        ),
        const SizedBox(height: 16),
        _InfoCard(
          title: l10n.permanentAddress,
          rows: _addressRows(l10n, personal.permanentAddress),
        ),
        const SizedBox(height: 16),
        _InfoCard(
          title: l10n.currentAddress,
          rows: _addressRows(l10n, personal.currentAddress),
        ),
      ],
    );
  }

  List<_InfoRow> _addressRows(AppLocalizations l10n, Address address) {
    return [
      _InfoRow(label: l10n.addressLine, value: address.addressLine),
      _InfoRow(label: l10n.villageOrTown, value: address.villageOrTown),
      _InfoRow(label: l10n.district, value: address.district),
      _InfoRow(label: l10n.state, value: address.state),
      _InfoRow(label: l10n.pincode, value: address.pincode),
    ];
  }
}

class _ExperienceTab extends StatelessWidget {
  const _ExperienceTab({required this.tradesperson});

  final Tradesperson tradesperson;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final experience = tradesperson.experience;
    final history = tradesperson.sortedWorkHistory;
    final textTheme = Theme.of(context).textTheme;

    return ListView(
      padding: AppStyles.detailPadding,
      children: [
        _InfoCard(
          rows: [
            _InfoRow(label: l10n.primaryTrade, value: experience.primaryTrade),
            _InfoRow(
              label: l10n.subSkills,
              value: experience.subSkills.isEmpty
                  ? '—'
                  : experience.subSkills.join(', '),
            ),
            _InfoRow(
              label: l10n.experience,
              value: '${experience.yearsOfExperience} ${l10n.years}',
            ),
            _InfoRow(
              label: l10n.dailyWageExpected,
              value: '₹${experience.dailyWageExpected}',
            ),
          ],
        ),
        const SizedBox(height: 16),
        Text(l10n.workHistory, style: textTheme.titleMedium),
        const SizedBox(height: 8),
        if (history.isEmpty)
          Text(l10n.noWorkHistory)
        else
          for (final entry in history) ...[
            WorkHistoryTile(entry: entry),
            const SizedBox(height: 8),
          ],
      ],
    );
  }
}

class _DocumentsTab extends StatelessWidget {
  const _DocumentsTab({required this.documents});

  final List<TradespersonDocument> documents;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    if (documents.isEmpty) {
      return Center(child: Text(l10n.noDocuments));
    }

    return ListView.separated(
      padding: AppStyles.detailPadding,
      itemCount: documents.length,
      separatorBuilder: (_, _) => const SizedBox(height: 8),
      itemBuilder: (context, index) {
        final doc = documents[index];
        return _DocumentTile(document: doc);
      },
    );
  }
}

class _DocumentTile extends ConsumerWidget {
  const _DocumentTile({required this.document});

  final TradespersonDocument document;

  bool get _isGcsKey {
    final path = document.imagePath;
    return path != null && path.startsWith('partners/');
  }

  void _openPreview(BuildContext context) {
    final key = document.imagePath;
    if (key == null || !_isGcsKey) return;

    Navigator.of(context).push(
      MaterialPageRoute<void>(
        fullscreenDialog: true,
        builder: (_) => _DocumentImagePreviewPage(
          objectKey: key,
          title: documentLabel(AppLocalizations.of(context)!, document),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    return Card(
      child: ListTile(
        leading: Icon(documentTypeIcon(document.type)),
        title: Text(documentLabel(l10n, document)),
        trailing: document.imagePath == null
            ? null
            : Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: muted.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(Icons.image_outlined, color: muted),
              ),
        onTap: _isGcsKey ? () => _openPreview(context) : null,
      ),
    );
  }
}

/// Full-screen preview: keeps a stable loader until signed URL + image pixels are ready.
class _DocumentImagePreviewPage extends ConsumerStatefulWidget {
  const _DocumentImagePreviewPage({
    required this.objectKey,
    required this.title,
  });

  final String objectKey;
  final String title;

  @override
  ConsumerState<_DocumentImagePreviewPage> createState() =>
      _DocumentImagePreviewPageState();
}

class _DocumentImagePreviewPageState
    extends ConsumerState<_DocumentImagePreviewPage> {
  late final Future<String> _signedUrlFuture;

  @override
  void initState() {
    super.initState();
    _signedUrlFuture =
        ref.read(uploadsRepositoryProvider).signedReadUrl(widget.objectKey);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        title: Text(widget.title),
      ),
      body: FutureBuilder<String>(
        future: _signedUrlFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState != ConnectionState.done) {
            return const Center(
              child: CircularProgressIndicator(color: Colors.white),
            );
          }
          if (snapshot.hasError || snapshot.data == null) {
            final message = snapshot.error is ApiError
                ? (snapshot.error! as ApiError).error
                : 'Could not open image';
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Text(
                  message,
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.white),
                ),
              ),
            );
          }

          return InteractiveViewer(
            minScale: 1,
            maxScale: 4,
            child: Center(
              child: Image.network(
                snapshot.data!,
                fit: BoxFit.contain,
                loadingBuilder: (context, child, progress) {
                  if (progress == null) return child;
                  return SizedBox(
                    height: MediaQuery.sizeOf(context).height * 0.5,
                    child: const Center(
                      child: CircularProgressIndicator(color: Colors.white),
                    ),
                  );
                },
                errorBuilder: (context, error, stackTrace) {
                  return const Padding(
                    padding: EdgeInsets.all(24),
                    child: Text(
                      'Could not load image',
                      style: TextStyle(color: Colors.white),
                    ),
                  );
                },
              ),
            ),
          );
        },
      ),
    );
  }
}

class _InfoCard extends StatelessWidget {
  const _InfoCard({this.title, required this.rows});

  final String? title;
  final List<_InfoRow> rows;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Card(
      child: Padding(
        padding: EdgeInsets.fromLTRB(20.w, 16.h, 20.w, 8.h),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (title != null) ...[
              Text(title!, style: textTheme.titleMedium),
              const SizedBox(height: 8),
            ],
            ...rows,
          ],
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  const _InfoRow({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 130,
            child: Text(label, style: textTheme.bodyMedium?.copyWith(color: muted)),
          ),
          Expanded(child: Text(value, style: textTheme.bodyLarge)),
        ],
      ),
    );
  }
}
