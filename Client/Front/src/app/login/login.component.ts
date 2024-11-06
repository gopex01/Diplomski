import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  valueUsername:string;
  valuePassword:string;
  valueNameAndSurname:string;
  valueEmail:string;
  valueUsernameReg:string;
  valuePasswordReg:string;
  valuePhoneNumber:string;
  valueDate!:Date;
  valueJMBG:string;
  tokenUser:string|null;
  valueCity:string;
  picker:Date|null;


  ngOnInit(): void {
    
  }
  constructor(private loginService:LoginService,
    private userService:UserService
  ) {

    this.valueUsername="";
    this.valuePassword="";
    this.tokenUser="";
    this.valueNameAndSurname="";
    this.valueEmail="";
    this.valueUsernameReg="";
    this.valuePasswordReg="";
    this.valuePhoneNumber="";
    //this.valueDate="";
    this.valueJMBG="";
    this.valueCity="";
    this.picker=null;
  }

  login()
  {
    this.loginService.login(this.valueUsername,this.valuePassword);
  }
  register()
  {
    const dateObject = new Date('Wed Nov 20 2024 00:00:00 GMT+0100 (Central European Standard Time)');
const formattedDate = dateObject.toISOString().substring(0, 10);
    this.loginService.register(this.valueNameAndSurname,this.valueEmail,this.valueUsernameReg,this.valuePasswordReg,this.valuePhoneNumber,this.valueJMBG,formattedDate,this.valueCity);
  }

}
