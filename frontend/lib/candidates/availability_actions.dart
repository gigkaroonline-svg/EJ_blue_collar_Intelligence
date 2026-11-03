import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';

import 'candidate.dart';
import 'candidates_provider.dart';

Future<void> changeAvailability(
  BuildContext context,
  WidgetRef ref,
  Candidate candidate,
) async {
  final l10n = AppLocalizations.of(context)!;

  if (candidate.isCurrentlyWorking) {
    await _confirmLeaveJob(context, ref, candidate, l10n);
  } else {
    await _confirmStartJob(context, ref, candidate, l10n);
  }
}

Future<void> _confirmLeaveJob(
  BuildContext context,
  WidgetRef ref,
  Candidate candidate,
  AppLocalizations l10n,
) async {
  WorkEntry? current;
  for (final entry in candidate.workHistory) {
    if (entry.isCurrent) {
      current = entry;
      break;
    }
  }
  if (current == null) {
    return;
  }

  final companyName = resolveCompanyName(current);
  final confirmed = await showDialog<bool>(
    context: context,
    builder: (context) {
      return AlertDialog(
        title: Text(l10n.leaveJobTitle),
        content: Text(l10n.leaveJobBody(companyName)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text(l10n.cancel),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text(l10n.markAvailable),
          ),
        ],
      );
    },
  );

  if (confirmed != true || !context.mounted) {
    return;
  }

  // TODO: Persist availability / end-work through the API when ready.
  ref.read(candidatesProvider.notifier).endCurrentWork(candidate.id);
}

Future<void> _confirmStartJob(
  BuildContext context,
  WidgetRef ref,
  Candidate candidate,
  AppLocalizations l10n,
) async {
  String? selectedCompanyId = seedCompanies.isEmpty ? null : seedCompanies.first.id;
  final customCompany = TextEditingController();

  final confirmed = await showDialog<bool>(
    context: context,
    builder: (context) {
      return StatefulBuilder(
        builder: (context, setState) {
          final typed = customCompany.text.trim();
          return AlertDialog(
            title: Text(l10n.markOnJobTitle),
            content: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(l10n.markOnJobBody),
                  const SizedBox(height: 12),
                  for (final company in seedCompanies)
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(company.name),
                      leading: Icon(
                        selectedCompanyId == company.id && typed.isEmpty
                            ? Icons.check_circle
                            : Icons.circle_outlined,
                      ),
                      enabled: typed.isEmpty,
                      onTap: typed.isNotEmpty
                          ? null
                          : () {
                              setState(() => selectedCompanyId = company.id);
                            },
                    ),
                  TextField(
                    controller: customCompany,
                    decoration: InputDecoration(labelText: l10n.company),
                    onChanged: (value) {
                      setState(() {
                        if (value.trim().isNotEmpty) {
                          selectedCompanyId = null;
                        } else if (seedCompanies.isNotEmpty) {
                          selectedCompanyId = seedCompanies.first.id;
                        }
                      });
                    },
                  ),
                ],
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context, false),
                child: Text(l10n.cancel),
              ),
              FilledButton(
                onPressed: () {
                  final name = customCompany.text.trim();
                  if (name.isEmpty && selectedCompanyId == null) {
                    return;
                  }
                  Navigator.pop(context, true);
                },
                child: Text(l10n.markOnJob),
              ),
            ],
          );
        },
      );
    },
  );

  final companyName = customCompany.text.trim();
  final companyId = companyName.isNotEmpty ? null : selectedCompanyId;
  customCompany.dispose();

  if (confirmed != true || !context.mounted) {
    return;
  }
  if (companyId == null && companyName.isEmpty) {
    return;
  }

  // TODO: Persist availability / start-work through the API when ready.
  ref.read(candidatesProvider.notifier).startCurrentWork(
        candidate.id,
        companyId: companyId,
        companyName: companyName.isEmpty ? null : companyName,
        trade: candidate.experience.primaryTrade,
      );
}
