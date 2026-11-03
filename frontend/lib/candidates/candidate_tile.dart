import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'availability_actions.dart';
import 'availability_chip.dart';
import 'candidate.dart';

class CandidateTile extends ConsumerWidget {
  const CandidateTile({super.key, required this.candidate});

  final Candidate candidate;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = Theme.of(context).textTheme;
    final personal = candidate.personal;
    final experience = candidate.experience;
    final current = personal.currentAddress;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        onTap: () => context.push('/candidate/${candidate.id}'),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        title: Text(personal.fullName, style: textTheme.titleMedium),
        subtitle: Text(
          '${experience.primaryTrade} · ${experience.yearsOfExperience} yrs\n'
          '${current.district}, ${current.state}',
        ),
        isThreeLine: true,
        trailing: AvailabilityChip(
          isAvailable: !candidate.isCurrentlyWorking,
          onTap: () => changeAvailability(context, ref, candidate),
        ),
      ),
    );
  }
}
