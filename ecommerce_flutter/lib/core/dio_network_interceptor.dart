import 'package:ecommerce_flutter/core/db/app_db.dart';
import 'package:pkg_dio/pkg_dio.dart';

/// Custom Dio network interceptor for managing requests and responses globally
final class DioNetworkInterceptor extends Interceptor {
  /// constructor
  DioNetworkInterceptor();

  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final apiToken =
        (options.headers['Authorization'] as String? ?? AppDB.instance.token) ??
        '';
    if (apiToken.isNotEmpty) {
      options.headers['Authorization'] = apiToken;
    } else {
      options.headers['Authorization'] = '';
    }
    options.headers['Accept-Language'] = 'en';

    return handler.next(options);
  }

  @override
  Future<void> onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) async {
    if (err.type != DioExceptionType.cancel) handler.next(err);
  }
}
