import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:ecommerce_flutter/core/app_bloc_observer.dart';
import 'package:ecommerce_flutter/core/db/app_db.dart';
import 'package:ecommerce_flutter/core/logger.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

/// Bootstrap the app with Firebase and other configurations before running the app.
Future<void> bootstrap({required Widget Function() builder}) async {
  // Flutter unhandled error handling
  FlutterError.onError = (details) {
    details.exceptionAsString().logE;
    details.stack.logE;
  };

  unawaited(
    runZonedGuarded(
      () async {
        // Set up Bloc observer for debugging state changes
        if (kDebugMode) Bloc.observer = const AppBlocObserver();
        WidgetsFlutterBinding.ensureInitialized();
        await _initialization();
        runApp(builder());
      },
      (error, stack) {
        error.logE;
        stack.logE;
      },
    ),
  );
}

Future<void> _initialization() async {
  await AppDB.initialize();

  // // Initialize API client with base URL and interceptors
  // ApiClient.initialize(
  //   baseUrl: '${AppEnv.instance.baseUrl}/',
  //   interceptors: [DioNetworkInterceptor()],
  // );
}
