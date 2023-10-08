import { PartialType } from '@nestjs/mapped-types';
import { CreateTextToSpeechDto } from './create-text-to-speech.dto';

export class UpdateTextToSpeechDto extends PartialType(CreateTextToSpeechDto) {}
