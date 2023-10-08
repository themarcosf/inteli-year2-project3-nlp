import 'dart:io';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:front/service/audio.service.dart';
import 'package:record/record.dart';

class Start extends StatefulWidget {
  const Start({super.key});

  @override
  State<Start> createState() => _StartState();
}

class _StartState extends State<Start> {
  late Record audioRecord;
  late AudioPlayer audioPlayer;
  bool isRecording = false;
  bool isPlaying = false;
  String audioPath = '';
  final AudioService audioService = AudioService();

  @override
  void initState() {
    audioPlayer = AudioPlayer();
    audioRecord = Record();
    super.initState();
  }

  @override
  void dispose() {
    audioRecord.dispose();
    audioPlayer.dispose();
    super.dispose();
  }

  Future<void> startRecording() async {
    try {
      if (await audioRecord.hasPermission()) {
        await audioRecord.start();
        setState(() {
          isRecording = true;
        });
      } else {
        print("Error");
      }
    } catch (e) {
      print("Error");
    }
  }

  Future<void> stopRecording() async {
    try {
      String? path = await audioRecord.stop();

      setState(() {
        isRecording = false;
        audioPath = path!;
      });
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
    }
  }

  Future<void> playRecording() async {
    if (audioPath.isNotEmpty) {
      try {
        Source urlSource = UrlSource(audioPath);
        await audioPlayer.play(urlSource);
        setState(() {
          isPlaying = true;
        });

        audioPlayer.onPlayerComplete.listen((event) {
          setState(() {
            isPlaying = false;
          });
        });
      } catch (e) {
        print("Error");
      }
    } else {
      print("Error");
    }
  }

  Future<void> processAudio() async {
    try {
      dynamic postResponse = await audioService.postAudio(audioPath);

      String audioBase64 = postResponse.audio;
      File? receivedAudio = await audioService.decodeAudio(audioBase64);

      setState(() {
        audioPath = receivedAudio.path;
      });
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Audio Recorder'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            if (isRecording)
              const Text(
                'Recording in Progress',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
            ElevatedButton(
              onPressed: isRecording ? stopRecording : startRecording,
              child: isRecording
                  ? const Text('Stop Recording')
                  : const Text('Start Recording'),
            ),
            const SizedBox(
              height: 32,
            ),
            if (!isRecording)
              ElevatedButton(
                onPressed: playRecording,
                child: const Text('Play Recording'),
              ),
            ElevatedButton.icon(
              onPressed: processAudio,
              label: const Text('Process Recording'),
              icon: const Icon(Icons.send),
            ),
          ],
        ),
      ),
    );
  }
}
