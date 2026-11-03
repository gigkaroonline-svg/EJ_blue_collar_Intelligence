// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appName => 'EarlyJobs';

  @override
  String get home => 'Home';

  @override
  String get candidates => 'Tradespeople';

  @override
  String get profile => 'Profile';

  @override
  String get signOut => 'Sign out';

  @override
  String get signIn => 'Sign in';

  @override
  String get signUp => 'Sign up';

  @override
  String get logIn => 'Log in';

  @override
  String get moreCandidates => 'More tradespeople';

  @override
  String get recentCandidates => 'Tradespeople near you.';

  @override
  String candidatesCount(int count) {
    return '$count people in your list.';
  }

  @override
  String get candidate => 'Tradesperson';

  @override
  String get candidateNotFound => 'Tradesperson not found.';

  @override
  String get addCandidate => 'Add tradesperson';

  @override
  String get editCandidate => 'Edit tradesperson';

  @override
  String get saveCandidate => 'Save tradesperson';

  @override
  String get readyToWork => 'Available for work';

  @override
  String get ready => 'Available';

  @override
  String get busy => 'On a job';

  @override
  String get personal => 'Personal';

  @override
  String get work => 'Work';

  @override
  String get address => 'Address';

  @override
  String get documents => 'Documents';

  @override
  String get addDocument => 'Add document';

  @override
  String get noDocuments => 'No documents yet.';

  @override
  String get aadhaar => 'Aadhaar';

  @override
  String get pan => 'PAN card';

  @override
  String get bankPassbook => 'Bank passbook';

  @override
  String get drivingLicence => 'Driving licence';

  @override
  String get photo => 'Photo';

  @override
  String get fullName => 'Full name';

  @override
  String get phone => 'Phone';

  @override
  String get mobileNumber => 'Mobile number';

  @override
  String get gender => 'Gender';

  @override
  String get dateOfBirth => 'Date of birth';

  @override
  String get idLabel => 'ID';

  @override
  String get primaryTrade => 'Main work';

  @override
  String get subSkills => 'Other skills';

  @override
  String get subSkillsHint => 'Separate with commas';

  @override
  String get experience => 'Experience';

  @override
  String get yearsOfExperience => 'Years of work';

  @override
  String get dailyWageExpected => 'Daily wage wanted';

  @override
  String get addressLine => 'Address';

  @override
  String get villageOrTown => 'Village / town';

  @override
  String get district => 'District';

  @override
  String get state => 'State';

  @override
  String get pincode => 'Pincode';

  @override
  String get permanentAddress => 'Permanent address';

  @override
  String get currentAddress => 'Current address';

  @override
  String get sameAsPermanent => 'Same as permanent address';

  @override
  String get workHistory => 'Work history';

  @override
  String get company => 'Company';

  @override
  String get addWork => 'Add work';

  @override
  String get fromDate => 'From';

  @override
  String get toDate => 'To';

  @override
  String get stillWorking => 'Still working here';

  @override
  String get endThisWork => 'End this work';

  @override
  String get noWorkHistory => 'No work added yet.';

  @override
  String get now => 'Now';

  @override
  String get availabilityHint => 'Tap Available / On a job to change it.';

  @override
  String get leaveJobTitle => 'Ready to leave?';

  @override
  String leaveJobBody(String company) {
    return 'Was working at $company. Mark as Available?';
  }

  @override
  String get markAvailable => 'Mark Available';

  @override
  String get markOnJobTitle => 'Mark as on a job?';

  @override
  String get markOnJobBody => 'Where are they working now?';

  @override
  String get markOnJob => 'Mark On a job';

  @override
  String get cancel => 'Cancel';

  @override
  String get years => 'years';

  @override
  String get welcomeBack => 'Welcome back';

  @override
  String get signInWithMobile => 'Sign in with your mobile number.';

  @override
  String get password => 'Password';

  @override
  String get forgotPassword => 'Forgot password?';

  @override
  String get newHere => 'New here?';

  @override
  String get otp => 'OTP';

  @override
  String get sendOtp => 'Send OTP';

  @override
  String get verifyOtp => 'Check OTP';

  @override
  String get resendOtp => 'Send OTP again';

  @override
  String get createAccount => 'Create an account';

  @override
  String get pendingApproval => 'Waiting for okay';

  @override
  String get pendingApprovalBody =>
      'Your account is waiting. Someone must give okay before you can continue.';

  @override
  String get myProfile => 'My profile';

  @override
  String get requiredField => 'Please fill this';

  @override
  String get systemDefault => 'Phone language';

  @override
  String get language => 'Language';

  @override
  String get chooseLanguage => 'Choose language';

  @override
  String get submitForApproval => 'Send for okay';

  @override
  String get signupBody =>
      'Next steps come here. After you send, wait until someone gives okay.';

  @override
  String enterOtpForPhone(String phone) {
    return 'Enter the 6-digit code for +91 $phone.';
  }

  @override
  String get newOtpReady => 'A new OTP is ready.';

  @override
  String get resetPassword => 'Reset password';

  @override
  String get forgotPasswordTitle => 'Forgot your password?';

  @override
  String get forgotPasswordBody =>
      'Check your mobile number, then set a new password.';

  @override
  String forgotPasswordOtpBody(String phone) {
    return 'Enter the code for +91 $phone, then choose a new password.';
  }

  @override
  String get newPassword => 'New password';

  @override
  String get confirmPassword => 'Confirm password';

  @override
  String get updatePassword => 'Update password';

  @override
  String get passwordUpdated =>
      'Password updated. Sign in with your new password.';

  @override
  String get showPassword => 'Show password';

  @override
  String get hidePassword => 'Hide password';

  @override
  String get enterMobileNumber => 'Enter your mobile number';

  @override
  String get enterValidMobile => 'Enter a valid 10-digit mobile number';

  @override
  String get enterPassword => 'Enter your password';

  @override
  String get enterOtp => 'Enter the OTP';

  @override
  String get enterSixDigitOtp => 'Enter the 6-digit OTP';

  @override
  String get enterNewPassword => 'Enter a new password';

  @override
  String get useAtLeast8Characters => 'Use at least 8 characters';

  @override
  String get confirmNewPassword => 'Confirm your new password';

  @override
  String get passwordsDoNotMatch => 'Passwords do not match';
}
