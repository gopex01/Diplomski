import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-rest-areas',
  templateUrl: './list-rest-areas.component.html',
  styleUrls: ['./list-rest-areas.component.css']
})
export class ListRestAreasComponent implements OnInit{

  @Input()
  arrayRestAreas:any;
  ngOnInit(): void {
    
  }

}
