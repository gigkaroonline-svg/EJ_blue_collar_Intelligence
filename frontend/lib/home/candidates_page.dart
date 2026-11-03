import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../candidates/candidate_tile.dart';
import '../candidates/candidates_provider.dart';
import '../theme/app_styles.dart';

class CandidatesPage extends ConsumerWidget {
  const CandidatesPage({super.key, this.showAppBar = false});

  final bool showAppBar;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final candidates = ref.watch(candidatesProvider);
    final textTheme = Theme.of(context).textTheme;

    final body = ListView.builder(
      padding: AppStyles.pagePadding,
      itemCount: candidates.length + 1,
      itemBuilder: (context, index) {
        if (index == 0) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(l10n.candidates, style: textTheme.headlineSmall),
                const SizedBox(height: 4),
                Text(
                  l10n.candidatesCount(candidates.length),
                  style: textTheme.bodyLarge?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          );
        }
        return CandidateTile(candidate: candidates[index - 1]);
      },
    );

    final fab = FloatingActionButton.extended(
      onPressed: () => context.push('/candidate/new'),
      icon: const Icon(Icons.person_add_alt_1),
      label: Text(l10n.addCandidate),
    );

    if (!showAppBar) {
      return Scaffold(
        body: body,
        floatingActionButton: fab,
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text(l10n.candidates)),
      body: body,
      floatingActionButton: fab,
    );
  }
}
