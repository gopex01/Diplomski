import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { SingUp } from '../api-routes/user-routes';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction, loginActionSuccess } from '../actions/login.action';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  headers:HttpHeaders;
  constructor(private httpClient:HttpClient,
    private router:Router,
    private store:Store
  )
  {
    this.headers=new HttpHeaders({
      'Content-Type':'application/json'
    });
  }

  login(username:string,password:string)
  {
    const data={
      username:username,
      password:password
    }
    this.httpClient.post(SingUp.login,data,{headers:this.headers}).subscribe((response:any)=>{
      this.store.dispatch(loginActionSuccess({token:response.access_token,username:response.username}));
      this.router.navigate(['/UserProfile']);

    },(error)=>{}
  );
  }

  register()
  {
    
  }
  logout()
  {
    this.store.dispatch(loginActionSuccess({token:'',username:''}));
    this.router.navigate(['']);
  }
}
