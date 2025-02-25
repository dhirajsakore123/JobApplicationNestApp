import { diskStorage } from 'multer';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('resume', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          cb(null, `${uniqueSuffix}.pdf`); // Always save with .pdf extension
        },
      }),
    }),
  )
  create(
    @Body() createApplicationDto: CreateApplicationDto,
    @UploadedFile() file: any,
  ) {
    return this.applicationsService.create(createApplicationDto,file);
  }

  @Get()
  findAll(@Query('jobId') jobId: string) {
    return this.applicationsService.findAll(jobId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: { status: string },
  ) {
    return this.applicationsService.update(id, updateApplicationDto.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}
