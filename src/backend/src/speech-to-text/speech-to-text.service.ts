import { Injectable } from '@nestjs/common';
import * as SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import * as fs from 'fs';
import * as path from 'path';
import { ProducerService } from '../kafka/producer.service';
import axios from 'axios';

@Injectable()
export class SpeechToTextService {
  private speechToText: SpeechToTextV1;
  private apiKey = process.env.API_KEY;
  private serviceUrl = process.env.SERVICE_URL;

  constructor(private readonly producerService: ProducerService) {
    const { IamAuthenticator } = require('ibm-watson/auth');
    this.speechToText = new SpeechToTextV1({
      authenticator: new IamAuthenticator({
        apikey: this.apiKey,
      }),
      serviceUrl: this.serviceUrl,
    });
    console.log("Connected to IBM Speech To Text Service!")
  }

  async transcribeAudio(audioFile: Express.Multer.File): Promise<string> {
    try {
      console.log("Inserting file on the directory...");

      const audioBuffer = Buffer.from(audioFile.buffer);
      console.log("Buffer created!");

      const audioPath = path.join(__dirname, '../../', 'input', audioFile.originalname + ('.mp3'));
      fs.writeFileSync(audioPath, audioBuffer)

      const audioStream = fs.createReadStream(audioPath);
      console.log("Inserted successfully! File name:", audioFile.originalname, ", Audio path:", audioPath);

      const params = {
        audio: audioStream,
        contentType: 'audio/mpeg',
        model: 'pt-BR_BroadbandModel'
      };
      console.log("Headers setted up! Transcribing...")

      const { result } = await this.speechToText.recognize(params);
      const transcription = result.results.map((item) => item.alternatives[0].transcript).join(' ');

      const txtFilePath = path.join(__dirname, '../../', 'transcription', 'transcription.txt');
      fs.writeFileSync(txtFilePath, transcription, 'utf-8');

      console.log("Transcription saved to:", txtFilePath);
      console.log("Audio transcribed with success!")

      try {
        const response = await axios.post('http://localhost:3000/webhook/sttHandler', {
          transcription: transcription,
          audioFileName: audioFile.originalname,
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('404: Not found');
        } else {
          console.error('Erro na solicitação:', error.message);
        }
      }

      console.log("Audio transcribed with success!")

      await this.producerService.produce('s-to-t', { value: transcription });

      console.log('Transcribed audio notification sent with success!');
      return transcription;
    }
    catch (err) {
      console.log('error: ', err);

    }
  }

  async readTxtFile(filePath: string): Promise<string> {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return data;
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }
}
