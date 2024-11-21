import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogChangeEmailComponent } from '../dialog-change-email/dialog-change-email.component';
import { DialogForgotPasswordComponent } from '../dialog-forgot-password/dialog-forgot-password.component';
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
  isPhoneNumberInvalid: boolean
  valueDate!:Date;
  valueJMBG:string;
  isJmbgInvalid:boolean;
  tokenUser:string|null;
  valueCity:string;
  picker:Date|null;
  isFormValid: boolean = false;

  ngOnInit(): void {
    
  }
  constructor(private loginService:LoginService,
    private userService:UserService,
    private dialog:MatDialog
  ) {

    this.valueUsername="";
    this.valuePassword="";
    this.tokenUser="";
    this.valueNameAndSurname="";
    this.valueEmail="";
    this.valueUsernameReg="";
    this.valuePasswordReg="";
    this.valuePhoneNumber="";
    this.isPhoneNumberInvalid=false;
    //this.valueDate="";
    this.valueJMBG="";
    this.isJmbgInvalid=false;
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
    this.valueNameAndSurname='';
    this.valueEmail='';
    this.valueUsernameReg='';
    this.valuePasswordReg='';
    this.valuePhoneNumber='';
    this.valueJMBG='';
    this.valueCity='';
  }

  forgotPassword()
  {
    this.dialog.open(DialogForgotPasswordComponent);
  }
  validatePhoneNumber() {
    this.isPhoneNumberInvalid = this.valuePhoneNumber.length > 15;
    this.validateForm(); // Revalidate the entire form
  }
  
  validateJMBG() {
    this.isJmbgInvalid = this.valueJMBG.length !== 13;
    this.validateForm(); // Revalidate the entire form
  }
  validateForm() {
    this.isFormValid = 
      this.valuePhoneNumber.length <= 15 &&
      this.valueJMBG.length === 13;
  }

}
