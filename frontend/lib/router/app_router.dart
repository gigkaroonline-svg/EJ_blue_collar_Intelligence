import 'package:go_router/go_router.dart';

import '../auth/forgot_password_page.dart';
import '../auth/login_page.dart';
import '../auth/pending_approval_page.dart';
import '../auth/signup_page.dart';
import '../candidates/candidate_detail_page.dart';
import '../candidates/candidate_form_page.dart';
import '../candidates/company_detail_page.dart';
import '../home/candidates_page.dart';
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
                path: '/candidates',
                builder: (context, state) => const CandidatesPage(),
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
        path: '/candidates-list',
        builder: (context, state) => const CandidatesPage(showAppBar: true),
      ),
      GoRoute(
        path: '/candidate/new',
        builder: (context, state) => const CandidateFormPage(),
      ),
      GoRoute(
        path: '/candidate/:id/edit',
        builder: (context, state) {
          final id = state.pathParameters['id'] ?? '';
          return CandidateFormPage(candidateId: id);
        },
      ),
      GoRoute(
        path: '/candidate/:id',
        builder: (context, state) {
          final id = state.pathParameters['id'] ?? '';
          return CandidateDetailPage(candidateId: id);
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
