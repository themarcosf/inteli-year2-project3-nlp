import { Controller, Post, Body} from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post('sttHandler')
  handleSTTEndpoint(@Body() payload: any): string {
    console.log('STT notification received:', payload);
    return 'STT notification received with success!';
  }

  @Post('ttsHandler')
  handleTTSEndpoint(@Body() payload: any): string {
    console.log('TTS notification received:', payload);
    return 'TTS notification received with success!';
  }
}
