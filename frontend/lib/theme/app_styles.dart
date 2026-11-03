import 'package:flutter/material.dart';

import 'app_colors.dart';

abstract final class AppStyles {
  static const pagePadding = EdgeInsets.fromLTRB(20, 12, 20, 24);
  static const detailPadding = EdgeInsets.fromLTRB(20, 12, 20, 28);
  static const cardPadding = EdgeInsets.all(20);
  static const radius = 12.0;

  static final cardShape = RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(radius),
    side: const BorderSide(color: AppColors.border),
  );

  static ButtonStyle outlinedTall = OutlinedButton.styleFrom(
    minimumSize: const Size.fromHeight(52),
  );
}
