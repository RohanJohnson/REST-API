import { Body, Controller, Get, Query, Post, Req } from '@nestjs/common';
import { query } from 'express';
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

  @Get('/movtest')
  async getMovieTest(@Query()query): Promise<any[]>{
    const data =  await this.appService.getMovieTest(query);
    return data;
  }

  @Get('/search')
  async searchMovie(@Query()query): Promise<any[]>{
    const data =  await this.appService.searchMovie(query);
    return data;
  }

  // @Get('/games')
  // getGames(): Promise<any[]>{
  //   return this.appService.getGames();
  // }
}
