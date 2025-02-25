import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './schemas/application.schema';
import { Model } from 'mongoose';
import { Job } from 'src/jobs/schemas/jobs.schema';
// import { Job } from 'src/jobs/schemas/jobs.schema';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
    @InjectModel(Job.name)
    private readonly jobModel: Model<Job>,
  ) {}
  async create(
    createApplicationDto: CreateApplicationDto,
    file:any
  ): Promise<Application> {
    const { jobId } = createApplicationDto;

    const job = await this.jobModel.findById(jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    await this.jobModel.findByIdAndUpdate(jobId, { $inc: { applications: 1 } });

    const applicationData = {
      ...createApplicationDto,
      // eslint-disable-next-line no-constant-binary-expression
      resume: `/uploads/${file.filename}` || '--',
    };

    // 4️⃣ Create and save application
    const newApplication = new this.applicationModel(applicationData);
    return newApplication.save();
  }

  async findAll(jobId: string) {
    return await this.applicationModel.find({ jobId }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  async update(id: string, newState: string) {
    const application = await this.applicationModel.findById(id);
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    application.status = newState;
    return await application.save();
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
