import { Injectable } from '@nestjs/common';
import * as TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
// import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1.js';
// import { IamAuthenticator } from 'ibm-watson/auth.js';
import * as fs from 'fs';
import { IamAuthenticator } from 'ibm-watson/auth';
import * as path from 'path';
import { promisify } from 'util';

@Injectable()
export class TextToSpeechService {
  private textToSpeech: TextToSpeechV1;
  private apiKey = process.env.API_KEY_TTS;
  private serviceUrl = process.env.SERVICE_URL_TTS;

  constructor() {
    this.textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: this.apiKey,
      }),
      serviceUrl: this.serviceUrl,
    });
    console.log('Connected to IBM Text To Speech Service!');
  }

  async synthesizeText(text: string) {
    try {
      const filePath = path.join(__dirname, '../../', 'synthesized', 'text.txt');
      console.log("File Path", filePath)
      console.log("Text:", text)
      fs.writeFileSync(filePath, text, 'utf-8');


      console.log("Reading file...")
      const transcription = await fs.readFileSync(filePath, 'utf-8');
      console.log("File readed with success!")


      console.log("Setting parameters...");
      const synthesizeParams = {
        text: transcription,
        accept: 'audio/mpeg',
        voice: 'pt-BR_IsabelaV3Voice',
      };

      console.log('Synthesizing...');
      const response = await this.textToSpeech.synthesize(synthesizeParams);

      const repairBuffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        response.result.on('data', (chunk: Uint8Array) => {
          chunks.push(chunk);
        });

        response.result.on('end', () => {
          resolve(Buffer.concat(chunks));
        });

        response.result.on('error', reject);
      });

      const wavFilePath = path.join(
        __dirname,
        '../../',
        'synthesized',
        'synthesize.mp3',
      );
      fs.writeFileSync(wavFilePath, repairBuffer);

      console.log('Synthesized with success!');

    // await axios.post('http://localhost:3000/webhook/ttsHandler', {
    //   text: transcription,
    //   audioFilePath: wavFilePath,
    //   buffer: repairBuffer
    // });
    // console.log('Synthesized text notification sent with success!');
    } catch (err) {
      console.log('error: ', err);
    }
  }
}
