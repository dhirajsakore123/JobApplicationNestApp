import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(['user', 'admin', 'hr'])
  role: string;
}
