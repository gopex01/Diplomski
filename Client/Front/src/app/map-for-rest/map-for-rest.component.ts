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

  //sluzi kao pomocna mapa kako bi se prikazala putanja do predlozenih odmorista
  map?:L.Map;
  constructor(@Inject(MAT_DIALOG_DATA) public data:{startPoint:string,endLat:number,endLon:number},private dialog:MatDialog,private geocodingService:GeocodingService)
  {
   
  }
  async calucalteRoute()
  {
    try{
      const startCoords=await this.geocodingService.getCoordinates(this.data.startPoint).toPromise();//nalazi koordinate od pocetnog mesta jer za odmoriste vec ima koordinate 
      const startLatLng = L.latLng(startCoords!.results[0].geometry.lat, startCoords!.results[0].geometry.lng);//kreira se promenljiva tipa koordinata
      const endLatLng=L.latLng(this.data.endLat,this.data.endLon);
      this.addRoute(startLatLng,endLatLng);
    } catch(error){
      console.error("Greska prilikom dobijanja koordinata",error);
    }
    
  }

  addRoute(start:L.LatLng,end:L.LatLng)
  {
    //kreira rutu izmedju tacaka strat i end pomocu biblioteke Leaflet Routing Machine
    const routingControl=L.Routing.control({
      waypoints:[start,end],//pocetna i krajnja tacka
      routeWhileDragging:true,//omogucava da se ruta dinamicki azurira dok se prevlace tacke po mapi
      show:true,
      collapsible:true
    }).addTo(this.map!);

    routingControl.on('routesfound',(e:any)=>{
      const routes=e.routes;
      const summary=routes[0].summary;//ukupno rastojanje i duzina puta
      const routeCoords=routes[0].coordinates;//sve tacke na ruti 
      const totalTimeInMinutes = summary.totalTime / 60;
      const hours = Math.floor(totalTimeInMinutes / 60);
      const minutes = Math.floor(totalTimeInMinutes % 60);
      const popupContent=`
      <b>Travel distance:</b> ${(summary.totalDistance/1000).toFixed(2)} km<br>
      <b>Travel time:</b> ${hours} hours and ${minutes} minutes`;
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
