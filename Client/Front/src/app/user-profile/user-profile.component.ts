import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsername } from '../selectors/login.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private store:Store){}
  klikni()
  {
    this.store.select(selectUsername).subscribe(x=>{
      console.log("User iz state",x);
    })
  }

}
