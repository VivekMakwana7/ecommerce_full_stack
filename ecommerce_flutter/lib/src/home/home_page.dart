import 'package:ecommerce_flutter/core/widgets/app_text_field.dart';
import 'package:ecommerce_flutter/src/home/widgets/category_view.dart';
import 'package:ecommerce_flutter/src/home/widgets/home_app_bar.dart';
import 'package:ecommerce_flutter/src/home/widgets/product_listing.dart';
import 'package:flutter/material.dart';

/// The main screen of the application, displayed after successful login.
///
/// This page currently shows a simple centered text widget, but it is intended
/// to be the primary interface for users to interact with the app's features.
class HomePage extends StatelessWidget {
  /// Creates the [HomePage] widget.
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: HomeAppBar(),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 20),
            AppTextField(hintText: 'Search clothes...'),
            SizedBox(height: 20),
            CategoryView(),
            SizedBox(height: 16),
            ProductListing(),
          ],
        ),
      ),
    );
  }
}
