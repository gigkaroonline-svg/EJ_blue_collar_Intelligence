import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../core/errors/api_error.dart';
import '../core/ui/app_shimmer.dart';
import '../theme/app_colors.dart';
import '../theme/app_styles.dart';
import '../tradespeople/tradesperson_tile.dart';
import '../tradespeople/tradespeople_provider.dart';

class TradespeoplePage extends ConsumerWidget {
  const TradespeoplePage({super.key, this.showAppBar = false});

  final bool showAppBar;

  void _openForm(BuildContext context) {
    context.push('/tradesperson/new');
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final asyncList = ref.watch(tradespeopleProvider);
    final textTheme = Theme.of(context).textTheme;
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    final body = asyncList.when(
      loading: () => const TradespeopleListSkeleton(),
      error: (error, _) {
        final message = error is ApiError ? error.error : 'Something went wrong';
        return Center(
          child: Padding(
            padding: AppStyles.pagePadding,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(message, textAlign: TextAlign.center),
                SizedBox(height: 12.h),
                FilledButton(
                  onPressed: () =>
                      ref.read(tradespeopleProvider.notifier).refresh(),
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
          child: ListView(
            padding: AppStyles.pagePadding,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(l10n.tradespeople, style: textTheme.headlineSmall),
                        SizedBox(height: 4.h),
                        Text(
                          l10n.tradespeopleCount(tradespeople.length),
                          style: textTheme.bodyLarge?.copyWith(color: muted),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(width: 12.w),
                  FilledButton.tonalIcon(
                    onPressed: () => _openForm(context),
                    style: FilledButton.styleFrom(
                      // Theme uses Size.fromHeight → infinite width; that breaks in a Row.
                      minimumSize: Size(0, 40.h),
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                      backgroundColor: AppColors.brand.withValues(alpha: 0.1),
                      foregroundColor: AppColors.brand,
                      padding: EdgeInsets.symmetric(
                        horizontal: 12.w,
                        vertical: 8.h,
                      ),
                      visualDensity: VisualDensity.compact,
                    ),
                    icon: Icon(Icons.add, size: 18.r),
                    label: Text(l10n.addTradesperson),
                  ),
                ],
              ),
              SizedBox(height: 20.h),
              if (tradespeople.isEmpty)
                _EmptyState(onAdd: () => _openForm(context))
              else
                for (final person in tradespeople)
                  TradespersonTile(tradesperson: person),
            ],
          ),
        );
      },
    );

    if (!showAppBar) return body;

    return Scaffold(
      appBar: AppBar(title: Text(l10n.tradespeople)),
      body: body,
    );
  }
}

class _EmptyState extends StatelessWidget {
  const _EmptyState({required this.onAdd});

  final VoidCallback onAdd;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final textTheme = Theme.of(context).textTheme;
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 28.h),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppStyles.radius),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          Icon(Icons.groups_outlined, size: 40.r, color: AppColors.brand),
          SizedBox(height: 12.h),
          Text(
            'No workers registered yet',
            style: textTheme.titleMedium?.copyWith(color: AppColors.ink),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 6.h),
          Text(
            'Register a tradesperson when you verify someone in the field.',
            style: textTheme.bodyMedium?.copyWith(color: muted),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 18.h),
          FilledButton.icon(
            onPressed: onAdd,
            icon: const Icon(Icons.person_add_alt_1),
            label: Text(l10n.addTradesperson),
          ),
        ],
      ),
    );
  }
}
