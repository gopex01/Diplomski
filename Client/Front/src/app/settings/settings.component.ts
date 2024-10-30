import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsername } from '../selectors/login.selector';
import { getSettingsInfo } from '../actions/userSettings.action';
import { selectUserCity, selectUserEmail, selectUserName, selectUserPhone } from '../selectors/user.settings.selector';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{


  isVisibleIName:Boolean;
  isVisibleIEmail:Boolean;
  isVisibleICity:Boolean;
  isVisibleIPhone:Boolean;
  isVisibleDeactivateInput:Boolean;
  isVisibleDeactivateButton:Boolean;
  newName:string;
  newPhone:string;
  newCity:string;
  newEmail:string;
  newPassword:string;
  name:string|undefined;
  city:string|undefined;
  phone:string|undefined;
  email:string|undefined;
  password:string;
  passwordValue:string;
  nameDown:Boolean;
  emailDown:Boolean;
  phoneDown:Boolean;
  cityDown:Boolean;
  isVisibleButtonName:Boolean;
  isVisibleButtonEmail:Boolean;
  isVisibleButtonPhone:Boolean;
  isVisibleButtonCity:Boolean;
  isVisibleIPasswordOld:Boolean;
  isVisibleIPasswordNew:Boolean;
  passwordDown:Boolean;
  isVisibleButtonpassword:Boolean;
  ngOnInit(): void {
    this.store.select(selectUsername).subscribe((username)=>{
      this.store.dispatch(getSettingsInfo({username}));
    });
    this.store.select(selectUserName).subscribe((nameX)=>{
      this.name=nameX;
    });
    this.store.select(selectUserPhone).subscribe((phoneX)=>{
      this.phone=phoneX;
    });
    this.store.select(selectUserCity).subscribe((cityX)=>{
      this.city=cityX;
    });
    this.store.select(selectUserEmail).subscribe((emailX)=>{
      this.email=emailX;
    })
  }

  constructor(private store:Store,
    private userService:UserService
  )
  {
    this.newName="";
    this.newEmail="";
    this.newPhone="";
    this.newCity="";
    this.newPassword="";
    this.isVisibleIEmail=false;
    this.isVisibleIName=false;
    this.isVisibleIPhone=false;
    this.isVisibleICity=false;
    this.isVisibleDeactivateButton=false;
    this.isVisibleDeactivateInput=false;
    this.isVisibleIPasswordOld=false;
    this.isVisibleIPasswordNew=false;
    this.name="";
    this.city="";
    this.phone="";
    this.email="";
    this.password="";
    this.passwordValue="";
    this.nameDown=false;
    this.emailDown=false;
    this.phoneDown=false;
    this.cityDown=false;
    this.passwordDown=false;
    this.isVisibleButtonName=false;
    this.isVisibleButtonEmail=false;
    this.isVisibleButtonPhone=false;
    this.isVisibleButtonCity=false;
    this.isVisibleButtonpassword=false;
  }

  changeVisibiltyIName()
  {
    if(this.isVisibleIName===true){
      this.isVisibleIName=false;
    }
    else{
      this.isVisibleIName=true;
    }
    if(this.isVisibleButtonName===true)
      {
        this.isVisibleButtonName=false;
      }
      else{
        this.isVisibleButtonName=true;
      }
  }

  changeNameDown()
  {
    if(this.nameDown===true)
    {
      this.nameDown=false;
    }
    else{
      this.nameDown=true;
    }
  }
  changeName()
  {
    this.userService.changeName(this.newName);
    this.name=this.newName;
  }

  changeVisibiltyIEmail()
  {
    if(this.isVisibleIEmail===true)
    {
      this.isVisibleIEmail=false;
    }
    else{
      this.isVisibleIEmail=true;
    }
    if(this.isVisibleButtonEmail===true)
      {
        this.isVisibleButtonEmail=false;
      }
      else{
        this.isVisibleButtonEmail=true;
      }
  }
  changeEmailDown()
  {
    if(this.emailDown===true)
    {
      this.emailDown=false;
    }
    else{
      this.emailDown=true;
    }
  }
  changeEmail()
  {
    this.userService.changeEmail(this.newEmail);
    this.email=this.newEmail;
  }

  changeVisibiltyIPhone()
  {
    if(this.isVisibleIPhone===true)
      {
        this.isVisibleIPhone=false;
      }
      else{
        this.isVisibleIPhone=true;
      }
      if(this.isVisibleButtonPhone===true)
        {
          this.isVisibleButtonPhone=false;
        }
        else{
          this.isVisibleButtonPhone=true;
        }
  }
  changePhoneDown()
  {
    if(this.phoneDown===true)
      {
        this.phoneDown=false;
      }
      else{
        this.phoneDown=true;
      }
  }
  changePhone()
  {
    this.userService.changePhone(this.newPhone);
    this.phone=this.newPhone;
  }
  changeVisibiltyICity()
  {
    if(this.isVisibleICity===true)
      {
        this.isVisibleICity=false;
      }
      else{
        this.isVisibleICity=true;
      }
      if(this.isVisibleButtonCity===true)
        {
          this.isVisibleButtonCity=false;
        }
        else{
          this.isVisibleButtonCity=true;
        }
  }
  changeCityDown()
  {
    if(this.cityDown===true)
      {
        this.cityDown=false;
      }
      else{
        this.cityDown=true;
      }
  }
  changeCity()
  {
    this.userService.changeCity(this.newCity);
    this.city=this.newCity;
  }
  deactivate() {
    throw new Error('Method not implemented.');
  }
  changeVisibiltyDeactivate() {
      
      if(this.isVisibleDeactivateButton)
        {
          this.isVisibleDeactivateButton=false;
        }
        else{
          this.isVisibleDeactivateButton=true;
        }
        if(this.isVisibleDeactivateInput)
        {
          this.isVisibleDeactivateInput=false;
        }
        else{
          this.isVisibleDeactivateInput=true;
        }
  }
  changeVisibiltyIPassword()
  {

  }
  changePasswordDown()
  {

  }
  changePassword()
  {

  }

}
