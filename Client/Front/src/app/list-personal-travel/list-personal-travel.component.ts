import { Component, OnInit } from '@angular/core';
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
  map?:L.Map;
  constructor(private travelService:TravelService)
  {
    this.travelArr$=new Observable<any>();
  }
  ngOnInit(): void {
    this.travelArr$=this.travelService.getPersonalTravel();
    this.travelArr$.subscribe();
    this.map=L.map('map').setView([44.869,20.44],13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

}
