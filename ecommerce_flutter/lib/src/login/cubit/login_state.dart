part of 'login_cubit.dart';

@immutable
final class LoginState {
  LoginState({this.apiState = ApiState.initial, this.errorMessage});

  final ApiState apiState;
  final String? errorMessage;

  LoginState copyWith({ApiState? apiState, String? errorMessage}) {
    return LoginState(
      apiState: apiState ?? this.apiState,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}
