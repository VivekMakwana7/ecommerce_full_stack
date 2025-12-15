import 'package:ecommerce_flutter/core/extension/ext_build_context.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// Widget to display Bottom Navigation Bar
class AppBottomNavigationBar extends StatelessWidget {
  /// Default constructor
  const AppBottomNavigationBar({required this.child, super.key});

  /// For handle navigation
  final StatefulNavigationShell child;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 20,
        ).add(const EdgeInsets.only(bottom: 12)),
        child: DecoratedBox(
          decoration: ShapeDecoration(
            shape: const StadiumBorder(),
            color: context.appColor.primaryColor,
          ),
          child: SizedBox(
            height: 60,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _BottomMenu(
                  key: const ValueKey('home-page'),
                  isSelected: child.currentIndex == 0,
                  icon: const Icon(
                    Icons.home,
                    color: Colors.white,
                  ),
                  onTap: () => child.goBranch(0),
                ),
                _BottomMenu(
                  key: const ValueKey('cart-page'),
                  isSelected: child.currentIndex == 1,
                  icon: const Icon(
                    Icons.shopping_cart_rounded,
                    color: Colors.white,
                  ),
                  onTap: () => child.goBranch(1),
                ),
                _BottomMenu(
                  key: const ValueKey('profile-page'),
                  isSelected: child.currentIndex == 2,
                  icon: const Icon(
                    Icons.person,
                    color: Colors.white,
                  ),
                  onTap: () => child.goBranch(2),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _BottomMenu extends StatelessWidget {
  const _BottomMenu({
    required this.icon,
    required this.isSelected,
    super.key,
    this.onTap,
  });

  final Widget icon;
  final bool isSelected;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: SizedBox.square(
        dimension: 44,
        child: isSelected
            ? CircleAvatar(
                backgroundColor: context.appColor.tertiaryTextColor!.withValues(
                  alpha: .4,
                ),
                child: icon,
              )
            : icon,
      ),
    );
  }
}
