import 'package:ecommerce_flutter/core/theme/app_theme.dart';
import 'package:ecommerce_flutter/src/home/home_page.dart';
import 'package:flutter/material.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: appTheme,
      home: const HomePage(),
    );
  }
}
