import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TravelModel } from '../models/travel.model';
import { Store } from '@ngrx/store';
import { selectAuthToken, selectUsername } from '../selectors/login.selector';
import { selectUserCity } from '../selectors/user.settings.selector';
import { map, switchMap } from 'rxjs';
import { TravelApi } from '../api-routes/user-routes';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  headers:HttpHeaders=new HttpHeaders();
  constructor(private httpClient:HttpClient,
    private store:Store
  )
  {
    this.store.select(selectAuthToken).subscribe((token)=>{
      this.headers=new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`,
      })
    })
  }

  createTravel(start:string,end:string)
  {
    let newTravel:TravelModel={
      startPoint:start,
      endPoint:end,
      accrossTheBorder:false
    }
    return this.store.select(selectUsername).subscribe((username)=>{
      this.httpClient.post(TravelApi.createTravel+username,newTravel,{headers:this.headers})
      .subscribe(response=>{
        console.log("uspeh");
      }),(error:any)=>{
        //
      }
    })
  }
}
