import { Test, TestingModule } from '@nestjs/testing';
import { SpeechToTextController } from './speech-to-text.controller';
import { SpeechToTextService } from './speech-to-text.service';
import * as dotenv from 'dotenv';
import { KafkaModule } from '../kafka/kafka.module';

dotenv.config();

describe('SpeechToTextController', () => {
  let controller: SpeechToTextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KafkaModule],
      controllers: [SpeechToTextController],
      providers: [SpeechToTextService, SpeechToTextController],
    }).compile();

    controller = module.get<SpeechToTextController>(SpeechToTextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
