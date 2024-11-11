import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rest-areas',
  templateUrl: './rest-areas.component.html',
  styleUrls: ['./rest-areas.component.css']
})
export class RestAreasComponent implements OnInit{

  @Input()
  latitude:number;
  @Input()
  longitude:number;
  @Input()
  name:string
  constructor()
  {
    
    this.latitude=0;
    this.longitude=0;
    this.name='';
  }
  ngOnInit(): void {
    
  }

}
