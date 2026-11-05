import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend/l10n/app_localizations.dart';

import '../core/brand.dart';
import '../theme/app_styles.dart';

/// Simple scrollable legal page (privacy / terms).
class LegalDocumentPage extends StatelessWidget {
  const LegalDocumentPage({
    super.key,
    required this.title,
    required this.paragraphs,
  });

  final String title;
  final List<String> paragraphs;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final muted = Theme.of(context).colorScheme.onSurfaceVariant;

    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: ListView(
        padding: AppStyles.detailPadding,
        children: [
          Text(title, style: textTheme.headlineSmall),
          SizedBox(height: 8.h),
          Text(
            'Last updated: 4 Nov 2026',
            style: textTheme.bodySmall?.copyWith(color: muted),
          ),
          SizedBox(height: 20.h),
          for (final paragraph in paragraphs) ...[
            Text(paragraph, style: textTheme.bodyLarge?.copyWith(height: 1.45)),
            SizedBox(height: 16.h),
          ],
        ],
      ),
    );
  }
}

class PrivacyPolicyPage extends StatelessWidget {
  const PrivacyPolicyPage({super.key});

  @override
  Widget build(BuildContext context) {
    final title = AppLocalizations.of(context)!.privacyPolicy;
    return LegalDocumentPage(
      title: title,
      paragraphs: [
        'We collect only the information needed to register partners and the tradespeople they onboard — such as name, phone number, location, and ID documents you upload.',
        'Account and registration data is used to verify partners, match workers to opportunities, and keep availability records accurate. We do not sell personal data.',
        'Documents and identity details are stored securely and shared only with authorised operations staff for verification and placement.',
        'You may request correction or deletion of your partner account data by contacting ${AppBrand.supportEmail} or visiting ${AppBrand.websiteUrl}. Some records may be retained where required for compliance or dispute resolution.',
        'By continuing to use this app you agree to this privacy policy. We may update it; continued use after changes means you accept the updated policy.',
      ],
    );
  }
}

class TermsAndConditionsPage extends StatelessWidget {
  const TermsAndConditionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final title = AppLocalizations.of(context)!.termsAndConditions;
    return LegalDocumentPage(
      title: title,
      paragraphs: [
        '${AppBrand.name} (${AppBrand.websiteHost}) is for authorised sourcing partners to register and manage tradespeople. You must provide accurate information and keep your login credentials private.',
        'You are responsible for the accuracy of tradesperson details and documents you submit. Misuse, false data, or unauthorised access may result in account suspension.',
        'Availability status and job placement information are tools for coordination; they do not create employment contracts by themselves.',
        'We may suspend or terminate access if these terms are violated, or if your partner account is rejected or withdrawn by administrators.',
        'These terms are governed by applicable Indian law. If a section is found unenforceable, the rest remain in effect.',
      ],
    );
  }
}
