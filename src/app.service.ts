import { Body, Injectable, Query } from '@nestjs/common';

export let myList = ["beanz", "ketchup", "spaghetti hoops"];

import axios from 'axios';
import { response } from 'express';
import * as fs from 'fs';

const config = {
  method: 'get',
  url: 'https://api.themoviedb.org/3/trending/movie/week?api_key=c14286efd49ae138e2d5e2661df06122',
  // url: 'https://api.igdb.com/v4/games',
  headers: {}
};




function filterFunc(obj) {
  if (obj.title == "The Menu")
    return obj.title;
}




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
  
  async getMovieTest(queryString): Promise<any[]> {
    const response = await axios(config);
    const filtered = response.data.results.filter(movie => movie.title == queryString.title);
    
    return filtered;
  
  }

  async searchMovie(queryString) : Promise<any[]> {
  try{
    let url = `https://api.themoviedb.org/3/search/movie?api_key=c14286efd49ae138e2d5e2661df06122&query=`+queryString.title;
    const searchConfig = {
      method: 'get',
      url: url,
      headers: {}
    };
    
    const response = await axios(searchConfig);
    let filtered = response.data.results[0];
    return filtered;

  }catch(e){
    console.log(e);
  }
  }




  // async getGames(): Promise<any[]> {
  //   const filePath = path.join(__dirname, 'gamesAPI.json');
  //   console.log(filePath);
  //   const fileData = fs.readFileSync(filePath);
  //   const data =JSON.parse(fileData.toString());
  //   console.log(data)
  //   const filtered = data.games.map(games => games.title);
  //   return filtered;
  // }

}

