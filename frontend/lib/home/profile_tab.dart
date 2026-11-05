import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../core/brand.dart';
import '../core/errors/api_error.dart';
import '../core/network/api_client.dart';
import '../core/ui/app_shimmer.dart';
import '../features/auth/presentation/partner_profile_provider.dart';
import '../theme/app_colors.dart';
import '../theme/app_styles.dart';
import 'profile_helpers.dart';

class ProfileTab extends ConsumerWidget {
  const ProfileTab({super.key});

  Future<void> _refresh(WidgetRef ref) async {
    ref.invalidate(partnerProfileProvider);
    await ref.read(partnerProfileProvider.future);
  }

  Future<void> _logout(BuildContext context, WidgetRef ref) async {
    await ref.read(tokenStorageProvider).clearToken();
    if (context.mounted) context.go('/login');
  }

  Future<void> _openSupport(BuildContext context) async {
    final l10n = AppLocalizations.of(context)!;
    await showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      builder: (sheetContext) {
        return SafeArea(
          child: Padding(
            padding: EdgeInsets.fromLTRB(20.w, 4.h, 20.w, 20.h),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(l10n.contactSupport, style: Theme.of(context).textTheme.titleLarge),
                SizedBox(height: 8.h),
                Text(
                  l10n.contactSupportBody,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                ),
                SizedBox(height: 16.h),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: 14.h),
                  decoration: BoxDecoration(
                    color: AppColors.scaffold,
                    borderRadius: BorderRadius.circular(AppStyles.radius),
                    border: Border.all(color: AppColors.border),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.mail_outline, color: AppColors.brand, size: 22.r),
                      SizedBox(width: 10.w),
                      Expanded(
                        child: Text(
                          AppBrand.supportEmail,
                          style: Theme.of(context).textTheme.titleSmall?.copyWith(
                                color: AppColors.ink,
                                fontWeight: FontWeight.w600,
                              ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 16.h),
                FilledButton.icon(
                  onPressed: () async {
                    await Clipboard.setData(
                      const ClipboardData(text: AppBrand.supportEmail),
                    );
                    if (!sheetContext.mounted) return;
                    Navigator.of(sheetContext).pop();
                    if (!context.mounted) return;
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text(l10n.emailCopied)),
                    );
                  },
                  icon: const Icon(Icons.copy_rounded),
                  label: Text(l10n.copyEmail),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final asyncPartner = ref.watch(partnerProfileProvider);
    final textTheme = Theme.of(context).textTheme;

    return asyncPartner.when(
      loading: () => const ProfileSkeleton(),
      error: (error, _) {
        final apiError = error is ApiError
            ? error
            : const ApiError(code: 'server_error', error: 'Something went wrong');
        return Padding(
          padding: AppStyles.pagePadding,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(apiError.error, textAlign: TextAlign.center),
              SizedBox(height: 16.h),
              FilledButton(
                onPressed: () => ref.invalidate(partnerProfileProvider),
                child: const Text('Retry'),
              ),
              SizedBox(height: 12.h),
              TextButton(
                onPressed: () => _logout(context, ref),
                child: Text(l10n.signOut),
              ),
            ],
          ),
        );
      },
      data: (partner) {
        return RefreshIndicator(
          onRefresh: () => _refresh(ref),
          child: ListView(
            padding: AppStyles.pagePadding,
            children: [
              Text(partner.fullName, style: textTheme.headlineSmall),
              SizedBox(height: 8.h),
              Align(
                alignment: Alignment.centerLeft,
                child: Chip(label: Text(partnerRoleLabel(partner.role))),
              ),
              SizedBox(height: 24.h),
              Card(
                child: Column(
                  children: [
                    _ProfileNavRow(
                      icon: Icons.lock_outline,
                      title: l10n.authenticationDetails,
                      onTap: () => context.push('/profile/authentication'),
                    ),
                    const Divider(height: 1),
                    _ProfileNavRow(
                      icon: Icons.badge_outlined,
                      title: l10n.personalDetails,
                      onTap: () => context.push('/profile/personal'),
                    ),
                    const Divider(height: 1),
                    _ProfileNavRow(
                      icon: Icons.tune,
                      title: l10n.preferences,
                      onTap: () => context.push('/profile/preferences'),
                    ),
                    const Divider(height: 1),
                    _ProfileNavRow(
                      icon: Icons.support_agent_outlined,
                      title: l10n.contactSupport,
                      onTap: () => _openSupport(context),
                    ),
                    const Divider(height: 1),
                    _ProfileNavRow(
                      icon: Icons.privacy_tip_outlined,
                      title: l10n.privacyPolicy,
                      onTap: () => context.push('/privacy'),
                    ),
                    const Divider(height: 1),
                    _ProfileNavRow(
                      icon: Icons.description_outlined,
                      title: l10n.termsAndConditions,
                      onTap: () => context.push('/terms'),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 28.h),
              OutlinedButton(
                onPressed: () => _logout(context, ref),
                style: AppStyles.outlinedTall,
                child: Text(l10n.signOut),
              ),
              SizedBox(height: 12.h),
            ],
          ),
        );
      },
    );
  }
}

class _ProfileNavRow extends StatelessWidget {
  const _ProfileNavRow({
    required this.icon,
    required this.title,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      trailing: const Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }
}
