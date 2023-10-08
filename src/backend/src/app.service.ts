import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service'

@Injectable()
export class AppService {
  healthCheck(): string {
    return 'Healthy!';
  }
}
