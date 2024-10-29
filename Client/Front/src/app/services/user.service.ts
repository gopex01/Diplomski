import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserApi } from '../api-routes/user-routes';
import { Store } from '@ngrx/store';
import { selectAuthToken, selectUsername } from '../selectors/login.selector';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers:HttpHeaders=new HttpHeaders();
  constructor(private httpClient:HttpClient,
  private store:Store)
  { 
    this.store.select(selectAuthToken).subscribe((token)=>{
      this.headers=new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`,
      })
    })
  }
  
  register()
  {
    
  }
  getUserByUsername()
  {
    return this.store.select(selectUsername)
    .pipe(
      switchMap(username=>
        this.httpClient.get(UserApi.getUserByUsername+username,{headers:this.headers})
        .pipe(
          map(user=>user ||null)
        )
      ),
    );
  }
}
