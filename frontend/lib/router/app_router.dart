import 'package:go_router/go_router.dart';

import '../auth/forgot_password_page.dart';
import '../auth/login_page.dart';
import '../auth/pending_approval_page.dart';
import '../auth/rejected_page.dart';
import '../auth/signup_page.dart';
import '../tradespeople/tradesperson_detail_page.dart';
import '../tradespeople/tradesperson_form_page.dart';
import '../tradespeople/company_detail_page.dart';
import '../home/tradespeople_page.dart';
import '../home/home_tab.dart';
import '../home/main_shell.dart';
import '../home/profile_tab.dart';
import '../l10n/language_selection_page.dart';
import '../splash_screen.dart';

GoRouter createAppRouter() {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(path: '/', builder: (context, state) => const SplashScreen()),
      GoRoute(
        path: '/choose-language',
        builder: (context, state) => const LanguageSelectionPage(),
      ),
      GoRoute(path: '/login', builder: (context, state) => const LoginPage()),
      GoRoute(path: '/signup', builder: (context, state) => const SignupPage()),
      GoRoute(
        path: '/pending',
        builder: (context, state) => const PendingApprovalPage(),
      ),
      GoRoute(
        path: '/rejected',
        builder: (context, state) => const RejectedPage(),
      ),
      GoRoute(
        path: '/forgot-password',
        builder: (context, state) {
          final phone = state.uri.queryParameters['phone'] ?? '';
          return ForgotPasswordPage(initialPhone: phone);
        },
      ),
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return MainShell(navigationShell: navigationShell);
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/home',
                builder: (context, state) => const HomeTab(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/tradespeople',
                builder: (context, state) => const TradespeoplePage(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/profile',
                builder: (context, state) => const ProfileTab(),
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        path: '/tradespeople-list',
        builder: (context, state) => const TradespeoplePage(showAppBar: true),
      ),
      GoRoute(
        path: '/tradesperson/new',
        builder: (context, state) => const TradespersonFormPage(),
      ),
      GoRoute(
        path: '/tradesperson/:id/edit',
        builder: (context, state) {
          final id = state.pathParameters['id'] ?? '';
          return TradespersonFormPage(tradespersonId: id);
        },
      ),
      GoRoute(
        path: '/tradesperson/:id',
        builder: (context, state) {
          final id = state.pathParameters['id'] ?? '';
          return TradespersonDetailPage(tradespersonId: id);
        },
      ),
      GoRoute(
        path: '/company/:id',
        builder: (context, state) {
          final id = state.pathParameters['id'] ?? '';
          return CompanyDetailPage(companyId: id);
        },
      ),
    ],
  );
}
