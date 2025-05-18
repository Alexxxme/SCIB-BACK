import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  handleUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) body: CreateCandidateDto
  ) {
    const { name, surname } = body;
    return this.candidatesService.processCandidateFile(file.buffer, name, surname);
  }
}
