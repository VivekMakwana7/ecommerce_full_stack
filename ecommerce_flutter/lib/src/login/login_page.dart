import 'dart:async';

import 'package:ecommerce_flutter/core/extension/ext_build_context.dart';
import 'package:ecommerce_flutter/core/widgets/app_button.dart';
import 'package:ecommerce_flutter/core/widgets/app_text_field.dart';
import 'package:ecommerce_flutter/router/route_path.dart';
import 'package:ecommerce_flutter/src/login/cubit/login_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:pkg_dio/pkg_dio.dart';

/// A screen for users to log in to the application.
///
/// This page provides input fields for credentials and a button to initiate
/// the login process.
class LoginPage extends StatefulWidget {
  /// Creates the [LoginPage] widget.
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => LoginCubit(),
      child: BlocListener<LoginCubit, LoginState>(
        listenWhen: (previous, current) =>
            current.apiState != previous.apiState,
        listener: (context, state) {
          switch (state.apiState) {
            case ApiState.error:
              context.showErrorAlert(state.errorMessage ?? '');
            case ApiState.success:
              context.goNamed(RoutePath.home);
            case _:
          }
          if (state.apiState == ApiState.error) {
            context.showErrorAlert(state.errorMessage ?? '');
          }
        },
        child: Scaffold(
          body: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Login',
                    style: context.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: 40),
                  AppTextField(
                    hintText: 'Email',
                    controller: emailController,
                    inputType: TextInputType.emailAddress,
                  ),
                  const SizedBox(height: 16),
                  AppTextField(
                    hintText: 'Password',
                    controller: passwordController,
                  ),
                  const SizedBox(height: 32),
                  BlocSelector<LoginCubit, LoginState, bool>(
                    selector: (state) => state.apiState == ApiState.loading,
                    builder: (context, isLoading) {
                      return AppButton(
                        isLoading: isLoading,
                        onTap: () {
                          unawaited(
                            context.read<LoginCubit>().login(
                              email: emailController.text,
                              password: passwordController.text,
                            ),
                          );
                        },
                        label: 'Login',
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
