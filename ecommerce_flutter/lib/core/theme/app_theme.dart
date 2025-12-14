import 'package:flutter/material.dart';

/// Defines the color palette for the application.
/// These are the primary colors used throughout the app.

/// Primary color for major UI elements.
const Color _primaryColor = Color(0xFF292526);

/// Primary text color.
const Color _primaryTextColor = Color(0xFF121111);

/// Secondary text color for less important text.
const Color _secondaryTextColor = Color(0xFF787676);

/// Tertiary text color for hints and disabled text.
const Color _tertiaryTextColor = Color(0xFFA3A1A2);

/// Background color for scaffolds and other surfaces.
const Color _backgroundColor = Color(0xFFF2F2F2);

/// A custom theme extension for defining application-specific colors.
///
/// This class allows for easy access to a custom color palette within the Flutter
/// theme. It can be accessed via `Theme.of(context).extension<AppColor>()` or
/// through the `appColors` extension on `ThemeData`.
@immutable
class AppColor extends ThemeExtension<AppColor> {
  /// Creates an instance of [AppColor].
  const AppColor({
    required this.primaryColor,
    required this.primaryTextColor,
    required this.secondaryTextColor,
    required this.tertiaryTextColor,
    required this.backgroundColor,
  });

  /// The primary color of the app, used for buttons, headers, etc.
  final Color? primaryColor;

  /// The color for primary text.
  final Color? primaryTextColor;

  /// The color for secondary, less emphasized text.
  final Color? secondaryTextColor;

  /// The color for tertiary, hint, or disabled text.
  final Color? tertiaryTextColor;

  /// The background color for most screens.
  final Color? backgroundColor;

  @override
  AppColor copyWith({
    Color? primaryColor,
    Color? primaryTextColor,
    Color? secondaryTextColor,
    Color? tertiaryTextColor,
    Color? backgroundColor,
  }) {
    return AppColor(
      primaryColor: primaryColor ?? this.primaryColor,
      primaryTextColor: primaryTextColor ?? this.primaryTextColor,
      secondaryTextColor: secondaryTextColor ?? this.secondaryTextColor,
      tertiaryTextColor: tertiaryTextColor ?? this.tertiaryTextColor,
      backgroundColor: backgroundColor ?? this.backgroundColor,
    );
  }

  @override
  AppColor lerp(ThemeExtension<AppColor>? other, double t) {
    if (other is! AppColor) {
      return this;
    }
    return AppColor(
      primaryColor: Color.lerp(primaryColor, other.primaryColor, t),
      primaryTextColor: Color.lerp(primaryTextColor, other.primaryTextColor, t),
      secondaryTextColor: Color.lerp(
        secondaryTextColor,
        other.secondaryTextColor,
        t,
      ),
      tertiaryTextColor: Color.lerp(
        tertiaryTextColor,
        other.tertiaryTextColor,
        t,
      ),
      backgroundColor: Color.lerp(backgroundColor, other.backgroundColor, t),
    );
  }
}

/// The main theme data for the application.
///
/// This theme configures the overall look and feel of the app, including
/// the color scheme, button styles, and custom theme extensions.
final ThemeData appTheme = ThemeData.light(useMaterial3: true).copyWith(
  primaryColor: _primaryColor,
  scaffoldBackgroundColor: Colors.white,
  extensions: const <ThemeExtension<dynamic>>[
    AppColor(
      primaryColor: _primaryColor,
      primaryTextColor: _primaryTextColor,
      secondaryTextColor: _secondaryTextColor,
      tertiaryTextColor: _tertiaryTextColor,
      backgroundColor: _backgroundColor,
    ),
  ],
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ButtonStyle(
      backgroundColor: WidgetStateProperty.all<Color>(_primaryColor),
      foregroundColor: WidgetStateProperty.all<Color>(Colors.white),
    ),
  ),
  filledButtonTheme: FilledButtonThemeData(
    style: ButtonStyle(
      backgroundColor: WidgetStateProperty.all<Color>(_primaryColor),
      foregroundColor: WidgetStateProperty.all<Color>(Colors.white),
    ),
  ),
  inputDecorationTheme: InputDecorationTheme(
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(18),
      borderSide: const BorderSide(color: _tertiaryTextColor),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(18),
      borderSide: const BorderSide(color: _tertiaryTextColor),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(18),
      borderSide: const BorderSide(color: _primaryColor, width: 2),
    ),
  ),
);

/// Extension on [ThemeData] to provide easy access to the [AppColor] extension.
///
/// This allows for retrieving the custom color palette using `Theme.of(context).appColors`.
extension AppThemeExtension on ThemeData {
  /// Returns the [AppColor] instance from the theme extensions.
  AppColor get appColors => extension<AppColor>()!;
}
