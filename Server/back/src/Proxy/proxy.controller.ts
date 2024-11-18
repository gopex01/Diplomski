import { Controller, Get } from "@nestjs/common";
import { ProxyService } from "./proxy.service";
import { catchError, map, throwError } from "rxjs";

@Controller('proxy')
export class ProxyController
{
    constructor(private readonly proxyService:ProxyService){}

    @Get('camera-stream')
    getCameraStream() {
        return this.proxyService.getCameraStream().pipe(
            map(response => {response.data;
                console.log('response',response.data);
                return response.data;
            }),
            catchError(err => {
                // Ovde možete logovati ili prilagoditi grešku
                return throwError(() => new Error('Failed to fetch camera stream.'));
            })
        );
    }
  /* @Get('camera-stream')
   getCameraStream(){
    return this.proxyService.getCameraStream();
   }*/
    /*@Get('camera-stream')
    async getCameraStream() {
      return await this.proxyService.getCameraStream();
    }*/
}