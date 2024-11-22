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
  
  travelArr$:Observable<any>;//Niz sacuvanih korisnikovih putovanja
  constructor(private travelService:TravelService)
  {
    this.travelArr$=new Observable<any>();
  }
  ngOnInit(): void {

    this.loadTravels();
    this.travelService.travelDeleted$.subscribe((deletedTravelId)=>{
      this.loadTravels();//u slucaju da se obrise putovanje uklanja ga sa ekrana i radi re-render stranice kako bi se osvezio prikaz
    })

  }
  loadTravels()//ucitava putovanja iz baze
  {
    this.travelArr$=this.travelService.getPersonalTravel();
    this.travelArr$.subscribe();
  }
  
  
}
