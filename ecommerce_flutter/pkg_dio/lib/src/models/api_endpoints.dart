import 'package:flutter/foundation.dart';

/// Endpoints which will be used in the API url
@immutable
final class ApiEndpoints {
  static final login = 'auth/login';
  static final signUp = 'auth/signup';
  static final refreshToken = 'auth/refresh';
  static final logout = 'auth/logout';
  static final forgotPassword = 'auth/forgot-password';
  static final changePassword = 'auth/change-password';
}
