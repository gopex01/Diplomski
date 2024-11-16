import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { GeocodingService } from '../services/geocoding.service';
@Component({
  selector: 'app-map-for-rest',
  templateUrl: './map-for-rest.component.html',
  styleUrls: ['./map-for-rest.component.css']
})
export class MapForRestComponent implements OnInit{

  map?:L.Map;
  constructor(@Inject(MAT_DIALOG_DATA) public data:{startPoint:string,endLat:number,endLon:number},private dialog:MatDialog,private geocodingService:GeocodingService)
  {
   
  }
  async calucalteRoute()
  {
    try{
      const startCoords=await this.geocodingService.getCoordinates(this.data.startPoint).toPromise();
      const startLatLng = L.latLng(startCoords!.results[0].geometry.lat, startCoords!.results[0].geometry.lng);
      const endLatLng=L.latLng(this.data.endLat,this.data.endLon);
      this.addRoute(startLatLng,endLatLng);
    } catch(error){
      console.error("Greska prilikom dobijanja koordinata",error);
    }
    
  }

  addRoute(start:L.LatLng,end:L.LatLng)
  {
    const routingControl=L.Routing.control({
      waypoints:[start,end],
      routeWhileDragging:true,
      show:false,
    }).addTo(this.map!);

    routingControl.on('routesfound',(e:any)=>{
      const routes=e.routes;
      const summary=routes[0].summary;
      const routeCoords=routes[0].coordinates;
      const totalTimeInMinutes = summary.totalTime / 60;
      const hours = Math.floor(totalTimeInMinutes / 60);
      const minutes = Math.floor(totalTimeInMinutes % 60);
      const popupContent=`
      <b>Duzina rute:</b> ${(summary.totalDistance/1000).toFixed(2)} km<br>
      <b>Procenjeno vreme putovanja:</b> ${hours} sati i ${minutes} minuta`;
      L.marker(start)
      .addTo(this.map!)
      .bindPopup(popupContent)
      .openPopup();
      L.marker(end)
      .addTo(this.map!);
    })

  }
  ngOnInit(): void {

    this.calucalteRoute();
    this.map=L.map('map2').setView([44.869,20.44],13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);    

      setTimeout(() => {
        this.map!.invalidateSize();
      }, 300);
  }

}
