import { Module } from '@nestjs/common';
import { MermaidService } from './mermaid.service';
import { PDFService } from './pdf.service';

@Module({
  controllers: [],
  providers: [MermaidService, PDFService],
})
export class RendererModule {}