import 'dart:async';

import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:pkg_dio/src/exceptions/api_exception.dart';

part 'api_result.freezed.dart';

/// Generic Api result
@Freezed(copyWith: false, toJson: false)
class ApiResult<T> with _$ApiResult<T> {
  /// Success Result
  const factory ApiResult.success({required T data}) = _SuccessResult;

  /// Error Result
  const factory ApiResult.error({required ApiException exception}) = _ErrorResult;

  const ApiResult._();

  /// Add when method to handle success and error cases as freezed does not support map/when from 3.0.0
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
