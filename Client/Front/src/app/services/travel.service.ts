import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TravelModel } from '../models/travel.model';
import { Store } from '@ngrx/store';
import { selectAuthToken, selectUsername } from '../selectors/login.selector';
import { selectUserCity } from '../selectors/user.settings.selector';
import { map, switchMap, take } from 'rxjs';
import { TravelApi, UserApi } from '../api-routes/user-routes';
import { TravelModelDto } from '../models/travel.mode.dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessChangedComponent } from '../dialog-success-changed/dialog-success-changed.component';
import { Router } from '@angular/router';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  headers:HttpHeaders=new HttpHeaders();
  constructor(private httpClient:HttpClient,
    private store:Store,
    private dialog:MatDialog,
    private router:Router
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
    let newTravel:TravelModelDto={
      startPoint:start,
      endPoint:end,
      accrossTheBorder:false,
      date:new Date()
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

  getPersonalTravel()
  {
    return this.store.select(selectUsername)
    .pipe(
      switchMap(username=>
        this.httpClient.get(TravelApi.getPersonalTravels+username,{headers:this.headers})
        .pipe(
          map(travels=>travels || null)
        )
      ),
    );
  }
  deleteTravel(travelId:string)
  {
    return this.httpClient.delete(TravelApi.deleteTravel+travelId,{headers:this.headers})
    .subscribe((response:any)=>{
      if(response.message=='Success')
      {
        this.dialog.open(DialogSuccessChangedComponent,{data:{message:'Success deleted!'}});
        this.router.navigate(['/personalTravels']);
      }
      else{
        this.dialog.open(DialogErrorComponent);
      }
    }),(error:any)=>{
      this.dialog.open(DialogErrorComponent);
    }
  }
}
