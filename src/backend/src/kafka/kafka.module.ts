import { Module } from '@nestjs/common'
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    providers: [ProducerService, ConsumerService],
    exports: [ProducerService, ConsumerService]
})
export class KafkaModule { }