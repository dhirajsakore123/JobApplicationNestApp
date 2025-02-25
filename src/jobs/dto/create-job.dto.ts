import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsString()
  location: string;

  @IsString()
  experience: string;

  @IsString()
  salary: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  responsibilities: string[];

  @IsOptional()
  @IsNumber()
  applications?: number; // Optional, defaults to 0 in schema
}
