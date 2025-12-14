import 'package:flutter/foundation.dart' show immutable;

/// Represents an exception that occurs during an API call.
///
/// This class is used to encapsulate the error information returned from the API,
/// including the status code, message, and any additional data.
@immutable
class ApiException {
  /// Creates an instance of [ApiException].
  const ApiException({
    required this.code,
    required this.message,
    this.data,
    this.lisData,
  });

  /// The HTTP status code of the error response.
  final int code;

  /// The error message returned from the API.
  final String message;

  /// Any additional data returned in the error response, as a map.
  final Map<String, dynamic>? data;

  /// Any additional data returned in the error response, as a list.
  final List<dynamic>? lisData;

  @override
  String toString() {
    return 'ApiException(code: $code, message: $message, data: $data, lisData: $lisData)';
  }
}
