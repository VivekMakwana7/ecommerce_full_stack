import 'package:ecommerce_flutter/core/db/models/user.dart';

/// Represents the response received from the server upon a successful login.
///
/// This model encapsulates the authentication token and the authenticated user's
/// information.
class ResLogin {
  /// Creates a [ResLogin] instance.
  ///
  /// Requires a [token] and a [user] object.
  ResLogin({required this.token, required this.user});

  /// Creates a [ResLogin] instance from a JSON object.
  ///
  /// The [json] map is expected to contain the keys 'access_token' for the token
  /// and 'user' for the user data.
  factory ResLogin.fromJson(Map<String, dynamic> json) {
    return ResLogin(
      token: json['access_token'] as String,
      user: User.fromJson(json['user'] as Map<String, dynamic>),
    );
  }

  /// The authentication token provided by the server.
  final String token;

  /// The details of the authenticated user.
  final User user;
}
