import 'package:flutter/material.dart';

/// The main screen of the application, displayed after successful login.
///
/// This page currently shows a simple centered text widget, but it is intended
/// to be the primary interface for users to interact with the app's features.
class HomePage extends StatelessWidget {
  /// Creates the [HomePage] widget.
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('Home page'),
      ),
    );
  }
}
