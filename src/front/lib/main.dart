import 'package:flutter/material.dart';
import 'package:front/pages/initial.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Nome aplicação',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        initialRoute: '/introduce',
        debugShowCheckedModeBanner: false,
        routes: {
          '/introduce': (context) => const Initial(),
        });
  }
}
