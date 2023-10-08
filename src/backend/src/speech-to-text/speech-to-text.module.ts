import { Module } from '@nestjs/common';
import { SpeechToTextService } from './speech-to-text.service';
import { SpeechToTextController } from './speech-to-text.controller';
import { KafkaModule } from '../kafka/kafka.module';
import { SpeechToTextConsumer } from './consumer';

@Module({
  imports: [KafkaModule],
  controllers: [SpeechToTextController],
  providers: [SpeechToTextService, SpeechToTextConsumer],
})
export class SpeechToTextModule { }
