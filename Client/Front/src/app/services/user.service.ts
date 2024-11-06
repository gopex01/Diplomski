import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserApi } from '../api-routes/user-routes';
import { Store } from '@ngrx/store';
import { selectAuthToken, selectUsername } from '../selectors/login.selector';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { DialogChangeEmailComponent } from '../dialog-change-email/dialog-change-email.component';
import { setimageURL } from '../actions/image.action';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers:HttpHeaders=new HttpHeaders();
  constructor(private httpClient:HttpClient,
  private store:Store,
  private dialog:MatDialog)
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
  getDataForChange()
  {
    return this.store.select(selectUsername)
    .pipe(
      switchMap(username=>
        this.httpClient.get(UserApi.getDataForChange+username,{headers:this.headers})
        .pipe(userSettings=>userSettings ||null)
      ),
    );
  }

  changeName(newName:string)
  {
    return this.store.select(selectUsername).subscribe((username)=>{
      this.httpClient.patch(UserApi.changeName+username+`/${newName}`,{},{headers:this.headers})
      .subscribe(response=>{
        console.log("Uspesno");
      }),(error:any)=>{
        this.dialog.open(DialogErrorComponent);
      }
    });
  }

  changeCity(newCity:string)
  {
    return this.store.select(selectUsername).subscribe((username)=>{
      this.httpClient.patch(UserApi.changeCity+username+`/${newCity}`,{},{headers:this.headers})
      .subscribe(response=>{
        console.log("Uspesno");
      }),(error:any)=>{
        this.dialog.open(DialogErrorComponent);
      }
    });
  }
  changePhone(newPhone:string)
  {
    return this.store.select(selectUsername).subscribe((username)=>{
      this.httpClient.patch(UserApi.changePhone+username+`/${newPhone}`,{},{headers:this.headers})
      .subscribe(response=>{
        console.log('Odgovor'+response);
      }),(error:any)=>{
        this.dialog.open(DialogErrorComponent);
      }
    });
  }
  changeEmail(newEmail:string)
  {
    return this.store.select(selectUsername).subscribe((username)=>{
      this.httpClient.patch(UserApi.changeEmail+username+`/${newEmail}`,{},{headers:this.headers})
      .subscribe(response=>{
        //this.dialog.open(DialogChangeEmailComponent);
      }),(error:any)=>{
        this.dialog.open(DialogErrorComponent);
      }
    });
  }
  updatePhoto(file:FormData)
  {
    return this.store.select(selectUsername).subscribe((username)=>{
      this.httpClient.patch(UserApi.updatePhoto+username,file, { responseType: 'text' })
      .subscribe(response=>{
        this.store.dispatch(setimageURL({imageURL:response}))
      }),(error:any)=>{
        console.log("greska update photo")
      }
    });
  }

  getImageURL()
  {
    return this.store.select(selectUsername)
    .pipe(
      switchMap(username=>
        this.httpClient.get(UserApi.getImageURL+username,{headers:this.headers})
        .pipe(imageURL=>imageURL || null)
      ),
    );
  }
}
