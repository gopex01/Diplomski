import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsername } from '../selectors/login.selector';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  user$:Observable<any>;
  profileSection:Boolean;
  homeSection:Boolean;
  settingsSection:Boolean;

  ngOnInit(): void {
    this.user$=this.userService.getUserByUsername();
  }
  constructor(private store:Store,
    private userService:UserService
  )
  {
    this.user$=new Observable<User>();
    this.profileSection=false;
    this.homeSection=false;
    this.settingsSection=false;
  }
  klikni()
  {
    this.store.select(selectUsername).subscribe(x=>{
      console.log("User iz state",x);
    })
  }

  showProfileSection():void{
    this.profileSection=true;
    if(this.homeSection)
    {
      this.homeSection=false;
    }
    if(this.settingsSection)
    {
      this.settingsSection=false;
    }
  }
  showHomeSection():void{
    this.homeSection=true;
    if(this.profileSection)
    {
      this.profileSection=false;
    }
    if(this.settingsSection)
    {
      this.settingsSection=false;

    }
  }
  logout()
  {
    
  }

}
