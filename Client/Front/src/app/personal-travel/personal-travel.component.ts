import { Component, Input, OnInit } from '@angular/core';
import { TravelModel } from '../models/travel.model';
import { Router } from '@angular/router';
import { TravelService } from '../services/travel.service';

@Component({
  selector: 'app-personal-travel',
  templateUrl: './personal-travel.component.html',
  styleUrls: ['./personal-travel.component.css']
})
export class PersonalTravelComponent implements OnInit{
  
  @Input()
  travel:TravelModel|null;
  constructor(private router:Router,private travelService:TravelService)
  {
    this.travel=null;
  }
  ngOnInit(): void {
    
  }

  showDetail()
  {
    this.router.navigate(['personalTravelView'],
      {queryParams:{start:this.travel?.startPoint,end:this.travel?.endPoint}}
    );
  }
  delete()
  {
    this.travelService.deleteTravel(this.travel!._id) 
  }

}
