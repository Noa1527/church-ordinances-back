import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('generate')
  generatePdf(@Body() data: any, @Res() res: Response) {
    this.pdfService.generatePdf(data, res);
  }
}