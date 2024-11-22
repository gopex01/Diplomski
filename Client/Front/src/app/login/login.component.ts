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

  valueUsername:string;//polje za vrednost username-a prilikom login-a
  valuePassword:string;//--||-- passworda
  valueNameAndSurname:string;//registracija
  valueEmail:string;//registracija
  valueUsernameReg:string;//registracija
  valuePasswordReg:string;//registracija
  valuePhoneNumber:string;//registracija
  isPhoneNumberInvalid: boolean;////registracija proverava da li je broj telefona u odgovarajucem formatu(duzina)
  valueDate!:Date;//registracija
  valueJMBG:string;//registracija
  isJmbgInvalid:boolean;////registracija proverava da li je JMBG u odgovarajucem formatu(duzina)
  tokenUser:string|null;//mislim da je suvisan
  valueCity:string;//registracija
  picker:Date|null;//registracija
  isFormValid: boolean = false;//sluzi da blokira dugme ukoliko jmbg i broj telefona nisu odgovarajuci

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
    this.valueNameAndSurname='';//brisu se polja nakon registracije
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
