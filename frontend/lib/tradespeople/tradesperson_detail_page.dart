import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../core/errors/api_error.dart';
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
        body: const Center(child: CircularProgressIndicator()),
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
                TextButton(
                  onPressed: () => context.push('/tradesperson/$tradespersonId/edit'),
                  child: Text(l10n.editTradesperson),
                ),
              ],
            ),
            body: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(20, 12, 20, 0),
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

class _DocumentTile extends StatelessWidget {
  const _DocumentTile({required this.document});

  final TradespersonDocument document;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    return Card(
      child: ListTile(
        leading: Icon(documentTypeIcon(document.type)),
        title: Text(documentTypeLabel(l10n, document.type)),
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
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
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
