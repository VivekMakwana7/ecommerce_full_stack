import 'dart:async';

import 'package:ecommerce_flutter/app.dart';
import 'package:ecommerce_flutter/bootstrap.dart';

/// The entry point of the application.
///
/// This function initializes the application by calling the [bootstrap] function
/// with the root widget of the app, [App].
void main() {
  unawaited(bootstrap(builder: App.new));
}
