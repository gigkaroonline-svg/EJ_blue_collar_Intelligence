import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import 'auth_fields.dart';
import 'auth_session.dart';

class PendingApprovalPage extends ConsumerWidget {
  const PendingApprovalPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final session = ref.watch(authSessionProvider);
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      body: AuthPageFrame(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Center(
              child: Image(
                image: AssetImage('assets/images/earlyjobs-logo.webp'),
                width: 200,
                fit: BoxFit.contain,
              ),
            ),
            const SizedBox(height: 28),
            Icon(Icons.hourglass_top_outlined, size: 48, color: colorScheme.primary),
            const SizedBox(height: 16),
            Text(
              l10n.pendingApproval,
              style: textTheme.headlineMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              l10n.pendingApprovalBody,
              style: textTheme.bodyLarge?.copyWith(color: colorScheme.onSurfaceVariant),
              textAlign: TextAlign.center,
            ),
            if (session != null) ...[
              const SizedBox(height: 16),
              Text(
                '+91 ${session.phone}',
                style: textTheme.titleMedium,
                textAlign: TextAlign.center,
              ),
            ],
            const SizedBox(height: 24),
            FilledButton(
              onPressed: () {
                ref.read(authSessionProvider.notifier).signOut();
                context.go('/login');
              },
              child: Text(l10n.logIn),
            ),
          ],
        ),
      ),
    );
  }
}
