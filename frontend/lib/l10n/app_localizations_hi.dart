// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Hindi (`hi`).
class AppLocalizationsHi extends AppLocalizations {
  AppLocalizationsHi([String locale = 'hi']) : super(locale);

  @override
  String get appName => 'EarlyJobs';

  @override
  String get home => 'होम';

  @override
  String get candidates => 'कारीगर';

  @override
  String get profile => 'प्रोफ़ाइल';

  @override
  String get signOut => 'साइन आउट';

  @override
  String get signIn => 'साइन इन';

  @override
  String get signUp => 'साइन अप';

  @override
  String get logIn => 'लॉग इन';

  @override
  String get moreCandidates => 'और कारीगर';

  @override
  String get recentCandidates => 'आपके पास के कारीगर।';

  @override
  String candidatesCount(int count) {
    return 'आपकी लिस्ट में $count लोग हैं।';
  }

  @override
  String get candidate => 'कारीगर';

  @override
  String get candidateNotFound => 'कारीगर नहीं मिला।';

  @override
  String get addCandidate => 'कारीगर जोड़ें';

  @override
  String get editCandidate => 'कारीगर बदलें';

  @override
  String get saveCandidate => 'कारीगर सेव करें';

  @override
  String get readyToWork => 'काम के लिए तैयार';

  @override
  String get ready => 'तैयार';

  @override
  String get busy => 'अभी काम पर';

  @override
  String get personal => 'अपनी बात';

  @override
  String get work => 'काम';

  @override
  String get address => 'पता';

  @override
  String get documents => 'दस्तावेज़';

  @override
  String get addDocument => 'दस्तावेज़ जोड़ें';

  @override
  String get noDocuments => 'अभी कोई दस्तावेज़ नहीं।';

  @override
  String get aadhaar => 'आधार';

  @override
  String get pan => 'पैन कार्ड';

  @override
  String get bankPassbook => 'बैंक पासबुक';

  @override
  String get drivingLicence => 'ड्राइविंग लाइसेंस';

  @override
  String get photo => 'फ़ोटो';

  @override
  String get fullName => 'पूरा नाम';

  @override
  String get phone => 'फ़ोन';

  @override
  String get mobileNumber => 'मोबाइल नंबर';

  @override
  String get gender => 'लिंग';

  @override
  String get dateOfBirth => 'जन्म तारीख';

  @override
  String get idLabel => 'आईडी';

  @override
  String get primaryTrade => 'मुख्य काम';

  @override
  String get subSkills => 'और काम';

  @override
  String get subSkillsHint => 'कॉमा से अलग लिखें';

  @override
  String get experience => 'अनुभव';

  @override
  String get yearsOfExperience => 'कितने साल का काम';

  @override
  String get dailyWageExpected => 'रोज़ की मजदूरी';

  @override
  String get addressLine => 'पता';

  @override
  String get villageOrTown => 'गाँव / शहर';

  @override
  String get district => 'ज़िला';

  @override
  String get state => 'राज्य';

  @override
  String get pincode => 'पिनकोड';

  @override
  String get permanentAddress => 'स्थायी पता';

  @override
  String get currentAddress => 'अभी का पता';

  @override
  String get sameAsPermanent => 'स्थायी पते जैसा ही';

  @override
  String get workHistory => 'काम का इतिहास';

  @override
  String get company => 'कंपनी';

  @override
  String get addWork => 'काम जोड़ें';

  @override
  String get fromDate => 'से';

  @override
  String get toDate => 'तक';

  @override
  String get stillWorking => 'अभी भी यहीं काम करता है';

  @override
  String get endThisWork => 'यह काम बंद करें';

  @override
  String get noWorkHistory => 'अभी कोई काम नहीं जोड़ा।';

  @override
  String get now => 'अभी';

  @override
  String get availabilityHint => 'तैयार / अभी काम पर पर टैप करके बदलें।';

  @override
  String get leaveJobTitle => 'काम छोड़ना है?';

