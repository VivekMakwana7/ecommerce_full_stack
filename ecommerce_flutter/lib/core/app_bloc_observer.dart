import 'package:bloc/bloc.dart';
import 'package:flutter/foundation.dart' show debugPrint, immutable;

/// A [BlocObserver] for the application.
///
/// This observer logs the lifecycle events of all Blocs and Cubits in the app,
/// which is useful for debugging and monitoring state changes.
@immutable
final class AppBlocObserver extends BlocObserver {
  /// Creates an instance of [AppBlocObserver].
  const AppBlocObserver();

  /// Called when a [BlocBase] is created.
  ///
  /// Logs the creation of a Bloc or Cubit.
  @override
  void onCreate(BlocBase<dynamic> bloc) {
    super.onCreate(bloc);
    debugPrint(':::::::::::::: Created (${bloc.runtimeType}) ::::::::::::::');
  }

  /// Called when a [BlocBase] is closed.
  ///
  /// Logs the closing of a Bloc or Cubit.
  @override
  void onClose(BlocBase<dynamic> bloc) {
    super.onClose(bloc);
    debugPrint(':::::::::::::: Closed (${bloc.runtimeType}) ::::::::::::::');
  }

  /// Called when an error occurs in a [BlocBase].
  ///
  /// Logs the error and stack trace.
  @override
  void onError(BlocBase<dynamic> bloc, Object error, StackTrace stackTrace) {
    debugPrint(
      ':::::::::::::: onError(${bloc.runtimeType}, $error, $stackTrace) ::::::::::::::',
    );
    super.onError(bloc, error, stackTrace);
  }
}
