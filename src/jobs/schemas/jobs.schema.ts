import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  experience: string;

  @Prop({ required: true })
  salary: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  responsibilities: string[];

  @Prop({ type: Number, default: 0 }) // Number of applications
  applications: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
