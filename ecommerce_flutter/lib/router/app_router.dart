import 'package:ecommerce_flutter/router/route_path.dart';
import 'package:ecommerce_flutter/src/home/home_page.dart';
import 'package:ecommerce_flutter/src/login/login_page.dart';
import 'package:go_router/go_router.dart';

/// The main router configuration for the application.
///
/// This router uses `go_router` to define the navigation paths and their
/// corresponding screens. The initial route is set to the login page.
final appRouter = GoRouter(
  // The initial route that the app will display.
  initialLocation: RoutePath.login,
  // The list of routes that the app can navigate to.
  routes: [
    // The route for the home page.
    GoRoute(
      path: RoutePath.home,
      name: RoutePath.home,
      builder: (context, state) => const HomePage(),
    ),
    // The route for the login page.
    GoRoute(
      path: RoutePath.login,
      name: RoutePath.login,
      builder: (context, state) => const LoginPage(),
    ),
  ],
);
