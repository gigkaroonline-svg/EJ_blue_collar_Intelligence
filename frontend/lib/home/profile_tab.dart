import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../core/errors/api_error.dart';
import '../core/network/api_client.dart';
import '../features/auth/models/partner.dart';
import '../features/auth/presentation/partner_profile_provider.dart';
import '../l10n/language_picker.dart';
import '../l10n/locale_provider.dart';
import '../theme/app_styles.dart';

class ProfileTab extends ConsumerWidget {
  const ProfileTab({super.key});

  String _roleLabel(String role) {
    switch (role) {
      case 'csc':
        return 'CSC';
      case 'cmc':
        return 'CMC';
      case 'anganwadi':
        return 'Anganwadi';
      case 'gov_ngo':
        return 'Gov / NGO';
      default:
        return role;
    }
  }

  String _profileLabel(String key) {
    final spaced = key.replaceAllMapped(
      RegExp(r'([a-z])([A-Z])'),
      (m) => '${m[1]} ${m[2]}',
    );
    if (spaced.isEmpty) return key;
    return spaced[0].toUpperCase() + spaced.substring(1);
  }

  Color _statusColor(AccountStatus status, ColorScheme colors) {
    switch (status) {
      case AccountStatus.pending:
        return Colors.amber.shade800;
      case AccountStatus.accepted:
        return Colors.green.shade700;
      case AccountStatus.rejected:
        return colors.error;
    }
  }

  String _statusLabel(AccountStatus status) {
    switch (status) {
      case AccountStatus.pending:
        return 'Under Review';
      case AccountStatus.accepted:
        return 'Accepted';
      case AccountStatus.rejected:
        return 'Rejected';
    }
  }

  Future<void> _refresh(WidgetRef ref) async {
    ref.invalidate(partnerProfileProvider);
    await ref.read(partnerProfileProvider.future);
  }

  Future<void> _logout(BuildContext context, WidgetRef ref) async {
    await ref.read(tokenStorageProvider).clearToken();
    if (context.mounted) context.go('/login');
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final asyncPartner = ref.watch(partnerProfileProvider);
    final localeState = ref.watch(localeProvider);
    final textTheme = Theme.of(context).textTheme;
    final colors = Theme.of(context).colorScheme;

    final currentLanguage = localeState.hasSavedLanguage && localeState.locale != null
        ? nativeLanguageName(localeState.locale!)
        : l10n.systemDefault;

    return asyncPartner.when(
      loading: () => const Center(child: CircularProgressIndicator()),
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
              const SizedBox(height: 16),
              FilledButton(
                onPressed: () => ref.invalidate(partnerProfileProvider),
                child: const Text('Retry'),
              ),
              const SizedBox(height: 12),
              TextButton(
                onPressed: () => _logout(context, ref),
                child: Text(l10n.signOut),
              ),
            ],
          ),
        );
      },
      data: (partner) {
        final statusColor = _statusColor(partner.status, colors);
        final profileEntries = partner.profile.entries
            .where((e) => e.value != null && '${e.value}'.trim().isNotEmpty)
            .toList();

        return RefreshIndicator(
          onRefresh: () => _refresh(ref),
          child: ListView(
            padding: AppStyles.pagePadding,
            children: [
              Text(l10n.myProfile, style: textTheme.headlineSmall),
              const SizedBox(height: 16),
              Card(
                child: Padding(
                  padding: AppStyles.cardPadding,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(partner.fullName, style: textTheme.headlineSmall),
                      const SizedBox(height: 8),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: [
                          Chip(label: Text(_roleLabel(partner.role))),
                          Chip(
                            label: Text(_statusLabel(partner.status)),
                            backgroundColor: statusColor.withValues(alpha: 0.15),
                            labelStyle: TextStyle(
                              color: statusColor,
                              fontWeight: FontWeight.w600,
                            ),
                            side: BorderSide(color: statusColor.withValues(alpha: 0.4)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Text(l10n.mobileNumber, style: textTheme.labelLarge),
                      const SizedBox(height: 4),
                      Text('+91 ${partner.phoneNumber}', style: textTheme.titleMedium),
                      if (partner.status == AccountStatus.rejected &&
                          (partner.rejectionReason?.trim().isNotEmpty ?? false)) ...[
                        const SizedBox(height: 12),
                        Text(
                          partner.rejectionReason!,
                          style: textTheme.bodyMedium?.copyWith(color: colors.error),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Card(
                child: Padding(
                  padding: AppStyles.cardPadding,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Contact & location', style: textTheme.titleMedium),
                      const SizedBox(height: 12),
                      _InfoRow(label: l10n.mobileNumber, value: '+91 ${partner.phoneNumber}'),
                      _InfoRow(
                        label: 'Email',
                        value: (partner.email?.trim().isNotEmpty ?? false)
                            ? partner.email!
                            : '—',
                      ),
                      _InfoRow(
                        label: l10n.state,
                        value: partner.state.isEmpty ? '—' : partner.state,
                      ),
                      _InfoRow(
                        label: l10n.district,
                        value: partner.district.isEmpty ? '—' : partner.district,
                      ),
                      _InfoRow(
                        label: l10n.pincode,
                        value: partner.pincode.isEmpty ? '—' : partner.pincode,
                      ),
                    ],
                  ),
                ),
              ),
              if (profileEntries.isNotEmpty) ...[
                const SizedBox(height: 16),
                Card(
                  child: Padding(
                    padding: AppStyles.cardPadding,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Role details', style: textTheme.titleMedium),
                        const SizedBox(height: 12),
                        for (final entry in profileEntries)
                          _InfoRow(
                            label: _profileLabel(entry.key),
                            value: '${entry.value}',
                          ),
                      ],
                    ),
                  ),
                ),
              ],
              const SizedBox(height: 16),
              Card(
                child: ListTile(
                  leading: const Icon(Icons.language),
                  title: Text(l10n.language),
                  subtitle: Text(currentLanguage),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () => showLanguagePicker(context, ref),
                ),
              ),
              const SizedBox(height: 24),
              OutlinedButton(
                onPressed: () => _logout(context, ref),
                style: AppStyles.outlinedTall,
                child: Text(l10n.signOut),
              ),
            ],
          ),
        );
      },
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
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 110,
            child: Text(
              label,
              style: textTheme.labelLarge?.copyWith(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
            ),
          ),
          Expanded(child: Text(value, style: textTheme.bodyLarge)),
        ],
      ),
    );
  }
}
