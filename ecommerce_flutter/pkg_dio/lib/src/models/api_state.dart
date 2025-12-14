/// Enum representing the different states of API operations.
///
/// This enum is used throughout the application to track the status
/// of asynchronous operations like network requests, data loading, etc.
enum ApiState {
  /// Initial state before any operation has been performed.
  initial,

  /// Operation is currently in progress (loading state).
  loading,

  /// Operation completed successfully.
  success,

  /// Operation failed with an error.
  error,

  /// Operation is in progress to load more data (pagination).
  loadingMore,

  /// Operation completed successfully but with no data.
  empty,
}
