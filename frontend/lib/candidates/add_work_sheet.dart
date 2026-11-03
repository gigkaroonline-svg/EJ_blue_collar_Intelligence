import 'package:flutter/material.dart';
import 'package:frontend/l10n/app_localizations.dart';

import 'candidate.dart';
import 'work_date_format.dart';

Future<WorkEntry?> showAddWorkSheet(BuildContext context) {
  return showModalBottomSheet<WorkEntry>(
    context: context,
    isScrollControlled: true,
    builder: (context) => const _AddWorkSheet(),
  );
}

class _AddWorkSheet extends StatefulWidget {
  const _AddWorkSheet();

  @override
  State<_AddWorkSheet> createState() => _AddWorkSheetState();
}

class _AddWorkSheetState extends State<_AddWorkSheet> {
  final _formKey = GlobalKey<FormState>();
  final _customCompany = TextEditingController();
  final _trade = TextEditingController();

  String? _selectedCompanyId;
  bool _stillWorking = true;
  DateTime _startDate = DateTime.now();
  DateTime? _endDate;

  @override
  void dispose() {
    _customCompany.dispose();
    _trade.dispose();
    super.dispose();
  }

  Future<void> _pickDate({required bool isStart}) async {
    final initial = isStart ? _startDate : (_endDate ?? DateTime.now());
    final picked = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: DateTime(1980),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    );
    if (picked == null) {
      return;
    }
    setState(() {
      if (isStart) {
        _startDate = picked;
      } else {
        _endDate = picked;
      }
    });
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    final customName = _customCompany.text.trim();
    final useCustom = customName.isNotEmpty;
    if (!useCustom && _selectedCompanyId == null) {
      return;
    }

    final entry = WorkEntry(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      companyId: useCustom ? null : _selectedCompanyId,
      companyName: useCustom ? customName : null,
      trade: _trade.text.trim().isEmpty ? null : _trade.text.trim(),
      startDate: _startDate,
      endDate: _stillWorking ? null : (_endDate ?? DateTime.now()),
    );

    // TODO: Persist this work entry through the API when the backend is ready.
    Navigator.pop(context, entry);
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final bottomInset = MediaQuery.viewInsetsOf(context).bottom;
    final customName = _customCompany.text.trim();

    return Padding(
      padding: EdgeInsets.fromLTRB(20, 16, 20, 16 + bottomInset),
      child: Form(
        key: _formKey,
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(l10n.addWork, style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 12),
              Text(l10n.company, style: Theme.of(context).textTheme.titleSmall),
              for (final company in seedCompanies)
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(company.name),
                  leading: Icon(
                    _selectedCompanyId == company.id && customName.isEmpty
                        ? Icons.check_circle
                        : Icons.circle_outlined,
                  ),
                  enabled: customName.isEmpty,
                  onTap: customName.isNotEmpty
                      ? null
                      : () {
                          setState(() => _selectedCompanyId = company.id);
                        },
                ),
              TextFormField(
                controller: _customCompany,
                decoration: InputDecoration(labelText: l10n.company),
                onChanged: (value) {
                  setState(() {
                    if (value.trim().isNotEmpty) {
                      _selectedCompanyId = null;
                    }
                  });
                },
                validator: (value) {
                  if ((value == null || value.trim().isEmpty) &&
                      _selectedCompanyId == null) {
                    return l10n.requiredField;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _trade,
                decoration: InputDecoration(labelText: l10n.primaryTrade),
              ),
              const SizedBox(height: 8),
              ListTile(
                contentPadding: EdgeInsets.zero,
                title: Text(l10n.fromDate),
                subtitle: Text(formatWorkDate(context, _startDate)),
                trailing: const Icon(Icons.calendar_today_outlined),
                onTap: () => _pickDate(isStart: true),
              ),
              SwitchListTile(
                contentPadding: EdgeInsets.zero,
                title: Text(l10n.stillWorking),
                value: _stillWorking,
                onChanged: (value) {
                  setState(() {
                    _stillWorking = value;
                    if (value) {
                      _endDate = null;
                    } else {
                      _endDate ??= DateTime.now();
                    }
                  });
                },
              ),
              if (!_stillWorking)
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(l10n.toDate),
                  subtitle: Text(
                    formatWorkDate(context, _endDate ?? DateTime.now()),
                  ),
                  trailing: const Icon(Icons.calendar_today_outlined),
                  onTap: () => _pickDate(isStart: false),
                ),
              const SizedBox(height: 16),
              FilledButton(
                onPressed: _submit,
                child: Text(l10n.addWork),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
