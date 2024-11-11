import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-success-registration',
  templateUrl: './dialog-success-registration.component.html',
  styleUrls: ['./dialog-success-registration.component.css']
})
export class DialogSuccessRegistrationComponent {

  constructor(private dialog:Dialog){}
  close()
  {
    this.dialog.closeAll();
  }
}
