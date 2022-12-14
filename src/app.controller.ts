import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { myList } from './app.service';

export class NewItemInput{
  text: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/list')
  getList(): any[] {
    return this.appService.getList();
  }

  @Post('/add')
  addToList(@Body() body: NewItemInput): any[] {
    const { text } = body;
    return this.appService.addToList(text);
  }


  @Get('/mov')
  getMovie(): Promise<any[]>{
    return this.appService.getMovie();
  }
}
