import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;
import 'dart:typed_data';
import 'dart:convert';
import 'dart:io';


class AudioService {
  Future<dynamic> postAudio(String audioFilePath) async {
    String apiUrl = 'http://10.128.67.160:3000';
    String path = "speech-to-text/transcribe";

    List<int> audioBytes = await File(audioFilePath).readAsBytes();

    final response = await http.post(
      Uri.parse("$apiUrl/$path"),
      headers: {'Content-Type': 'audio/mp4'},
      body: audioBytes,
    );

    final jsonResponse = json.decode(response.body);

    final String message = jsonResponse['message'];

    if (response.statusCode == 200) {
      final String audioPath = jsonResponse['audio'];

      return (
        audio: audioPath,
        message: message,
        statusCode: response.statusCode,
      );
    } else {
      return (
        audio: "",
        message: message,
        statusCode: response.statusCode,
      );
    }
  }

  Future<File> decodeAudio(String audioBase64) async {
    final Uint8List audioBytes = base64.decode(audioBase64);

    final Directory tempDir = await getTemporaryDirectory();

    final File tempFile = File('${tempDir.path}/audio.m4a');

    await tempFile.writeAsBytes(audioBytes);

    return tempFile;
  }
}
