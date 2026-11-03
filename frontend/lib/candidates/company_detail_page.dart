import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../theme/app_styles.dart';
import 'availability_chip.dart';
import 'candidate.dart';
import 'candidates_provider.dart';

class CompanyDetailPage extends ConsumerWidget {
  const CompanyDetailPage({super.key, required this.companyId});

  final String companyId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final company = findCompanyById(companyId);
    final candidates = ref.watch(candidatesProvider);
    final links = candidatesByCompany(companyId, candidates);

    if (company == null) {
      return Scaffold(
        appBar: AppBar(title: Text(l10n.company)),
        body: Center(child: Text(l10n.noWorkHistory)),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text(company.name)),
      body: links.isEmpty
          ? Center(child: Text(l10n.noWorkHistory))
          : ListView.separated(
              padding: AppStyles.detailPadding,
              itemCount: links.length,
              separatorBuilder: (_, _) => const SizedBox(height: 8),
              itemBuilder: (context, index) {
                final link = links[index];
                final personal = link.candidate.personal;
                final experience = link.candidate.experience;
                return Card(
                  child: ListTile(
                    onTap: () => context.push('/candidate/${link.candidate.id}'),
                    title: Text(personal.fullName),
                    subtitle: Text(
                      link.isCurrent
                          ? '${experience.primaryTrade}\n${l10n.stillWorking}'
                          : experience.primaryTrade,
                    ),
                    isThreeLine: link.isCurrent,
                    trailing: AvailabilityChip(
                      isAvailable: !link.candidate.isCurrentlyWorking,
                    ),
                  ),
                );
              },
            ),
    );
  }
}
