import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers:HttpHeaders;
  constructor(private httpClient:HttpClient,
  )
  { 
    this.headers=new HttpHeaders({
      'Content-Type':'application/json'
    });
  }
  
  register()
  {
    
  }
}
