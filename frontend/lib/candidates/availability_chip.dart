import 'package:flutter/material.dart';
import 'package:frontend/l10n/app_localizations.dart';

class AvailabilityChip extends StatelessWidget {
  const AvailabilityChip({
    super.key,
    required this.isAvailable,
    this.onTap,
  });

  final bool isAvailable;
  final VoidCallback? onTap;

  static const _availableColor = Color(0xFF2E7D32);
  static const _onJobColor = Color(0xFF757575);

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final color = isAvailable ? _availableColor : _onJobColor;
    final label = isAvailable ? l10n.ready : l10n.busy;

    final chip = Container(
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
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            label,
            style: Theme.of(context).textTheme.labelMedium?.copyWith(
                  color: color,
                  fontWeight: FontWeight.w600,
                ),
          ),
          if (onTap != null) ...[
            const SizedBox(width: 4),
            Icon(Icons.edit_outlined, size: 14, color: color),
          ],
        ],
      ),
    );

    if (onTap == null) {
      return chip;
    }

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: chip,
      ),
    );
  }
}
