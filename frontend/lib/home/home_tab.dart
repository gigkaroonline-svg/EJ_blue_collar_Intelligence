import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../candidates/candidate_tile.dart';
import '../candidates/candidates_provider.dart';
import '../theme/app_styles.dart';

class HomeTab extends ConsumerWidget {
  const HomeTab({super.key});

  static const previewCount = 3;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final candidates = ref.watch(candidatesProvider);
    final preview = candidates.take(previewCount).toList();
    final textTheme = Theme.of(context).textTheme;

    return ListView(
      padding: AppStyles.pagePadding,
      children: [
        Text(l10n.home, style: textTheme.headlineSmall),
        const SizedBox(height: 4),
        Text(
          l10n.recentCandidates,
          style: textTheme.bodyLarge?.copyWith(
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
        ),
        const SizedBox(height: 20),
        ...preview.map((candidate) => CandidateTile(candidate: candidate)),
        if (candidates.length > previewCount) ...[
          const SizedBox(height: 4),
          FilledButton(
            onPressed: () => context.push('/candidates-list'),
            child: Text(l10n.moreCandidates),
          ),
        ],
      ],
    );
  }
}
