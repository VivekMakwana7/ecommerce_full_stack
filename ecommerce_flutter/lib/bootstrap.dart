import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:ecommerce_flutter/core/app_bloc_observer.dart';
import 'package:ecommerce_flutter/core/db/app_db.dart';
import 'package:ecommerce_flutter/core/dio_network_interceptor.dart';
import 'package:ecommerce_flutter/core/logger.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:pkg_dio/pkg_dio.dart';

/// Initializes and configures the application before it runs.
///
/// This function sets up global error handling, initializes app services,
/// and runs the app within a zoned guard to catch uncaught asynchronous errors.
///
/// - [builder]: A function that returns the root widget of the application.
Future<void> bootstrap({required Widget Function() builder}) async {
  // Set up a global error handler for Flutter framework errors.
  FlutterError.onError = (details) {
    // Log the exception and stack trace for debugging.
    details.exceptionAsString().logE;
    details.stack.logE;
  };

  // Run the application within a zoned guard to catch all uncaught errors
  // from within the Flutter framework and asynchronous operations.
  unawaited(
    runZonedGuarded(
      () async {
        // In debug mode, set up a Bloc observer to log state changes.
        if (kDebugMode) Bloc.observer = const AppBlocObserver();

        // Ensure that Flutter widgets are initialized before running the app.
        WidgetsFlutterBinding.ensureInitialized();

        // Perform essential asynchronous initializations.
        await _initialization();

        // Run the application with the provided root widget.
        runApp(builder());
      },
      (error, stack) {
        // Log any uncaught errors from the zoned guard.
        error.logE;
        stack.logE;
      },
    ),
  );
}

/// Performs asynchronous initializations required by the app.
///
/// This function is called during the bootstrap process to set up services
/// like the local database before the app starts.
Future<void> _initialization() async {
  // Initialize the local database.
  await AppDB.initialize();

  //  Initialize API client with base URL and interceptors
  ApiClient.initialize(
    baseUrl: 'http:localhost:3000/',
    interceptors: [DioNetworkInterceptor()],
  );
}
