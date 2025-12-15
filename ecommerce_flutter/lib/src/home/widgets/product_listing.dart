import 'package:cached_network_image/cached_network_image.dart';
import 'package:ecommerce_flutter/core/extension/ext_build_context.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

/// Widget to display Product Listing
class ProductListing extends StatelessWidget {
  /// Default constructor
  const ProductListing({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: MasonryGridView.count(
        itemCount: 50,
        crossAxisCount: 2,
        mainAxisSpacing: 16,
        crossAxisSpacing: 12,
        itemBuilder: (context, index) {
          return Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: CachedNetworkImage(
                  imageUrl: index.isEven
                      ? 'https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80'
                      : 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Item 1 ',
                style: context.textTheme.titleMedium,
              ),
              Text(
                'Description',
                style: context.textTheme.bodyMedium?.copyWith(
                  color: context.appColor.secondaryTextColor,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                r'$100',
                style: context.textTheme.titleMedium,
              ),
            ],
          );
        },
      ),
    );
  }
}
