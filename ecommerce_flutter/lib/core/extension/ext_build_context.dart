import 'package:ecommerce_flutter/core/theme/app_theme.dart';
import 'package:flash/flash.dart';
import 'package:flash/flash_helper.dart';
import 'package:flutter/material.dart';

/// An extension on [BuildContext] to provide convenient access to theme properties
/// and to show various types of alerts using the `flash` package.
extension ExtBuildContext on BuildContext {
  /// A shortcut to get the [TextTheme] from the current theme.
  TextTheme get textTheme => Theme.of(this).textTheme;

  /// Shows a top-level error alert.
  ///
  /// - [content]: The message to be displayed in the alert.
  /// - [duration]: The optional duration for which the alert is visible.
  void showErrorAlert(String content, {Duration? duration}) =>
      this.showFlash<void>(
        builder: (context, controller) {
          return FlashBar(
            controller: controller,
            position: FlashPosition.top,
            behavior: FlashBehavior.floating,
            content: Text(content, style: textTheme.bodyMedium),
            backgroundColor: Colors.white,
            indicatorColor: const Color(0xFFE57373),
            icon: const Icon(Icons.error_outline, color: Color(0xFFE57373)),
            shouldIconPulse: false,
            margin: const EdgeInsets.symmetric(horizontal: 16),
            forwardAnimationCurve: Curves.bounceOut,
          );
        },
        duration: duration ?? const Duration(seconds: 3),
      );

  /// Shows a top-level success alert.
  ///
  /// - [content]: The message to be displayed in the alert.
  /// - [duration]: The optional duration for which the alert is visible.
  void showSuccessAlert(
    String content, {
    Duration? duration,
  }) => this.showFlash<void>(
    builder: (context, controller) {
      return FlashBar(
        controller: controller,
        position: FlashPosition.top,
        behavior: FlashBehavior.floating,
        content: Text(content, style: textTheme.bodyMedium),
        backgroundColor: Colors.white,
        indicatorColor: const Color(0xFF81C784),
        icon: const Icon(Icons.check_circle_outline, color: Color(0xFF81C784)),
        shouldIconPulse: false,
        margin: const EdgeInsets.symmetric(horizontal: 16),
        forwardAnimationCurve: Curves.bounceOut,
      );
    },
    duration: duration ?? const Duration(seconds: 3),
  );

  /// Shows a top-level informational alert.
  ///
  /// - [content]: The message to be displayed in the alert.
  void showInfoAlert(String content) => this.showFlash<void>(
    builder: (context, controller) {
      return FlashBar(
        controller: controller,
        position: FlashPosition.top,
        behavior: FlashBehavior.floating,
        content: Text(content, style: textTheme.bodyMedium),
        backgroundColor: Colors.white,
        indicatorColor: const Color(0xFF64B5F6),
        icon: const Icon(Icons.info_outline, color: Color(0xFF64B5F6)),
        shouldIconPulse: false,
        margin: const EdgeInsets.symmetric(horizontal: 16),
        forwardAnimationCurve: Curves.bounceOut,
      );
    },
    duration: const Duration(seconds: 2),
  );

  AppColor get appColor => Theme.of(this).extension<AppColor>()!;
}
