import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CrawlerService {
  async crawlAndResponse(question: string) {

    // const crawl = await axios.get('http://127.0.0.1:5000/crawl').then((res) => {
    //   console.log(res.data);
    //   return res.data;
    // }
    // ).catch((err) => {
    //   console.log(err);
    //   return err;
    // });

    const post = await axios.post('http://127.0.0.1:5000/question', { question }).then((res) => {
      console.log(res.data);
      return res.data;
    }
    ).catch((err) => {
      console.log(err);
      return err;
    });

    return post
  }
}
