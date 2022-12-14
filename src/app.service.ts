import { Body, Injectable } from '@nestjs/common';

export let myList = ["beanz", "ketchup", "spaghetti hoops"];

import axios from 'axios';

const config = {
  method: 'get',
  url: 'https://api.themoviedb.org/3/trending/movie/week?api_key=c14286efd49ae138e2d5e2661df06122',
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
}

