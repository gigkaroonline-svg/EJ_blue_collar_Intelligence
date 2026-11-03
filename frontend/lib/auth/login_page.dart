import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:frontend/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../l10n/language_picker.dart';
import 'auth_fields.dart';
import 'auth_session.dart';
import 'auth_validators.dart';

enum SignInMethod { password, otp }

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({super.key});

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _otpController = TextEditingController();

  SignInMethod _method = SignInMethod.password;
  bool _obscurePassword = true;
  bool _otpSent = false;

  @override
  void dispose() {
    _phoneController.dispose();
    _passwordController.dispose();
    _otpController.dispose();
    super.dispose();
  }

  void _signIn() {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    final session = ref
        .read(authSessionProvider.notifier)
        .signIn(_phoneController.text.trim());
    context.go(session.isPending ? '/pending' : '/home');
  }

  void _sendOtp() {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    setState(() => _otpSent = true);
  }

  void _openForgotPassword() {
    final phone = _phoneController.text.trim();
    context.push(
      phone.isEmpty ? '/forgot-password' : '/forgot-password?phone=$phone',
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            tooltip: l10n.language,
            onPressed: () => showLanguagePicker(context, ref),
            icon: const Icon(Icons.language),
          ),
        ],
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(24, 8, 24, 12),
          child: Align(
            alignment: Alignment.center,
            heightFactor: 1,
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    l10n.newHere,
                    textAlign: TextAlign.center,
                    style: textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 8),
                  OutlinedButton(
                    onPressed: () => context.go('/signup'),
                    style: OutlinedButton.styleFrom(
                      minimumSize: const Size.fromHeight(52),
                      maximumSize: const Size.fromHeight(52),
                    ),
                    child: Text(l10n.signUp),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      body: AuthPageFrame(
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Center(
                child: Image(
                  image: AssetImage('assets/images/earlyjobs-logo.webp'),
                  width: 200,
                  fit: BoxFit.contain,
                ),
              ),
              const SizedBox(height: 28),
              Text(l10n.welcomeBack, style: textTheme.headlineMedium),
              const SizedBox(height: 8),
              Text(
                l10n.signInWithMobile,
                style: textTheme.bodyLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 24),
              PhoneField(controller: _phoneController),
              const SizedBox(height: 16),
              SegmentedButton<SignInMethod>(
                segments: [
                  ButtonSegment(
                    value: SignInMethod.password,
                    label: Text(l10n.password),
                    icon: const Icon(Icons.lock_outline),
                  ),
                  ButtonSegment(
                    value: SignInMethod.otp,
                    label: Text(l10n.otp),
                    icon: const Icon(Icons.sms_outlined),
                  ),
                ],
                selected: {_method},
                onSelectionChanged: (selection) {
                  setState(() {
                    _method = selection.first;
                    if (_method == SignInMethod.password) {
                      _otpSent = false;
                      _otpController.clear();
                    }
                  });
                },
              ),
              const SizedBox(height: 16),
              if (_method == SignInMethod.password) ...[
                PasswordField(
                  controller: _passwordController,
                  label: l10n.password,
                  fieldKey: const Key('password-field'),
                  obscureText: _obscurePassword,
                  autofillHints: const [AutofillHints.password],
                  onToggleVisibility: () {
                    setState(() => _obscurePassword = !_obscurePassword);
                  },
                  validator: (value) => validatePassword(value, l10n),
                ),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: _openForgotPassword,
                    child: Text(l10n.forgotPassword),
                  ),
                ),
                FilledButton(onPressed: _signIn, child: Text(l10n.signIn)),
              ] else ...[
                if (_otpSent) ...[
                  Text(
                    l10n.enterOtpForPhone(_phoneController.text.trim()),
                    style: textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    key: const Key('otp-field'),
                    controller: _otpController,
                    keyboardType: TextInputType.number,
                    textInputAction: TextInputAction.done,
                    inputFormatters: [
                      FilteringTextInputFormatter.digitsOnly,
                      LengthLimitingTextInputFormatter(6),
                    ],
                    decoration: InputDecoration(
                      labelText: l10n.otp,
                      prefixIcon: const Icon(Icons.pin_outlined),
                    ),
                    validator: (value) => validateOtp(value, l10n),
                  ),
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () {
                        _otpController.clear();
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(l10n.newOtpReady)),
                        );
                      },
                      child: Text(l10n.resendOtp),
                    ),
                  ),
                  FilledButton(
                    onPressed: _signIn,
                    child: Text(l10n.verifyOtp),
                  ),
                ] else
                  FilledButton(
                    onPressed: _sendOtp,
                    child: Text(l10n.sendOtp),
                  ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
