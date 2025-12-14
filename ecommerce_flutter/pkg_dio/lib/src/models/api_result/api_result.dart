import 'dart:async';

import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:pkg_dio/src/exceptions/api_exception.dart';

part 'api_result.freezed.dart';

/// A sealed class representing the result of an API call.
///
/// It can either be a [ApiResult.success] with the desired [data], or an
/// [ApiResult.error] with an [ApiException]. This class is implemented
/// using the `freezed` package to generate the necessary boilerplate code.
@Freezed(copyWith: false, toJson: false)
class ApiResult<T> with _$ApiResult<T> {
  /// Represents a successful API call with the returned [data].
  const factory ApiResult.success({required T data}) = _SuccessResult;

  /// Represents a failed API call with an [ApiException].
  const factory ApiResult.error({required ApiException exception}) =
      _ErrorResult;

  const ApiResult._();

  /// A utility method to handle the success and error cases.
  ///
  /// This is a replacement for the `when` method that was removed from `freezed`
  /// in version 3.0.0.
  ///
  /// - [success]: A callback to be executed if the result is a success.
  /// - [error]: A callback to be executed if the result is an error.
  FutureOr<void> when({
    required FutureOr<void> Function(T data) success,
    required FutureOr<void> Function(ApiException exception) error,
  }) async {
    switch (this) {
      case _SuccessResult(:final data):
        await success(data);
      case _ErrorResult(:final exception):
        await error(exception);
    }
  }
}
