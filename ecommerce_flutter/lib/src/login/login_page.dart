import 'package:ecommerce_flutter/core/extension/ext_build_context.dart';
import 'package:flutter/material.dart';

/// A screen for users to log in to the application.
///
/// This page provides input fields for credentials and a button to initiate
/// the login process.
class LoginPage extends StatelessWidget {
  /// Creates the [LoginPage] widget.
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Login',
                style: context.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 40),
              TextFormField(),
              const SizedBox(height: 16),
              TextFormField(),
              const SizedBox(height: 16),
              FilledButton(onPressed: () {}, child: const Text('Login')),
            ],
          ),
        ),
      ),
    );
  }
}
