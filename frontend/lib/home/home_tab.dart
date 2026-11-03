import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../core/errors/api_error.dart';
import '../tradespeople/tradesperson_tile.dart';
import '../tradespeople/tradespeople_provider.dart';
import '../theme/app_styles.dart';

class HomeTab extends ConsumerWidget {
  const HomeTab({super.key});

  static const previewCount = 3;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final asyncList = ref.watch(tradespeopleProvider);
    final textTheme = Theme.of(context).textTheme;

    return asyncList.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (error, _) {
        final message = error is ApiError ? error.error : 'Something went wrong';
        return Center(
          child: Padding(
            padding: AppStyles.pagePadding,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(message, textAlign: TextAlign.center),
                const SizedBox(height: 12),
                FilledButton(
                  onPressed: () => ref.read(tradespeopleProvider.notifier).refresh(),
                  child: const Text('Retry'),
                ),
              ],
            ),
          ),
        );
      },
      data: (tradespeople) {
        final preview = tradespeople.take(previewCount).toList();
        return RefreshIndicator(
          onRefresh: () => ref.read(tradespeopleProvider.notifier).refresh(),
          child: ListView(
            padding: AppStyles.pagePadding,
            children: [
              Text(l10n.home, style: textTheme.headlineSmall),
              const SizedBox(height: 4),
              Text(
                l10n.recentTradespeople,
                style: textTheme.bodyLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 20),
              if (preview.isEmpty)
                Text(
                  'No tradespeople yet.',
                  style: textTheme.bodyLarge?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                )
              else ...[
                ...preview.map((tradesperson) => TradespersonTile(tradesperson: tradesperson)),
                if (tradespeople.length > previewCount) ...[
                  const SizedBox(height: 4),
                  FilledButton(
                    onPressed: () => context.push('/tradespeople-list'),
                    child: Text(l10n.moreTradespeople),
                  ),
                ],
              ],
            ],
          ),
        );
      },
    );
  }
}
