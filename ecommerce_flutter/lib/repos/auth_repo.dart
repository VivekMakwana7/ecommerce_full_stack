import 'package:ecommerce_flutter/src/login/models/res_login.dart';
import 'package:pkg_dio/pkg_dio.dart';

/// A repository for handling authentication-related API requests.
///
/// This class provides methods for interacting with the authentication endpoints
/// of the server, such as logging in.
class AuthRepo {
  /// Creates an instance of [AuthRepo].
  AuthRepo();

  /// The Dio instance used for making API requests.
  final Dio dio = ApiClient.instance.dio;

  /// Attempts to log in the user with the provided credentials.
  ///
  /// - [request]: The API request containing the user's login data.
  ///
  /// Returns an [ApiResult] with the [ResLogin] data on success, or an
  /// error on failure.
  Future<ApiResult<ResLogin>> login(ApiRequest request) async {
    return DioRequest<ResLogin>(
      dio: dio,
      path: ApiEndpoints.login,
      data: request.data,
      jsonMapper: ResLogin.fromJson,
    ).post();
  }
}
