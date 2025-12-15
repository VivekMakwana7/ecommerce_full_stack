import 'package:ecommerce_flutter/src/bottom_nav/widgets/app_bottom_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// Widget to display and Handle Bottom Navigation
class BottomNavPage extends StatelessWidget {
  /// Default constructor
  const BottomNavPage({required this.child, super.key});

  /// For display  Current child widget
  final StatefulNavigationShell child;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: AppBottomNavigationBar(child: child),
    );
  }
}
