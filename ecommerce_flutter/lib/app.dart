import 'package:ecommerce_flutter/core/theme/app_theme.dart';
import 'package:ecommerce_flutter/router/app_router.dart';
import 'package:flutter/material.dart';

/// The root widget of the application.
///
/// This widget is responsible for setting up the top-level [MaterialApp.router]
/// and configuring the theme and router for the entire app.
class App extends StatelessWidget {
  /// Creates the [App] widget.
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Ecommerce App',
      theme: appTheme,
      routerConfig: appRouter,
    );
  }
}
