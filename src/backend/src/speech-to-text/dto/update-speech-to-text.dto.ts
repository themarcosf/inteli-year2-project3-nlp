import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeechToTextDto } from './create-speech-to-text.dto';

export class UpdateSpeechToTextDto extends PartialType(CreateSpeechToTextDto) {}
