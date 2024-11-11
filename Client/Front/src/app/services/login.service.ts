import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { SingUp } from '../api-routes/user-routes';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction, loginActionSuccess } from '../actions/login.action';
import { Dialog } from '@angular/cdk/dialog';
import { DialogSuccessRegistrationComponent } from '../dialog-success-registration/dialog-success-registration.component';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { DialogLoginErrorComponent } from '../dialog-login-error/dialog-login-error.component';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  headers:HttpHeaders;
  constructor(private httpClient:HttpClient,
    private router:Router,
    private store:Store,
    private dialog:Dialog
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

    },(error)=>{
      this.dialog.open(DialogLoginErrorComponent);
    }
  );
  }

  register(nameAndSur:string,mail:string,user:string,pass:string,phone:string,jmb:string,date:string,cit:string)
  {
    const data={
      nameAndsurname:nameAndSur,
      email:mail,
      username:user,
      password:pass,
      phonenumber:phone,
      jmbg:jmb,
      dateofbirth:date,
      city:cit
    }
    console.log(data);
    this.httpClient.post(SingUp.register,data,{headers:this.headers,responseType:'text'}).subscribe((response:any)=>{
      if(response=='Success created account')
      {
        this.dialog.open(DialogSuccessRegistrationComponent);
      }
      else{
        this.dialog.open(DialogErrorComponent);
      }

    },(error)=>{
      this.dialog.open(DialogErrorComponent);
    }
  );
  }
  logout()
  {
    this.store.dispatch(loginActionSuccess({token:'',username:''}));
    this.router.navigate(['']);
  }
}
