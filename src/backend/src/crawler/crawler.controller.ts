import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) { }

  @Post('crawl-and-response')
  async crawlAndResponse(@Body() body: { question: string }) {
    const question = body.question;
    // if (!question) {
    //   throw new Error('A question parameter is required.');
    // }
    return this.crawlerService.crawlAndResponse(question);
  }
}
