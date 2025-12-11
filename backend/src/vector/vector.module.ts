import { Module } from '@nestjs/common';
import { VectorService } from './vector.service';

@Module({
  controllers: [],
  providers: [VectorService],
})
export class VectorModule {}
