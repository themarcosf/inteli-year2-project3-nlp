import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "../kafka/consumer.service";
import { KafkajsConsumerOptions } from "../kafka/kafkajs-consumer-options.interface"

@Injectable()
export class SpeechToTextConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) { }

    async onModuleInit() {
        await this.consumerService.consume({
            topic: { topics: ['s-to-t'] },
            config: { groupId: 'text-consumer' },
            onMessage: async (message) => {
                console.log('------------------', message.value.toString(), '#############################');
            },
        });
    }

}
