import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart' show immutable, kDebugMode;

/// Api client injector
@immutable
class ApiClient {
  /// Private constructor for singleton pattern
  ApiClient._({required this.baseUrl, this.interceptors}) {
    _init();
  }

  /// Singleton instance
  static ApiClient? _instance;

  /// Initialize the singleton instance with required parameters
  static void initialize({required String baseUrl, List<Interceptor>? interceptors}) {
    _instance ??= ApiClient._(baseUrl: baseUrl, interceptors: interceptors);
  }

  /// Get the singleton instance
  /// Make sure to call [initialize] before accessing this getter
  static ApiClient get instance {
    if (_instance == null) {
      throw StateError('ApiClientsInjector not initialized. Call initialize() first.');
    }
    return _instance!;
  }

  /// Base Url
  final String baseUrl;

  /// Custom network interceptor
  final List<Interceptor>? interceptors;

  late final _baseOptions = BaseOptions(
    baseUrl: baseUrl,
    contentType: Headers.jsonContentType,
    connectTimeout: const Duration(seconds: 30),
    sendTimeout: const Duration(seconds: 30),
    receiveTimeout: const Duration(seconds: 30),
  );

  final _logger = LogInterceptor(requestBody: true, responseBody: true);

  late final _dioClient = Dio(_baseOptions);

  /// Get the Dio client instance
  Dio get dio => _dioClient;

  void _init() {
    if (kDebugMode) interceptors?.add(_logger);
    if (interceptors != null) _dioClient.interceptors.addAll(interceptors!);
  }
}
