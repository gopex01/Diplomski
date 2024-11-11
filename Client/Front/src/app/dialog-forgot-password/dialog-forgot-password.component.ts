import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent {

  valueEmail:string;
  valueUsername:string
  constructor(private userService:UserService)
  {
    this.valueEmail='';
    this.valueUsername='';
  }
  
  sendEmail()
  {
    this.userService.forgotPassword(this.valueUsername,this.valueEmail);
  }
}
