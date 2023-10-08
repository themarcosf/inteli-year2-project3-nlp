import { Controller, Post, UploadedFile, UseInterceptors, Param, Get } from '@nestjs/common';
import { SpeechToTextService } from './speech-to-text.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('speech-to-text')
export class SpeechToTextController {
  constructor(private readonly speechToTextService: SpeechToTextService) {}

  @Post('transcribe')
  @UseInterceptors(FileInterceptor('audio'))
  async transcribeAudio(@UploadedFile() audioFile: Express.Multer.File): Promise<{ transcription: string }> {
     console.log('Received file:', audioFile);
     const transcription = await this.speechToTextService.transcribeAudio(audioFile);
     return { transcription };
  }

  @Get('read')
  async readTxtFile(): Promise<string> {
    const filePath = `${__dirname}/../../transcription/transcription.txt`;
    try {
      const fileData = await this.speechToTextService.readTxtFile(filePath);
      return fileData;
    } catch (error) {
      console.log(`File not found`);
    }
  }
}
