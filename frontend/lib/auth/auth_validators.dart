import 'package:frontend/l10n/app_localizations.dart';

String? validateIndianMobile(String? value, AppLocalizations l10n) {
  final phone = value?.trim() ?? '';
  if (phone.isEmpty) {
    return l10n.enterMobileNumber;
  }
  if (!RegExp(r'^[6-9]\d{9}$').hasMatch(phone)) {
    return l10n.enterValidMobile;
  }
  return null;
}

String? validatePassword(String? value, AppLocalizations l10n) {
  if (value == null || value.isEmpty) {
    return l10n.enterPassword;
  }
  return null;
}

String? validateOtp(String? value, AppLocalizations l10n) {
  final otp = value?.trim() ?? '';
  if (otp.isEmpty) {
    return l10n.enterOtp;
  }
  if (!RegExp(r'^\d{6}$').hasMatch(otp)) {
    return l10n.enterSixDigitOtp;
  }
  return null;
}

String? validateNewPassword(String? value, AppLocalizations l10n) {
  final password = value ?? '';
  if (password.isEmpty) {
    return l10n.enterNewPassword;
  }
  if (password.length < 8) {
    return l10n.useAtLeast8Characters;
  }
  return null;
}

String? validateConfirmPassword(
  String? value,
  String password,
  AppLocalizations l10n,
) {
  if (value == null || value.isEmpty) {
    return l10n.confirmNewPassword;
  }
  if (value != password) {
    return l10n.passwordsDoNotMatch;
  }
  return null;
}
