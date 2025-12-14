import 'package:flutter/material.dart';

extension ExtBuildContext on BuildContext {
  TextTheme get textTheme => Theme.of(this).textTheme;
}
