/// This file defines the AppDB class, which provides a simplified interface
/// for local data storage using Hive. It follows a singleton pattern to ensure
/// a single instance of the database is used throughout the application.

import 'package:hive_ce/hive.dart';
import 'package:hive_ce_flutter/adapters.dart';
import 'package:path_provider/path_provider.dart';

/// A singleton class to manage local data storage using Hive.
///
/// This class provides a key-value store for persisting simple data locally.
/// It must be initialized using the `initialize` method before the `instance`
/// can be accessed.
class AppDB {
  /// Creates an instance of [AppDB].
  /// This constructor is private to enforce the singleton pattern.
  AppDB._(this._box);

  /// The name of the Hive box used for storage.
  static const _appDbBox = '_appDbBox';

  /// The singleton instance of [AppDB].
  /// It is nullable and becomes non-null only after a successful [initialize] call.
  static AppDB? _instance;

  /// The Hive box instance for data operations.
  final Box<dynamic> _box;

  /// Provides access to the singleton instance of [AppDB].
  ///
  /// A [StateError] will be thrown if [initialize] is not called before
  /// accessing this getter.
  static AppDB get instance {
    if (_instance == null) {
      throw StateError(
        'AppDB not initialized. Call initialize() before accessing the instance.',
      );
    }
    return _instance!;
  }

  /// Initializes the database.
  ///
  /// This method must be called before accessing the [instance]. It opens the
  /// Hive box and handles potential initialization errors by deleting and
  /// recreating the database directory if necessary.
  static Future<void> initialize() async {
    await Hive.initFlutter();
    // Prevent re-initialization if the instance already exists.
    if (_instance != null) {
      return;
    }
    try {
      final box = await Hive.openBox<dynamic>(_appDbBox);
      _instance = AppDB._(box);
    } on Object {
      // If opening the box fails, it might be corrupted.
      // As a recovery mechanism, delete the app's document directory and retry.
      final appDir = await getApplicationDocumentsDirectory();
      if (appDir.existsSync()) {
        appDir.deleteSync(recursive: true);
      }
      // Re-attempt to open the box after cleaning up.
      final box = await Hive.openBox<dynamic>(_appDbBox);
      _instance = AppDB._(box);
    }
  }

  /// Retrieves a value from the database.
  ///
  /// - [key]: The key associated with the value.
  /// - [defaultValue]: An optional value to return if the key is not found.
  ///
  /// Returns the stored value, or `defaultValue` if the key does not exist.
  T getValue<T>(String key, {T? defaultValue}) =>
      _box.get(key, defaultValue: defaultValue) as T;

  /// Saves a key-value pair to the database.
  ///
  /// - [key]: The key under which to store the value.
  /// - [value]: The value to be stored.
  ///
  /// This operation is asynchronous and returns a [Future] that completes
  /// when the data is successfully saved.
  Future<void> setValue<T>(String key, T value) => _box.put(key, value);
}
