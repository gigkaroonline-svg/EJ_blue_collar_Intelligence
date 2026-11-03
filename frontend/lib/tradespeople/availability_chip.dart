import 'package:flutter/material.dart';
import 'package:frontend/l10n/app_localizations.dart';

class AvailabilityChip extends StatelessWidget {
  const AvailabilityChip({
    super.key,
    required this.isAvailable,
    this.onTap,
  });

  final bool isAvailable;

  /// When set, shows a switch. Tapping it calls this (opens the confirm modal);
  /// the switch itself does not flip until the parent rebuilds with new data.
  final VoidCallback? onTap;

  static const _availableColor = Color(0xFF2E7D32);
  static const _onJobColor = Color(0xFF757575);

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final color = isAvailable ? _availableColor : _onJobColor;
    final label = isAvailable ? l10n.ready : l10n.busy;

    final labelText = Text(
      label,
      style: Theme.of(context).textTheme.labelMedium?.copyWith(
            color: color,
            fontWeight: FontWeight.w600,
          ),
    );

    if (onTap == null) {
      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.12),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 8,
              height: 8,
              decoration: BoxDecoration(color: color, shape: BoxShape.circle),
            ),
            const SizedBox(width: 6),
            labelText,
          ],
        ),
      );
    }

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        labelText,
        const SizedBox(width: 4),
        Switch.adaptive(
          value: isAvailable,
          activeThumbColor: _availableColor,
          onChanged: (_) => onTap!(),
        ),
      ],
    );
  }
}
