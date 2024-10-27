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
  valueDate:string;
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
    this.valueDate="";
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
    console.log(this.valueDate);
  }

}
