import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsEmail,
} from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
  @IsNotEmpty()
  currentCTC: string;

  @IsString()
  @IsNotEmpty()
  expectedCTC: string;

  @IsOptional()
  @IsString()
  otherDetails?: string;

  @IsOptional()
  @IsString() // Resume path will be added in controller
  resume?: string;

  @IsMongoId()
  @IsNotEmpty()
  jobId: string;
}
