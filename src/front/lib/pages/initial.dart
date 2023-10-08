import 'package:flutter/material.dart';

class Initial extends StatelessWidget {
  const Initial({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            color: Colors.black,
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 580,
            child: Image.asset(
              "assets/fundo.png",
              fit: BoxFit.cover,
              height: 500,
            ),
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: -200,
            child: Image.asset(
              "assets/fundo.png",
              fit: BoxFit.cover,
              height: 500,
            ),
          ),
          Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Ação quando o primeiro botão for pressionado
                  },
                  child: Image.asset(
                    "assets/keyboard.png",
                    height: 50,
                    width: 50,
                  ),
                ),
                const SizedBox(height: 20), // Espaçamento entre os botões
                ElevatedButton(
                  onPressed: () {
                    // Ação quando o segundo botão for pressionado
                  },
                  child: Image.asset(
                    "assets/mic.png",
                    height: 50,
                    width: 50,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
