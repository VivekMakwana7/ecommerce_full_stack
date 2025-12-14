import 'package:ecommerce_flutter/core/db/models/user.dart';
import 'package:hive_ce/hive.dart';

part 'hive_adapters.g.dart';

@GenerateAdapters([AdapterSpec<User>()])
// This is for code generation
// ignore: unused_element
void _() {}
