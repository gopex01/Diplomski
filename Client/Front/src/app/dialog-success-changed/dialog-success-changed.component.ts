import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-success-changed',
  templateUrl: './dialog-success-changed.component.html',
  styleUrls: ['./dialog-success-changed.component.css']
})
export class DialogSuccessChangedComponent {

 
  constructor(@Inject(MAT_DIALOG_DATA) public data:{message:string},private dialog:Dialog){}
  
  close()
  {
    this.dialog.closeAll();
  }
}
