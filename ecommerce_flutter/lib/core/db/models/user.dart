/// Represents a user of the application.
///
/// This model contains the user's essential information, such as their name and email.
class User {
  /// Creates a [User] instance.
  const User({required this.name, required this.email});

  /// Creates a [User] instance from a JSON object.
  ///
  /// The [json] map is expected to contain the keys 'name' and 'email'.
  factory User.fromJson(Map<String, dynamic> json) {
    return User(name: json['name'] as String, email: json['email'] as String);
  }

  /// The name of the user.
  final String name;

  /// The email address of the user.
  final String email;

  /// Converts the [User] instance to a JSON object.
  Map<String, dynamic> toJson() {
    return {'name': name, 'email': email};
  }
}
