import 'package:flutter/foundation.dart';
import 'package:logger/logger.dart';

/// A custom logger instance configured with a [_LogFilter].
final _logger = Logger(filter: _LogFilter());

/// An extension on [Object] to provide convenient logging methods.
///
/// This allows any object to be logged at different levels (debug, info, error, etc.)
/// using a simple property access, for example: `myObject.logD`.

extension LoggerEx on Object? {
  /// Logs the object at the [Level.debug] level.
  void get logD => _logger.d(this);

  /// Logs the object at the [Level.info] level.
  void get logI => _logger.i(this);

  /// Logs the object at the [Level.trace] level (aliased as `logV` for verbose).
  void get logV => _logger.t(this);

  /// Logs the object at the [Level.error] level.
  void get logE => _logger.e(this);

  /// Logs the object at the [Level.warning] level.
  void get logW => _logger.w(this);

  /// Logs the object at the [Level.debug] level with a timestamp.
  void get logTime => _logger.d('${DateTime.now().toIso8601String()} $this');

  /// Logs the object at the [Level.fatal] level.
  void get logFatal => _logger.f(this);
}

/// A custom [LogFilter] that controls which log messages are shown.
///
/// In debug mode, it allows debug, info, trace, warning, and error messages.
/// Fatal errors are always logged regardless of the mode.
class _LogFilter extends LogFilter {
  /// Determines whether a log event should be logged.
  @override
  bool shouldLog(LogEvent event) {
    // In debug mode, log most levels.
    // In release mode, only log fatal errors.
    return switch (event.level) {
      Level.debug ||
      Level.info ||
      Level.trace ||
      Level.warning ||
      Level.error => kDebugMode,
      Level.fatal => true,
      _ => false,
    };
  }
}
