import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../auth/auth_session.dart';
import '../l10n/language_picker.dart';
import '../l10n/locale_provider.dart';
import '../theme/app_styles.dart';

class ProfileTab extends ConsumerWidget {
  const ProfileTab({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final session = ref.watch(authSessionProvider);
    final localeState = ref.watch(localeProvider);
    final textTheme = Theme.of(context).textTheme;

    final currentLanguage = localeState.hasSavedLanguage && localeState.locale != null
        ? nativeLanguageName(localeState.locale!)
        : l10n.systemDefault;

    return ListView(
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
                Text(l10n.mobileNumber, style: textTheme.labelLarge),
                const SizedBox(height: 4),
                Text(
                  session == null ? '—' : '+91 ${session.phone}',
                  style: textTheme.titleLarge,
                ),
              ],
            ),
          ),
        ),
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
          onPressed: () {
            ref.read(authSessionProvider.notifier).signOut();
            context.go('/login');
          },
          style: AppStyles.outlinedTall,
          child: Text(l10n.signOut),
        ),
      ],
    );
  }
}
