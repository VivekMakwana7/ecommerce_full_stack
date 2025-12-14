import 'package:ecommerce_flutter/router/route_path.dart';
import 'package:ecommerce_flutter/src/home/home_page.dart';
import 'package:go_router/go_router.dart';

final appRouter = GoRouter(
  routes: [
    GoRoute(
      path: RoutePath.home,
      name: RoutePath.home,
      builder: (context, state) => const HomePage(),
    ),
  ],
);
