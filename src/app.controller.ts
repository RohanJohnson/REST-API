import { Body, Controller, Get, Query, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/mov')
  getMovie(): Promise<any[]> {
    return this.appService.getMovie();
  }

  @Get('/search')
  async searchMovie(@Query() query): Promise<any[]> {
    const data = await this.appService.searchMovie(query);
    return data;
  }

  @Get('/email')
  async sendEmail(@Query() query): Promise<string> {
    await this.appService.sendEmail(query);
    return ("sent");
  }



}
