import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import { GeocodingService } from '../services/geocoding.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelService } from '../services/travel.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  startPoint:string;
  endPoint:string;
  map?:L.Map;

  constructor(private geocodingService:GeocodingService,private http:HttpClient,private route: ActivatedRoute,private travelService:TravelService)
  {
    this.startPoint='';
    this.endPoint='';
  }
 
 
  async calculateRoute()
  {
    try {
      const startCoords = await this.geocodingService.getCoordinates(this.startPoint).toPromise();
      const endCoords = await this.geocodingService.getCoordinates(this.endPoint).toPromise();

      const startLatLng = L.latLng(startCoords!.results[0].geometry.lat, startCoords!.results[0].geometry.lng);
      const endLatLng = L.latLng(endCoords!.results[0].geometry.lat, endCoords!.results[0].geometry.lng);

      this.addRoute(startLatLng, endLatLng);
     
    } catch (error) {
      console.error('Greška prilikom dobijanja koordinata:', error);
    }
  }
   addRoute(start:L.LatLng,end:L.LatLng)
  { 
    const customIcon = L.icon({
      iconUrl: '../../assets/images/start.png', // Putanja do tvoje slik // Putanja do senke, ili izostavi ako nije potrebna
      iconSize: [32, 32], // Prilagodi veličinu ikone
      iconAnchor: [16, 32], // Postavi anchor tačku
      popupAnchor: [0, -32] // Prilagodi tačku za otvaranje popup-a
    });
    const customIconEnd = L.icon({
      iconUrl: '../../assets/images/end.png', // Putanja do tvoje slik // Putanja do senke, ili izostavi ako nije potrebna
      iconSize: [32, 32], // Prilagodi veličinu ikone
      iconAnchor: [16, 32], // Postavi anchor tačku
      popupAnchor: [0, -32] // Prilagodi tačku za otvaranje popup-a
    });
     const routingControl=L.Routing.control({
      waypoints: [start, end],//pocetna i kranja tacka za crtanje
      routeWhileDragging: true,
      show:false,
    }).addTo(this.map!);

    routingControl.on('routesfound',(e:any)=>{
      const routes=e.routes;
      const summary=routes[0].summary;
      const routeCoords=routes[0].coordinates;
      console.log("broj tacaka na ruti",routeCoords);
      console.log(`Dužina rute: ${summary.totalDistance / 1000} km`);
      console.log(`Procenjeno vreme putovanja: ${summary.totalTime / 60} minuta`);

      const totalTimeInMinutes = summary.totalTime / 60;
      const hours = Math.floor(totalTimeInMinutes / 60);
      const minutes = Math.floor(totalTimeInMinutes % 60);
      const popupContent = `
      <b>Dužina rute:</b> ${(summary.totalDistance / 1000).toFixed(2)} km<br>
      <b>Procenjeno vreme putovanja:</b> ${hours} sati i ${minutes} minuta`;
      L.marker(start)
      .addTo(this.map!)
      .bindPopup(popupContent)
      .openPopup();
      L.marker(end)
      .addTo(this.map!);
      //this.getPOIsOnRoute(routeCoords);
      //this.showAccmmodationsOnRoute(routeCoords);
      //this.showRestaurantsOnRoute(routeCoords);
      //this.showChargingStationsOnRoute(routeCoords);
      //this.showRestAreasOnRoute(routeCoords);
      // this.checkBorderCrossings();
      
    });

    this.map!.fitBounds(L.latLngBounds(start, end));
  }
  getPOIsOnRoute(routeCoords: L.LatLng[]) {
      this.geocodingService.getPOIsOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1]).subscribe((data: any) => {
        const radius = 5000; // Radijus provere u metrima (5 km)
    
        const customIcon=L.icon({
          iconUrl:'../../assets/images/gas-station.png',
          iconSize: [12, 12], // Prilagodi veličinu po potrebi
          iconAnchor: [16, 32], // Podesi tačku sidrišta ako je potrebno
          popupAnchor: [0, -32] // Podesi tačku za prikaz popup-a
        });
        const filteredPOIs = data.elements.filter((element: any) => {
          if (element.type === 'node') {
            const point = L.latLng(element.lat, element.lon);
            return routeCoords.some(coord => {
              const distance = point.distanceTo(coord);
              return distance <= radius; // Provera blizine
            });
          }
          return false;
        });
    
        filteredPOIs.forEach((element: any) => {
          const fuelStation = L.marker([element.lat, element.lon],{icon:customIcon}).addTo(this.map!);
          fuelStation.bindPopup('Benzinska pumpa');
        });
    
        console.log('Filtrirani POI:', filteredPOIs);
      });
  }

  showAccmmodationsOnRoute(routeCoords:L.LatLng[]){
    this.geocodingService.getAccomodationsOnRoute(routeCoords[0],routeCoords[routeCoords.length-1])
    .subscribe((data:any)=>{
      const radius=5000;
      const accomodationIcon=L.icon({
        iconUrl: '../../assets/images/hotel.png', // Putanja do ikone prenoćišta
        iconSize: [16, 16], // Prilagodi veličinu po potrebi
        iconAnchor: [8, 8], // Podesi tačku sidrišta
        popupAnchor: [0, -8] // Podesi tačku za prikaz popup-a
      });
      
      const filteredAccommodations=data.elements.filter((element:any)=>{
        if(element.type==='node')
        {
          const point=L.latLng(element.lat,element.lon);
          return routeCoords.some(coord=>{
            const distance=point.distanceTo(coord);
            return distance<=radius;
          });
        }
        return false;
      });

      filteredAccommodations.forEach((element:any)=>{
        const accommodationMarker=L.marker([element.lat,element.lon],{icon:accomodationIcon}).addTo(this.map!);
        accommodationMarker.bindPopup('prenociste');
      });
      console.log('Filtrirana prenoćišta:', filteredAccommodations);
    });
  }
  showRestaurantsOnRoute(routeCoords: L.LatLng[]) {
    this.geocodingService.getRestaurantsOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1])
      .subscribe((data: any) => {
        const radius = 2000; // Radijus pretrage u metrima (5 km)
  
        const restaurantIcon = L.icon({
          iconUrl: '../../assets/images/cutlery.png', // Putanja do ikone restorana
          iconSize: [16, 16], // Prilagodi veličinu po potrebi
          iconAnchor: [8, 8], // Podesi tačku sidrišta
          popupAnchor: [0, -8] // Podesi tačku za prikaz popup-a
        });
  
        const filteredRestaurants = data.elements.filter((element: any) => {
          if (element.type === 'node') {
            const point = L.latLng(element.lat, element.lon);
            return routeCoords.some(coord => {
              const distance = point.distanceTo(coord);
              return distance <= radius; // Provera blizine
            });
          }
          return false;
        });
  
        filteredRestaurants.forEach((element: any) => {
          const restaurantMarker = L.marker([element.lat, element.lon], { icon: restaurantIcon }).addTo(this.map!);
          restaurantMarker.bindPopup('Restoran');
        });
  
        console.log('Filtrirani restorani:', filteredRestaurants);
      });
  }
  showChargingStationsOnRoute(routeCoords: L.LatLng[]) {
    this.geocodingService.getChargingStationsOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1])
      .subscribe((data: any) => {
        const radius = 5000; // Radijus pretrage u metrima (5 km)
  
        const chargingStationIcon = L.icon({
          iconUrl: '../../assets/images/charging.png', // Putanja do ikone punjača
          iconSize: [16, 16], // Prilagodi veličinu po potrebi
          iconAnchor: [8, 8], // Podesi tačku sidrišta
          popupAnchor: [0, -8] // Podesi tačku za prikaz popup-a
        });
  
        const filteredStations = data.elements.filter((element: any) => {
          if (element.type === 'node') {
            const point = L.latLng(element.lat, element.lon);
            return routeCoords.some(coord => {
              const distance = point.distanceTo(coord);
              return distance <= radius; // Provera blizine
            });
          }
          return false;
        });
  
        filteredStations.forEach((element: any) => {
          const chargingMarker = L.marker([element.lat, element.lon], { icon: chargingStationIcon }).addTo(this.map!);
          chargingMarker.bindPopup('Punjač za električne automobile');
        });
  
        console.log('Filtrirani punjači:', filteredStations);
      });
  }
  
  showRestAreasOnRoute(routeCoords: L.LatLng[]) {
    this.geocodingService.getRestAreasOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1])
      .subscribe((data: any) => {
        const radius = 50000; // Radijus pretrage u metrima (5 km)
  
        const restAreaIcon = L.icon({
          iconUrl: '../../assets/images/rest-area.png', // Putanja do ikone odmorišta
          iconSize: [16, 16], // Prilagodi veličinu po potrebi
          iconAnchor: [8, 8], // Podesi tačku sidrišta
          popupAnchor: [0, -8] // Podesi tačku za prikaz popup-a
        });
  
        const filteredRestAreas = data.elements.filter((element: any) => {
          if (element.type === 'node') {
            const point = L.latLng(element.lat, element.lon);
            return routeCoords.some(coord => {
              const distance = point.distanceTo(coord);
              return distance <= radius; // Provera blizine
            });
          }
          return false;
        });
  
        filteredRestAreas.forEach((element: any) => {
          const restAreaMarker = L.marker([element.lat, element.lon], { icon: restAreaIcon }).addTo(this.map!);
          restAreaMarker.bindPopup('Odmorište');
        });
  
        console.log('Filtrirana odmorišta:', filteredRestAreas);
      });
  }
  
  async checkBorderCrossings() {
    // Hardkodirane koordinate za Beograd i Zagreb
    const start = L.latLng(44.7866, 20.4489); // Beograd
    const end = L.latLng(45.8150, 15.9819); // Zagreb

    try {
      const borderCrossings = await this.geocodingService.getBorderCrossingsBetweenPoints(start,end).toPromise(); 
      
      console.log('Granični prelazi:', borderCrossings);
      // Dalja obrada podataka o graničnim prelazima
    } catch (error) {
      console.error('Greška prilikom dobijanja graničnih prelaza:', error);
    }
  }

  saveTravel()
  {
    this.travelService.createTravel(this.startPoint,this.endPoint);
  }
  ngOnInit() {
    
    this.route.queryParams.subscribe(params=>{
     this.startPoint=params['start'];
     this.endPoint=params['end'];
   });
   this.calculateRoute();
    this.map=L.map('map').setView([44.869,20.44],13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
   

}
