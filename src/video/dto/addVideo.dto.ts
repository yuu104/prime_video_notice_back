import { IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
export class AddVideoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsBoolean()
  is_available: boolean;
}
