import { IsNotEmpty } from 'class-validator';

export class LeavingSoonVideosDto {
  @IsNotEmpty()
  videos: string[];
}
