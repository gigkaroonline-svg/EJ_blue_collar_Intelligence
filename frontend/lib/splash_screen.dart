import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'l10n/locale_provider.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  bool _delayDone = false;
  bool _navigated = false;

  @override
  void initState() {
    super.initState();
    Future<void>.delayed(const Duration(seconds: 2), () {
      _delayDone = true;
      _goNext();
    });
  }

  void _goNext() {
    if (!mounted || _navigated || !_delayDone) {
      return;
    }
    final localeState = ref.read(localeProvider);
    if (!localeState.isReady) {
      return;
    }
    _navigated = true;
    context.go(localeState.hasSavedLanguage ? '/login' : '/choose-language');
  }

  @override
  Widget build(BuildContext context) {
    ref.listen<AppLocaleState>(localeProvider, (previous, next) {
      if (next.isReady) {
        _goNext();
      }
    });

    return const Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Image(
          image: AssetImage('assets/images/earlyjobs-logo.webp'),
          width: 240,
          fit: BoxFit.contain,
        ),
      ),
    );
  }
}
