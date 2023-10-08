import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpeechToTextModule } from './speech-to-text/speech-to-text.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './logger';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { WebhookModule } from './webhook/webhook.module';
import { CrawlerModule } from './crawler/crawler.module';
import { TextToSpeechModule } from './text-to-speech/text-to-speech.module';

@Module({
  imports: [SpeechToTextModule, TextToSpeechModule, ConfigModule.forRoot(), CrawlerModule],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}