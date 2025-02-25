import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schemas/jobs.schema';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private readonly jobModel: Model<Job>) {}
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const newJob = new this.jobModel({ ...createJobDto, applications: 0 });
    return await newJob.save();
  }

  async findAll() {
    return await this.jobModel.find().exec();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.jobModel.findById(id);
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    Object.assign(job, updateJobDto);
    await job.save();
    return job;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
