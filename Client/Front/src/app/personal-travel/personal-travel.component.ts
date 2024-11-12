import { Component, Input, OnInit } from '@angular/core';
import { TravelModel } from '../models/travel.model';

@Component({
  selector: 'app-personal-travel',
  templateUrl: './personal-travel.component.html',
  styleUrls: ['./personal-travel.component.css']
})
export class PersonalTravelComponent implements OnInit{
  
  @Input()
  travel:TravelModel|null;
  constructor()
  {
    this.travel=null;
  }
  ngOnInit(): void {
    
  }

}
