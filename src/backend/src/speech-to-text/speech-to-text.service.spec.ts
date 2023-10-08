import { Test, TestingModule } from '@nestjs/testing';
import { SpeechToTextService } from './speech-to-text.service';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { SpeechToTextModule } from './speech-to-text.module';
import { KafkaModule } from '../kafka/kafka.module';

dotenv.config();

describe('SpeechToTextService', () => {
  let service: SpeechToTextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SpeechToTextModule, KafkaModule],
    }).compile();

    service = module.get<SpeechToTextService>(SpeechToTextService);
  });

  it('should return expected result', async () => {
    const audioBuffer = fs.readFileSync(
      path.join(__dirname, '../mock/pt3.mp3'),
    );

    const audioFile = {
      fieldname: 'audio',
      originalname: 'pt3.mp3',
      encoding: 'utf-8',
      mimetype: 'audio/mpeg',
      buffer: audioBuffer,
      size: audioBuffer.length,
    } as unknown as Express.Multer.File;

    const result = await service.transcribeAudio(audioFile);
    console.log(result);

    const expected =
      'identificando tendências comportamentos padrões de desvios ';

    expect(result).toEqual(expected);
  }, 25000);
});