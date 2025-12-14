import 'package:freezed_annotation/freezed_annotation.dart';

part 'pagination_response.freezed.dart';
part 'pagination_response.g.dart';

/// A generic class representing a paginated response from an API.
///
/// It contains the list of items for the current page and metadata about the
/// pagination state.
@Freezed(
  genericArgumentFactories: true,
  toJson: false,
  map: FreezedMapOptions.none,
  when: FreezedWhenOptions.none,
  copyWith: false,
)
abstract class PaginationResponse<T> with _$PaginationResponse<T> {
  /// Creates a [PaginationResponse].
  const factory PaginationResponse({
    /// The list of items for the current page.
    @JsonKey(name: 'dataResult') required List<T> list,

    /// The current page number.
    @JsonKey(name: 'pageNumber') required int page,

    /// The number of items per page.
    @JsonKey(name: 'pageSize') required int pageSize,

    /// The total number of items across all pages.
    @JsonKey(name: 'totalCount') required int totalCount,

    /// The total number of pages.
    @JsonKey(name: 'totalPages') required int totalPages,

    /// Whether there is a previous page.
    @JsonKey(name: 'hasPreviousPage') required bool hasPreviousPage,

    /// Whether there is a next page.
    @JsonKey(name: 'hasNextPage') required bool hasNextPage,
  }) = _PaginationResponse;

  /// Creates a [PaginationResponse] from a JSON object.
  factory PaginationResponse.fromJson(Map<String, dynamic> json, T Function(Object? json) fromJsonT) =>
      _$PaginationResponseFromJson(json, fromJsonT);
}
