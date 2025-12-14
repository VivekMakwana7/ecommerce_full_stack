import 'package:bloc/bloc.dart';
import 'package:ecommerce_flutter/core/db/app_db.dart';
import 'package:ecommerce_flutter/core/logger.dart';
import 'package:ecommerce_flutter/repos/auth_repo.dart';
import 'package:meta/meta.dart';
import 'package:pkg_dio/pkg_dio.dart';

part 'login_state.dart';

class LoginCubit extends Cubit<LoginState> {
  LoginCubit() : super(LoginState());

  final AuthRepo _repo = AuthRepo();

  Future<void> login({required String email, required String password}) async {
    'login'.logD;
    if (email.isEmpty) {
      emit(
        state.copyWith(
          errorMessage: 'Email is required',
          apiState: ApiState.error,
        ),
      );
      return;
    }

    if (password.isEmpty) {
      emit(
        state.copyWith(
          errorMessage: 'Password is required',
          apiState: ApiState.error,
        ),
      );
      return;
    }

    'Login function call'.logD;
    emit(state.copyWith(apiState: ApiState.loading));

    final request = ApiRequest(
      data: {
        'email': email.trim(),
        'password': password.trim(),
      },
    );
    final res = await _repo.login(request);
    res.when(
      success: (data) {
        AppDB.instance.user = data.user;
        AppDB.instance.token = data.token;
        emit(state.copyWith(apiState: ApiState.success));
      },
      error: (exception) {
        emit(state.copyWith(apiState: ApiState.error));
      },
    );
  }
}
