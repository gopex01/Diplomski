import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserApi } from '../api-routes/user-routes';
import { Store } from '@ngrx/store';
import { selectAuthToken, selectUsername } from '../selectors/login.selector';
import { map, Observable, switchMap, take } from 'rxjs';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { DialogChangeEmailComponent } from '../dialog-change-email/dialog-change-email.component';
import { setimageURL } from '../actions/image.action';
import { DialogSuccessChangedComponent } from '../dialog-success-changed/dialog-success-changed.component';
import { LoginService } from './login.service';
import { DialogErrorReasonComponent } from '../dialog-error-reason/dialog-error-reason.component';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers:HttpHeaders=new HttpHeaders();
  constructor(private httpClient:HttpClient,
  private store:Store,
  private dialog:MatDialog,
  private loginService:LoginService)
  { 
    this.store.select(selectAuthToken).subscribe((token)=>{//selektuje token iz store i stavlja ga u headers zbog autorizacije
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
  getDataForChange()
  {
    return this.store.select(selectUsername)
    .pipe(
      take(1),
      switchMap(username=>
        this.httpClient.get(UserApi.getDataForChange+username,{headers:this.headers})
        .pipe(userSettings=>userSettings ||null)
      ),
    );
  }

  changeName(newName:string)
  {
    return this.store.select(selectUsername).pipe(take(1)).subscribe((username)=>{
      this.httpClient.patch(UserApi.changeName+username+`/${newName}`,{},{headers:this.headers})
      .subscribe((response:any)=>{
        if(response.message=='Success')
        {
          this.dialog.open(DialogErrorReasonComponent,{data:{message:'Success changed Name'}});
        }
        else{
          this.dialog.open(DialogErrorReasonComponent,{data:{message:response.message}});
        }
      }),(error:any)=>{
        this.dialog.open(DialogErrorComponent);
      }
    });
  }

  changeCity(newCity:string)
  {
    return this.store.select(selectUsername).pipe(take(1)).subscribe((username)=>{
      this.httpClient.patch(UserApi.changeCity+username+`/${newCity}`,{},{headers:this.headers})
      .subscribe((response:any)=>{
        if(response.message=='Success')
        {
          this.dialog.open(DialogSuccessChangedComponent,{data:{message:response.message}});
        }
        else{
          this.dialog.open(DialogErrorReasonComponent,{data:{message:response.message}});
        }
      }),(error:any)=>{
        this.dialog.open(DialogErrorComponent);
      }
    });
  }
  changePhone(newPhone:string)
  {
    return this.store.select(selectUsername).pipe(take(1)).subscribe((username)=>{
      this.httpClient.patch(UserApi.changePhone+username+`/${newPhone}`,{},{headers:this.headers})
      .subscribe((response:any)=>{
        if(response.message='Success')
        {
          this.dialog.open(DialogSuccessChangedComponent,{data:{message:response.message}});
        }
        else{
          this.dialog.open(DialogErrorReasonComponent,{data:{message:response.message}});
        }
      }),(error:any)=>{
        this.dialog.open(DialogErrorComponent);
      }
    });
  }
  changeEmail(newEmail:string)
  {
    return this.store.select(selectUsername).pipe(take(1)).subscribe((username)=>{
      this.httpClient.patch(UserApi.changeEmail+username+`/${newEmail}`,{},{headers:this.headers})
      .subscribe((response:any)=>{
        if(response.message=='Success')
        {
          this.dialog.open(DialogSuccessChangedComponent,{data:{message:'Success changed email.Now check your email to verify your account'}});
          this.loginService.logout();
        }
        else{
          this.dialog.open(DialogErrorComponent);
        }
      }),(error:any)=>{
        this.dialog.open(DialogErrorComponent);
      }
    });
  }
  changePassword(oldPass:string,newPass:string)
  {
    return this.store.select(selectUsername).pipe(take(1)).subscribe((username)=>{
      this.httpClient.patch(UserApi.changePassword+username+`/${oldPass}/${newPass}`,{},{headers:this.headers})
      .subscribe((response:any)=>{
        if(response.message=='Success')
        {
          console.log(response.message);
          this.dialog.open(DialogSuccessChangedComponent,{data:{message:'Success changed password! Please sign in again.'}});
          this.loginService.logout();
        }
        else{
          if(response.message=='Current password is inncorrect!'){
          this.dialog.open(DialogErrorReasonComponent,{data:{message:'Current password is inncorrect'}});
          }
          else{
            this.dialog.open(DialogErrorComponent);
          }

        }
      }),(error:any)=>{
        console.log(error);
        this.dialog.open(DialogErrorComponent);
      }
    })
  }
  updatePhoto(file:FormData)
  {
    return this.store.select(selectUsername).pipe(take(1)).subscribe((username)=>{
      this.httpClient.patch(UserApi.updatePhoto+username,file, { responseType: 'text' })
      .subscribe(response=>{
        this.store.dispatch(setimageURL({imageURL:response}))//postavlja url slike u store 
      }),(error:any)=>{
        console.log("greska update photo")
      }
    });
  }

  getImageURL()
  {
    return this.store.select(selectUsername).pipe(take(1))
    .pipe(
      switchMap(username=>
        this.httpClient.get(UserApi.getImageURL+username,{headers:this.headers})
        .pipe(imageURL=>imageURL || null)
      ),
    );
  }

  forgotPassword(username:string,email:string)
  {
    return this.httpClient.post(UserApi.forgotPassword+username+`/${email}`,{},{headers:this.headers})
    .subscribe((response:any)=>{
      if(response.message=='Success')
      {
        this.dialog.open(DialogSuccessChangedComponent,{data:{message:'Check your email.'}});
      }
      else{
        this.dialog.open(DialogErrorReasonComponent,{data:{message:response.message}});
      }
    }),(error:any)=>{
      this.dialog.open(DialogErrorComponent);
    }
  }

  deactivateAccount(password:string)
  {
    return this.store.select(selectUsername).pipe(take(1)).subscribe((username)=>{
      this.httpClient.delete(UserApi.deactivateAccount+username+`/${password}`,{headers:this.headers})
      .subscribe((response:any)=>{
        if(response.message=='Success')
        {
          this.dialog.open(DialogSuccessChangedComponent,{data:{message:'Success deactivated account'}});
          this.loginService.logout();
        }
        else{
          if(response.message=='Wrong password')
          {
            this.dialog.open(DialogErrorReasonComponent,{data:{message:'Wrong password!'}});
          }
          else{
            this.dialog.open(DialogErrorComponent);
          }
        }
      }),(error:any)=>{
        this.dialog.open(DialogErrorComponent);
      }
    })
  }
}
