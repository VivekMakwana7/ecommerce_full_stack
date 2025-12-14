import 'package:flutter/foundation.dart' show immutable;

/// Common API response class for all Rest APIs
@immutable
final class ApiResponse {
  /// Constructor
  const ApiResponse({required this.code, this.message, this.data});

  /// function for converting a response from json
  factory ApiResponse.fromJson(Map<String, dynamic> map) {
    return ApiResponse(
      code: map['code'] as int,
      message: map['message'] as String?,
      data: map['data'] as dynamic,
    );
  }

  /// status code
  final int code;

  /// message from server
  final String? message;

  /// data from server
  final dynamic data;

  /// function for converting data to json
  Map<String, dynamic> toJson() {
    return {'code': code, 'message': message, 'data': data};
  }
}
