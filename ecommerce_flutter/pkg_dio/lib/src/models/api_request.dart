import 'package:flutter/foundation.dart' show immutable;
import 'package:pkg_dio/pkg_dio.dart';

/// Represents the data for an API request.
///
/// This class encapsulates all the necessary information to make a request
/// using Dio, such as the path, data, query parameters, and other options.
@immutable
class ApiRequest {
  /// Creates an instance of [ApiRequest].
  const ApiRequest({
    this.path,
    this.pathParameter,
    this.data,
    this.params,
    this.options,
    this.cancelToken,
    this.receiveProgress,
    this.hideKeyboard = true,
    this.sendProgress,
  });

  /// The endpoint path for the request.
  /// If provided, this will override the path set in the [DioRequest].
  final String? path;

  /// A parameter to be appended to the URL path.
  /// For example, if the path is '/users' and [pathParameter] is '123',
  /// the final path will be '/users/123'.
  final String? pathParameter;

  /// The request body, typically a `Map<String, dynamic>` for JSON requests.
  final Object? data;

  /// The query parameters for the request.
  final Map<String, dynamic>? params;

  /// Custom [Options] for this specific request.
  /// These options will be merged with the Dio client's base options.
  final Options? options;

  /// A [CancelToken] used to cancel the request.
  final CancelToken? cancelToken;

  /// A callback to track the progress of the response download.
  final ProgressCallback? receiveProgress;

  /// Whether to automatically hide the keyboard before making the request.
  /// Defaults to `true`.
  final bool hideKeyboard;

  /// A callback to track the progress of the request upload.
  final ProgressCallback? sendProgress;
}
