import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            color: Colors.black,
          ),
          Positioned(
            left: 0, // Posição à esquerda
            right: 0, // Posição à direita
            bottom: 80, // Posição na parte inferior
            child: Image.asset(
              "assets/fundo.png",
              fit: BoxFit.cover,
              height: 440, // Altura da imagem de fundo
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            child: ListView(
              children: <Widget>[
                Align(
                  alignment: Alignment.topRight,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      SizedBox(
                        width: 200,
                        height: 150,
                        child: Image.asset(
                          "assets/conjunto-logos.png",
                          fit: BoxFit.contain,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(
                  width: 20,
                ),
                const Text(
                  "Welcome to",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 40,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const Text(
                  "Nexus",
                  style: TextStyle(
                    color: Color.fromARGB(255, 45, 61, 179),
                    fontSize: 40,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const Text(
                  "A new way to be updated.",
                  style: TextStyle(
                    color: Color.fromARGB(255, 255, 255, 255),
                    fontSize: 20,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                SizedBox(
                  width: 460,
                  height: 360,
                  child: Image.asset(
                    "assets/imagem-home.png",
                    fit: BoxFit.contain,
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            right: 16,
            bottom: 16,
            child: ElevatedButton(
              onPressed: () {
                // Ação a ser executada ao pressionar o botão
              },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical:
                        10), // Ajuste o espaçamento interno do botão conforme necessário
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(
                      10), // Ajuste o raio do contorno azul
                ),
              ),
              child: const Text(
                "Botão",
                style: TextStyle(
                  color: Colors.blue, // Cor do texto azul
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
