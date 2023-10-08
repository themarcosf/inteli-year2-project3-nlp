import 'package:flutter/material.dart';

class Introduction extends StatelessWidget {
  const Introduction({Key? key}) : super(key: key);

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
            bottom: 150, // Posição na parte inferior
            child: Image.asset(
              "assets/fundo.png",
              fit: BoxFit.cover,
              height: 500, // Altura da imagem de fundo
            ),
          ),

          // Elementos na parte superior esquerda
          Positioned(
            top: MediaQuery.of(context).size.height *
                0.25, // Ajuste a posição vertical desejada
            left: MediaQuery.of(context).size.width * 0.15,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Image.asset(
                  'assets/sales.png',
                  width: 60,
                  height: 60,
                ),
                const SizedBox(height: 16),
                const Text(
                  'Sales Team',
                  style: TextStyle(color: Colors.white),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Access an application that is simple and\nintuitive, ask your questions and receive\nanswers in a summarized and focused way.',
                  maxLines: 3,
                  style: TextStyle(color: Colors.white, fontSize: 14),
                ),
              ],
            ),
          ),

          // Elementos na parte inferior direita
          Positioned(
            bottom: MediaQuery.of(context).size.height *
                0.25, // Ajuste a posição vertical desejada
            right: MediaQuery.of(context).size.width * 0.15,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Image.asset(
                  'assets/marketing.png',
                  width: 80,
                  height: 80,
                ),
                const SizedBox(height: 16),
                const Text(
                  'Marketing Team',
                  style: TextStyle(color: Colors.white),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Receive recommendations for themes for\ncampaigns, most relevant subjects, popular\nplatforms and target audience',
                  style: TextStyle(color: Colors.white, fontSize: 14),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
