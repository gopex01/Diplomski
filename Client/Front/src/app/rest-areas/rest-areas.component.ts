import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MapForRestComponent } from '../map-for-rest/map-for-rest.component';

@Component({
  selector: 'app-rest-areas',
  templateUrl: './rest-areas.component.html',
  styleUrls: ['./rest-areas.component.css']
})
export class RestAreasComponent implements OnInit{

  @Input()
  numberOfPause:number;
  @Input()
  startPoint:string
  @Input()
  latitude:number;
  @Input()
  longitude:number;
  @Input()
  name:string
  @Input()
  type:string;
  constructor(private dialog:MatDialog)
  {
    this.startPoint='';
    this.latitude=0;
    this.longitude=0;
    this.name='';
    this.numberOfPause=0;
    this.type='';
  }
  ngOnInit(): void {
    
  }
  showOnMap()
  {
    this.dialog.open(MapForRestComponent,{height:'750px',width:'750px',data:{startPoint:this.startPoint,endLat:this.latitude,endLon:this.longitude}});
  }

}
