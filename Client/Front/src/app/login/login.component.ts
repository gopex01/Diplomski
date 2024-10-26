import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  valueUsername:string;
  valuePassword:string;
  valueName:string;
  valueSurname:string;
  valueEmail:string;
  valueUsernameReg:string;
  valuePasswordReg:string;
  valuePhoneNumber:string;
  valueDate:string;
  valueJMBG:string;
  tokenUser:string|null;
  valueCity:string;
  valueCountry:string;

  ngOnInit(): void {
    
  }
  constructor(private loginService:LoginService) {

    this.valueUsername="";
    this.valuePassword="";
    this.tokenUser="";
    this.valueName="";
    this.valueSurname="";
    this.valueEmail="";
    this.valueUsernameReg="";
    this.valuePasswordReg="";
    this.valuePhoneNumber="";
    this.valueDate="";
    this.valueJMBG="";
    this.valueCity="";
    this.valueCountry="";
  }

  login()
  {
    this.loginService.login(this.valueUsername,this.valuePassword);
  }
  register()
  {

  }

}
