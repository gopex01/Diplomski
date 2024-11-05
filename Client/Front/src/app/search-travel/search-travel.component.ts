import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-travel',
  templateUrl: './search-travel.component.html',
  styleUrls: ['./search-travel.component.css']
})
export class SearchTravelComponent implements OnInit{

  startPoint:string;
  endPoint:string;
  constructor(private router:Router)
  {
    this.startPoint='';
    this.endPoint='';
  }
  ngOnInit(): void {
    
  }

  onSearch()
  {
    
    this.router.navigate(['/mapa'],
      {queryParams:{start:this.startPoint,end:this.endPoint}}
    );
  }
}
