import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  experience: string;

  @Prop({ required: true })
  currentCTC: string;

  @Prop({ required: true })
  expectedCTC: string;

  @Prop()
  otherDetails?: string;

  @Prop({ required: true })
  resume: string;

  @Prop({ required: true })
  jobId: string;

  @Prop({ type: Date, default: Date.now })
  applicationDate: Date;

  @Prop({
    type: String,
    enum: ['Shortlisted', 'Rejected', 'Pending'],
    default: 'Pending',
  })
  status: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
