import { Body, Injectable, Query, UnsupportedMediaTypeException } from '@nestjs/common';
import axios from 'axios';

const nodemailer = require("nodemailer");

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

  async getMovie(): Promise<any[]> {
    const response = await axios(config);
    const filtered = response.data.results.map(movie => movie.title);
    return filtered;

  }

  async searchMovie(queryString): Promise<any[]> {
    try {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=c14286efd49ae138e2d5e2661df06122&query=` + queryString.title;
      const searchConfig = {
        method: 'get',
        url: url,
        headers: {}
      };

      const response = await axios(searchConfig);
      let filtered = response.data.results[0];
      return filtered;

    } catch (e) {
      console.log(e);
    }
  }

  async sendEmail(address) {
    console.log(address.query)

    // Create a transporter object
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'mateo.hoppe@ethereal.email',
        pass: 'pvYF6H9tRwxN9ny3Y7'
      }
    });

    // Setup email data
    const mailOptions = {
      from: "the server",
      to: address.query,
      subject: "Test email",
      text: "This is a test email",
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    return;
  }

}

