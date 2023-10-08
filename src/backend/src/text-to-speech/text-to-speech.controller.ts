import { Body, Controller, Post } from '@nestjs/common';
import { TextToSpeechService } from './text-to-speech.service';
import * as fs from 'fs';
import * as path from 'path';



@Controller('text-to-speech')
export class TextToSpeechController {
  constructor(private readonly textToSpeechService: TextToSpeechService) {}

  // @Post('synthesize')
  // async synthesizeTextToSpeech(@Body() requestBody: any) {
  //     try {
  //       const text = requestBody.text;
  //       await this.textToSpeechService.synthesizeText(text);
  //       return 'Speech synthesized and saved as synthesize.mp3';
  //     } catch (error) {
  //       console.error('An error occurred while synthesizing speech:', error);
  //     }
  //   }

  @Post('synthesize')
  async synthesizeTextToSpeech(@Body() requestBody: any) {
    try {
      const text = requestBody.text;
      await this.textToSpeechService.synthesizeText(text);
      // return 'Speech synthesized and saved as synthesize.mp3';

      // load audio from src\backend\synthesized\synthesize.mp3
      // and return it to the front end
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        'synthesized',
        'synthesize.mp3',
      );
      const file = fs.readFileSync(filePath);
      const base64 = Buffer.from(file).toString('base64');
      return base64;
    } catch (error) {
      console.error('An error occurred while synthesizing speech:', error);
    }
  }
}
