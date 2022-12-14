import { Body, Injectable } from '@nestjs/common';

export let myList = ["beanz", "ketchup", "spaghetti hoops"];

import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const config = {
  method: 'get',
  url: 'https://api.themoviedb.org/3/trending/movie/week?api_key=c14286efd49ae138e2d5e2661df06122',
  // url: 'https://api.igdb.com/v4/games',
  headers: {}
};




@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getList(): any[] {
    return myList;
  }

  addToList(newItem): any[] {
    myList.push(newItem);
    return myList;
  }

  async getMovie(): Promise<any[]> {
    const response = await axios(config);
    const filtered = response.data.results.map(movie => movie.title);
    return filtered;
  }

  async getGames(): Promise<any[]> {
    const filePath = path.join(__dirname, 'gamesAPI.json');
    console.log(filePath);
    const fileData = fs.readFileSync(filePath);
    const data =JSON.parse(fileData.toString());
    console.log(data)
    const filtered = data.games.map(games => games.title);
    return filtered;
  }

}

