import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'availability_actions.dart';
import 'availability_chip.dart';
import 'tradesperson.dart';

class TradespersonTile extends ConsumerWidget {
  const TradespersonTile({super.key, required this.tradesperson});

  final Tradesperson tradesperson;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = Theme.of(context).textTheme;
    final personal = tradesperson.personal;
    final experience = tradesperson.experience;
    final current = personal.currentAddress;

    return Card(
      margin: EdgeInsets.only(bottom: 12.h),
      child: ListTile(
        onTap: () => context.push('/tradesperson/${tradesperson.id}'),
        contentPadding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
        title: Text(personal.fullName, style: textTheme.titleMedium),
        subtitle: Text(
          '${experience.primaryTrade} · ${experience.yearsOfExperience} yrs\n'
          '${current.district}, ${current.state}',
        ),
        isThreeLine: true,
        trailing: AvailabilityChip(
          isAvailable: tradesperson.isReadyToWork,
          onTap: () => changeAvailability(context, ref, tradesperson),
        ),
      ),
    );
  }
}
