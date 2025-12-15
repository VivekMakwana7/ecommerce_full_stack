import 'package:ecommerce_flutter/core/extension/ext_build_context.dart';
import 'package:flutter/material.dart';

/// Widget to display Bottom Navigation Bar
class AppBottomNavigationBar extends StatelessWidget {
  /// Default constructor
  const AppBottomNavigationBar({super.key});

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
          child: const SizedBox(
            height: 60,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _BottomMenu(
                  key: ValueKey('home-page'),
                  isSelected: true,
                  icon: Icon(
                    Icons.home,
                    color: Colors.white,
                  ),
                ),
                _BottomMenu(
                  key: ValueKey('cart-page'),
                  isSelected: false,
                  icon: Icon(
                    Icons.shopping_cart_rounded,
                    color: Colors.white,
                  ),
                ),
                _BottomMenu(
                  key: ValueKey('profile-page'),
                  isSelected: false,
                  icon: Icon(
                    Icons.person,
                    color: Colors.white,
                  ),
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
  const _BottomMenu({required this.icon, required this.isSelected, super.key});

  final Widget icon;
  final bool isSelected;

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(microseconds: 240),
      transitionBuilder: (child, animation) => FadeTransition(
        opacity: animation,
        child: child,
      ),
      child: isSelected
          ? CircleAvatar(
              backgroundColor: context.appColor.tertiaryTextColor!.withValues(
                alpha: .4,
              ),
              child: icon,
            )
          : icon,
    );
  }
}
