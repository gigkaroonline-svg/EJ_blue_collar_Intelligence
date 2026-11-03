import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../core/errors/api_error.dart';
import '../tradespeople/tradesperson_tile.dart';
import '../tradespeople/tradespeople_provider.dart';
import '../theme/app_styles.dart';

class TradespeoplePage extends ConsumerWidget {
  const TradespeoplePage({super.key, this.showAppBar = false});

  final bool showAppBar;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final asyncList = ref.watch(tradespeopleProvider);
    final textTheme = Theme.of(context).textTheme;

    final fab = FloatingActionButton.extended(
      onPressed: () => context.push('/tradesperson/new'),
      icon: const Icon(Icons.person_add_alt_1),
      label: Text(l10n.addTradesperson),
    );

    final body = asyncList.when(
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
        return RefreshIndicator(
          onRefresh: () => ref.read(tradespeopleProvider.notifier).refresh(),
          child: ListView.builder(
            padding: AppStyles.pagePadding,
            itemCount: tradespeople.isEmpty ? 2 : tradespeople.length + 1,
            itemBuilder: (context, index) {
              if (index == 0) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(l10n.tradespeople, style: textTheme.headlineSmall),
                      const SizedBox(height: 4),
                      Text(
                        l10n.tradespeopleCount(tradespeople.length),
                        style: textTheme.bodyLarge?.copyWith(
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                );
              }
              if (tradespeople.isEmpty) {
                return Text(
                  'No tradespeople yet. Tap add to register one.',
                  style: textTheme.bodyLarge?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                );
              }
              return TradespersonTile(tradesperson: tradespeople[index - 1]);
            },
          ),
        );
      },
    );

    if (!showAppBar) {
      return Scaffold(body: body, floatingActionButton: fab);
    }

    return Scaffold(
      appBar: AppBar(title: Text(l10n.tradespeople)),
      body: body,
      floatingActionButton: fab,
    );
  }
}