  @override
  String leaveJobBody(String company) {
    return 'पहले $company पर काम था। अब तैयार करें?';
  }

  @override
  String get markAvailable => 'तैयार करें';

  @override
  String get markOnJobTitle => 'अभी काम पर करें?';

  @override
  String get markOnJobBody => 'अभी कहाँ काम कर रहे हैं?';

  @override
  String get markOnJob => 'अभी काम पर करें';

  @override
  String get cancel => 'रद्द करें';

  @override
  String get years => 'साल';

  @override
  String get welcomeBack => 'वापस स्वागत है';

  @override
  String get signInWithMobile => 'अपना मोबाइल नंबर डालकर साइन इन करें।';

  @override
  String get password => 'पासवर्ड';

  @override
  String get forgotPassword => 'पासवर्ड भूल गए?';

  @override
  String get newHere => 'नए हैं?';

  @override
  String get otp => 'ओटीपी';

  @override
  String get sendOtp => 'ओटीपी भेजें';

  @override
  String get verifyOtp => 'ओटीपी जाँचें';

  @override
  String get resendOtp => 'ओटीपी फिर भेजें';

  @override
  String get createAccount => 'नया खाता बनाएँ';

  @override
  String get pendingApproval => 'मंज़ूरी का इंतज़ार';

  @override
  String get pendingApprovalBody =>
      'आपका खाता इंतज़ार में है। आगे बढ़ने से पहले किसी को मंज़ूरी देनी होगी।';

  @override
  String get myProfile => 'मेरी प्रोफ़ाइल';

  @override
  String get requiredField => 'यह भरना ज़रूरी है';

  @override
  String get systemDefault => 'फ़ोन की भाषा';

  @override
  String get language => 'भाषा';

  @override
  String get chooseLanguage => 'भाषा चुनें';

  @override
  String get submitForApproval => 'मंज़ूरी के लिए भेजें';

  @override
  String get signupBody =>
      'आगे के कदम यहाँ आएँगे। भेजने के बाद तब तक इंतज़ार करें जब तक कोई मंज़ूरी न दे।';

  @override
  String enterOtpForPhone(String phone) {
    return '+91 $phone का 6 अंकों का कोड डालें।';
  }

  @override
  String get newOtpReady => 'नया ओटीपी तैयार है।';

  @override
  String get resetPassword => 'पासवर्ड बदलें';

  @override
  String get forgotPasswordTitle => 'पासवर्ड भूल गए?';

  @override
  String get forgotPasswordBody =>
      'अपना मोबाइल नंबर पक्का करें, फिर नया पासवर्ड डालें।';

  @override
  String forgotPasswordOtpBody(String phone) {
    return '+91 $phone का कोड डालें, फिर नया पासवर्ड चुनें।';
  }

  @override
  String get newPassword => 'नया पासवर्ड';

  @override
  String get confirmPassword => 'पासवर्ड पक्का करें';

  @override
  String get updatePassword => 'पासवर्ड बदलें';

  @override
  String get passwordUpdated => 'पासवर्ड बदल गया। नए पासवर्ड से साइन इन करें।';

  @override
  String get showPassword => 'पासवर्ड दिखाएँ';

  @override
  String get hidePassword => 'पासवर्ड छिपाएँ';

  @override
  String get enterMobileNumber => 'अपना मोबाइल नंबर डालें';

  @override
  String get enterValidMobile => 'सही 10 अंकों का मोबाइल नंबर डालें';

  @override
  String get enterPassword => 'अपना पासवर्ड डालें';

  @override
  String get enterOtp => 'ओटीपी डालें';

  @override
  String get enterSixDigitOtp => '6 अंकों का ओटीपी डालें';

  @override
  String get enterNewPassword => 'नया पासवर्ड डालें';

  @override
  String get useAtLeast8Characters => 'कम से कम 8 अक्षर डालें';

  @override
  String get confirmNewPassword => 'नया पासवर्ड पक्का करें';

  @override
  String get passwordsDoNotMatch => 'पासवर्ड एक जैसे नहीं हैं';
}
