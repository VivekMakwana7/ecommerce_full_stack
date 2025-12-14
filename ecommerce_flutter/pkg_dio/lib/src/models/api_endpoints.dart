import 'package:flutter/foundation.dart';

/// A class that holds the endpoints for the API.
///
/// This class is immutable and contains static final fields for each endpoint.
@immutable
final class ApiEndpoints {
  /// The endpoint for user login.
  static final login = 'auth/login';

  /// The endpoint for user registration.
  static final signUp = 'auth/signup';

  /// The endpoint for refreshing the authentication token.
  static final refreshToken = 'auth/refresh';

  /// The endpoint for user logout.
  static final logout = 'auth/logout';

  /// The endpoint for requesting a password reset.
  static final forgotPassword = 'auth/forgot-password';

  /// The endpoint for changing the user's password.
  static final changePassword = 'auth/change-password';
}
