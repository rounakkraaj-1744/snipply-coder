import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Module({
  controllers: [],
  providers: [JobsService],
})
export class JobsModule {}
