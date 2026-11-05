import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend/l10n/app_localizations.dart';

import '../core/errors/api_error.dart';
import '../core/ui/app_shimmer.dart';
import '../features/auth/presentation/partner_profile_provider.dart';
import '../theme/app_styles.dart';

class AuthenticationDetailsPage extends ConsumerWidget {
  const AuthenticationDetailsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final asyncPartner = ref.watch(partnerProfileProvider);

    return Scaffold(
      appBar: AppBar(title: Text(l10n.authenticationDetails)),
      body: asyncPartner.when(
        loading: () => const ProfileSkeleton(),
        error: (error, _) {
          final message = error is ApiError ? error.error : 'Something went wrong';
          return Center(child: Text(message));
        },
        data: (partner) {
          return ListView(
            padding: AppStyles.detailPadding,
            children: [
              Card(
                child: Padding(
                  padding: AppStyles.cardPadding,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _DetailRow(
                        label: l10n.mobileNumber,
                        value: '+91 ${partner.phoneNumber}',
                      ),
                      _DetailRow(
                        label: 'Email',
                        value: (partner.email?.trim().isNotEmpty ?? false)
                            ? partner.email!
                            : '—',
                      ),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

class _DetailRow extends StatelessWidget {
  const _DetailRow({
    required this.label,
    required this.value,
  });

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
