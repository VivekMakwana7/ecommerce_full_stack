import 'package:ecommerce_flutter/core/extension/ext_build_context.dart';
import 'package:flutter/material.dart';

class AppTextField extends StatelessWidget {
  const AppTextField({
    super.key,
    this.controller,
    this.hintText,
    this.inputType,
  });

  final TextEditingController? controller;
  final String? hintText;
  final TextInputType? inputType;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      keyboardType: inputType,
      cursorColor: context.appColor.primaryColor,
      decoration: InputDecoration(hintText: hintText),
      controller: controller,
    );
  }
}
