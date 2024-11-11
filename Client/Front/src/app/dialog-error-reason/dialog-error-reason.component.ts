import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error-reason',
  templateUrl: './dialog-error-reason.component.html',
  styleUrls: ['./dialog-error-reason.component.css']
})
export class DialogErrorReasonComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:{message:string},private dialog:MatDialog){}
  
  close()
  {
    this.dialog.closeAll();
  }
}
