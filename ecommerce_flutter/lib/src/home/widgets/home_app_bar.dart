import 'package:ecommerce_flutter/core/db/app_db.dart';
import 'package:ecommerce_flutter/core/extension/ext_build_context.dart';
import 'package:flutter/material.dart';

class HomeAppBar extends StatelessWidget implements PreferredSizeWidget {
  const HomeAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    final user = AppDB.instance.user;

    var userName = '';
    if (user?.name != null) {
      final userCode = user!.name.split(' ');
      if (userCode.length > 1) {
        userName = userCode.take(2).map((e) => e[0]).toList().join();
      } else {
        userName = user.name[0];
      }
    }

    return AppBar(
      backgroundColor: Colors.white,
      title: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Hello welcome',
            style: context.textTheme.labelMedium?.copyWith(
              color: context.appColor.secondaryTextColor,
            ),
          ),
          Text(
            user?.name ?? '',
            style: context.textTheme.bodyLarge?.copyWith(),
          ),
        ],
      ),
      actions: [
        CircleAvatar(
          backgroundColor: context.appColor.primaryColor,
          child: Text(
            userName,
            style: context.textTheme.bodyLarge?.copyWith(
              color: Colors.white,
            ),
          ),
        ),
        const SizedBox(width: 20),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(60);
}
