import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { catchError, map, Observable } from "rxjs";
import * as cheerio from 'cheerio';
import * as puppeteer from "puppeteer";
@Injectable()
export class ProxyService{
    
    constructor(private readonly httpService:HttpService){}

    getCameraStream():Observable<any>
    {
        const url='https://kamere.amss.org.rs';
        return this.httpService.get(url);
    }
   /*getCameraStream():Observable<any>
   {
        const url='https://kamere.amss.org.rs';
        return this.httpService.get(url)
        .pipe(
            map(response=>{
                const $=cheerio.load(response.data);

                const videoSrc=$('video source').attr('src') || $('iframe').attr('src');

                if(videoSrc){
                    return {type:'video',url:videoSrc};
                }
                else{
                    throw new Error('video soruce not found');
                }
            }),
            catchError(err=>{
                throw new Error("failed to fetch camera stream:"+err.message);
            })
        );
   }*/
        /*async getCameraStream(): Promise<any> {
            const url = 'https://kamere.amss.org.rs';
        
            // Pokrenite Puppeteer
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
        
            try {
              await page.goto(url, { waitUntil: 'networkidle0' });
        
              // Pročitajte HTML sadržaj i pronađite video URL
              const videoSrc = await page.evaluate(() => {
                const videoElement = document.querySelector('video source');
                if (videoElement) {
                  return (videoElement as HTMLSourceElement).src;
                }
                const iframeElement = document.querySelector('iframe');
                if (iframeElement) {
                  return (iframeElement as HTMLIFrameElement).src;
                }
                return null;
              });
        
              await browser.close();
        
              if (!videoSrc) {
                throw new Error('Video source not found');
              }
        
              return { type: 'video', url: videoSrc };
            } catch (error) {
              await browser.close();
              throw new Error('Failed to fetch camera stream: ' + error.message);
            }
          }*/

}