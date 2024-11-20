import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TravelModel } from '../models/travel.model';
import { TravelService } from '../services/travel.service';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
@Component({
  selector: 'app-list-personal-travel',
  templateUrl: './list-personal-travel.component.html',
  styleUrls: ['./list-personal-travel.component.css']
})
export class ListPersonalTravelComponent implements OnInit{
  
  travelArr$:Observable<any>;
  constructor(private travelService:TravelService)
  {
    this.travelArr$=new Observable<any>();
  }
  ngOnInit(): void {

    this.loadTravels();
    this.travelService.travelDeleted$.subscribe((deletedTravelId)=>{
      this.loadTravels();
    })
   // this.travelArr$=this.travelService.getPersonalTravel();
    //this.travelArr$.subscribe();
  }
  loadTravels()
  {
    this.travelArr$=this.travelService.getPersonalTravel();
    this.travelArr$.subscribe();
  }
  
  
}
