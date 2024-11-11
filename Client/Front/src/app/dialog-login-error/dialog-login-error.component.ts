import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-login-error',
  templateUrl: './dialog-login-error.component.html',
  styleUrls: ['./dialog-login-error.component.css']
})
export class DialogLoginErrorComponent {

  constructor(private dialog:Dialog)
  {
    
  }
  close()
  {
    this.dialog.closeAll();
  }
}
