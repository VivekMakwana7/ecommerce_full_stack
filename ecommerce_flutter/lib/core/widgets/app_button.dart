import 'package:ecommerce_flutter/core/extension/ext_build_context.dart';
import 'package:ecommerce_flutter/core/widgets/loading/loading_widget.dart';
import 'package:flutter/material.dart';

class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    this.onTap,
    required this.label,
    this.isLoading = false,
  });
  final VoidCallback? onTap;
  final String label;
  final bool isLoading;

  @override
  Widget build(BuildContext context) {
    return FilledButton(
      onPressed: () {
        if (isLoading) return;
        onTap?.call();
      },
      child: AnimatedSize(
        duration: const Duration(microseconds: 240),
        child: isLoading
            ? const LoadingWidget(
                color: Colors.white,
                size: 24,
                secondCircleColor: Colors.green,
                thirdCircleColor: Colors.red,
              )
            : Text(
                label,
                style: context.textTheme.bodyLarge?.copyWith(
                  color: Colors.white,
                ),
              ),
      ),
    );
  }
}
