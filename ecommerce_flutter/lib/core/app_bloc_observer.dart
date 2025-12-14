import 'package:bloc/bloc.dart';
import 'package:flutter/foundation.dart' show debugPrint, immutable;

/// This class is used to observe the bloc.
///
@immutable
final class AppBlocObserver extends BlocObserver {
  /// Default Constructor
  const AppBlocObserver();

  @override
  void onCreate(BlocBase<dynamic> bloc) {
    super.onCreate(bloc);
    debugPrint(':::::::::::::: Created (${bloc.runtimeType}) ::::::::::::::');
  }

  @override
  void onClose(BlocBase<dynamic> bloc) {
    super.onClose(bloc);
    debugPrint(':::::::::::::: Closed (${bloc.runtimeType}) ::::::::::::::');
  }

  @override
  void onError(BlocBase<dynamic> bloc, Object error, StackTrace stackTrace) {
    debugPrint(
      ':::::::::::::: onError(${bloc.runtimeType}, $error, $stackTrace) ::::::::::::::',
    );
    super.onError(bloc, error, stackTrace);
  }
}
