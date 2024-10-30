import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dialog-change-email',
  templateUrl: './dialog-change-email.component.html',
  styleUrls: ['./dialog-change-email.component.css']
})
export class DialogChangeEmailComponent {

  constructor(private loginService:LoginService)
  {

  }
  close()
  {
    this.loginService.logout();
  }
}
