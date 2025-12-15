import 'package:ecommerce_flutter/src/home/widgets/category_item.dart';
import 'package:flutter/material.dart';

/// For display Category View
class CategoryView extends StatelessWidget {
  /// Default constructor
  const CategoryView({super.key});

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        spacing: 12,
        children: [
          CategoryItem(
            label: 'All Item',
            isSelected: true,
          ),
          CategoryItem(label: 'Men'),
          CategoryItem(label: 'Women'),
        ],
      ),
    );
  }
}
