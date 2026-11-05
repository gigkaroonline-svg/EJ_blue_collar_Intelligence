import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend/l10n/app_localizations.dart';

import '../core/errors/api_error.dart';
import '../core/ui/app_shimmer.dart';
import '../features/auth/presentation/partner_profile_provider.dart';
import '../theme/app_styles.dart';
import 'profile_helpers.dart';

class PersonalDetailsPage extends ConsumerWidget {
  const PersonalDetailsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final asyncPartner = ref.watch(partnerProfileProvider);
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(title: Text(l10n.personalDetails)),
      body: asyncPartner.when(
        loading: () => const ProfileSkeleton(),
        error: (error, _) {
          final message = error is ApiError ? error.error : 'Something went wrong';
          return Center(child: Text(message));
        },
        data: (partner) {
          final profileEntries = partner.profile.entries
              .where((e) => e.value != null && '${e.value}'.trim().isNotEmpty)
              .toList();

          return ListView(
            padding: AppStyles.detailPadding,
            children: [
              Card(
                child: Padding(
                  padding: AppStyles.cardPadding,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _DetailRow(label: l10n.fullName, value: partner.fullName),
                      _DetailRow(
                        label: 'Role',
                        value: partnerRoleLabel(partner.role),
                      ),
                      _DetailRow(
                        label: l10n.state,
                        value: partner.state.isEmpty ? '—' : partner.state,
                      ),
                      _DetailRow(
                        label: l10n.district,
                        value: partner.district.isEmpty ? '—' : partner.district,
                      ),
                      _DetailRow(
                        label: l10n.pincode,
                        value: partner.pincode.isEmpty ? '—' : partner.pincode,
                      ),
                    ],
                  ),
                ),
              ),
              if (profileEntries.isNotEmpty) ...[
                SizedBox(height: 16.h),
                Text('Role details', style: textTheme.titleMedium),
                SizedBox(height: 8.h),
                Card(
                  child: Padding(
                    padding: AppStyles.cardPadding,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        for (final entry in profileEntries)
                          _DetailRow(
                            label: partnerProfileFieldLabel(entry.key),
                            value: '${entry.value}',
                          ),
                      ],
                    ),
                  ),
                ),
              ],
            ],
          );
        },
      ),
    );
  }
}

class _DetailRow extends StatelessWidget {
  const _DetailRow({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Padding(
      padding: EdgeInsets.only(bottom: 12.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: textTheme.labelLarge?.copyWith(
              color: Theme.of(context).colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 4.h),
          Text(value, style: textTheme.titleMedium),
        ],
      ),
    );
  }
}
