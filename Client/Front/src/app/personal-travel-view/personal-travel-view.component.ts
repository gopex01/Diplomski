import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeocodingService } from '../services/geocoding.service';
import { HttpClient } from '@angular/common/http';
import { TravelService } from '../services/travel.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
@Component({
  selector: 'app-personal-travel-view',
  templateUrl: './personal-travel-view.component.html',
  styleUrls: ['./personal-travel-view.component.css']
})
export class PersonalTravelViewComponent implements OnInit{

  startPoint:string;
  endPoint:string;
  map?:L.Map;
  selectedOption: any='None';
  proposedPOIS:any;
  proposedRestaurants:any;
  constructor(private route:ActivatedRoute,private geocodingService:GeocodingService,private http:HttpClient,private travelService:TravelService)
  {
    this.startPoint='';
    this.endPoint='';
  }

  async calculateRoute(option:any)
  {
    try {
      const startCoords = await this.geocodingService.getCoordinates(this.startPoint).toPromise();
      const endCoords = await this.geocodingService.getCoordinates(this.endPoint).toPromise();

      const startLatLng = L.latLng(startCoords!.results[0].geometry.lat, startCoords!.results[0].geometry.lng);
      const endLatLng = L.latLng(endCoords!.results[0].geometry.lat, endCoords!.results[0].geometry.lng);

      this.addRoute(startLatLng, endLatLng,option);
     
    } catch (error) {
      console.error('Greška prilikom dobijanja koordinata:', error);
    }
  }
  addRoute(start:L.LatLng,end:L.LatLng,option:any)
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
      const totalTimeInSeconds=summary.totalTime;
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
      switch(option){
        case 'None':
          break;
        case 'POIS':
          this.getPOIsOnRoute(routeCoords);
          break;
        case 'Restaurants':
          this.showRestaurantsOnRoute(routeCoords);
          break;
        case 'Accommodations':
          this.showAccmmodationsOnRoute(routeCoords);
          break;
        case 'ChargingStations':
          this.showChargingStationsOnRoute(routeCoords);
          break;
        default:
          console.log('greska u switchu');
      }   
      this.findPOIAtIntervals(routeCoords[0],routeCoords,totalTimeInSeconds,false);
      this.findRestAreasAtIntervals(routeCoords[0],routeCoords,totalTimeInSeconds,false);
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
  getPOIsOnRouteV2(routeCoords: L.LatLng[],display:boolean) {
    this.geocodingService.getPOIsOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1]).subscribe((data: any) => {
      const radius = 15000; // Radijus provere u metrima (5 km)
  
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
      
      if(display==true){
      filteredPOIs.forEach((element: any) => {
        const fuelStation = L.marker([element.lat, element.lon],{icon:customIcon}).addTo(this.map!);
        fuelStation.bindPopup('Benzinska pumpa');
      });
  
      console.log('Filtrirani POI:', filteredPOIs);
      }
      else{
       if(filteredPOIs.length>3){
       this.proposedPOIS=filteredPOIs.slice(0,3);
       }
       else{
        this.proposedPOIS=filteredPOIs;
       }
       console.log('Proposed',this.proposedPOIS);
      }
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
  showAccmmodationsOnRouteV2(routeCoords:L.LatLng[],display:boolean){
    this.geocodingService.getAccomodationsOnRoute(routeCoords[0],routeCoords[routeCoords.length-1])
    .subscribe((data:any)=>{
      const radius=15000;
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

      filteredAccommodations.forEach((element:any) => {
        const accommodationMarker=L.marker([element.lat,element.lon],{icon:accomodationIcon}).addTo(this.map!);
        accommodationMarker.bindPopup('prenociste');
      });
      console.log('Filtrirana prenoćišta:', filteredAccommodations);
    
    });
  }
  showRestaurantsOnRoute(routeCoords: L.LatLng[]) {
    this.geocodingService.getRestaurantsOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1])
      .subscribe((data: any) => {
        const radius = 5000; // Radijus pretrage u metrima (5 km)
  
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
  showRestaurantsOnRouteV2(routeCoords: L.LatLng[],display:boolean) {
    this.geocodingService.getRestaurantsOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1])
      .subscribe((data: any) => {
        const radius = 15000; // Radijus pretrage u metrima (5 km)
  
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
  
        if(display==true){
        filteredRestaurants.forEach((element: any) => {
          const restaurantMarker = L.marker([element.lat, element.lon], { icon: restaurantIcon }).addTo(this.map!);
          restaurantMarker.bindPopup('Restoran');
        });
        console.log('Filtrirani restorani:', filteredRestaurants);
      }
      else{
        if(filteredRestaurants.length>3)
        {
          this.proposedRestaurants=filteredRestaurants.slice(0,3);
        }
        else{
          this.proposedRestaurants=filteredRestaurants;
        }
        console.log('Proposed restaurants',this.proposedRestaurants);
      }
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
        console.log('Sva odmorista',data.elements);
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
  saveTravel()
  {
    this.travelService.createTravel(this.startPoint,this.endPoint);
  }
  findRestAreasAtIntervals(start:L.LatLng,routeCoords:L.LatLng[],totalTravelTimeInSeconds:number,display:boolean)
  {
    const drivingIntervalInSeconds=2*3600;
    const breakTimeInSeconds=0.5*3600;

    let currentIntervalTime=drivingIntervalInSeconds;
    let accumulatedTime=0;

    for(let i=0;accumulatedTime<totalTravelTimeInSeconds;i++)
    {
      //naci indeks tacke na ruti koja odgovara trenutnom intervalu
      const index=Math.min(Math.floor((routeCoords.length*currentIntervalTime)/totalTravelTimeInSeconds),routeCoords.length-1);
      const intervalCoords=routeCoords[index];
      //Prikazi odmorista u blizini intervalne tacke
      let coordsArr:L.LatLng[]=[start,intervalCoords];
      this.showRestaurantsOnRouteV2(coordsArr,display);
      //azuriraj vreme za sledeci interval sa dodatkom pauze
      currentIntervalTime+=drivingIntervalInSeconds+breakTimeInSeconds;
      accumulatedTime+=drivingIntervalInSeconds+breakTimeInSeconds;
    }
  }
  findPOIAtIntervals(start:L.LatLng,routeCoords:L.LatLng[],totalTravelTimeInSeconds:number,display:boolean)
  {
    const drivingIntervalInSeconds=2*3600;
    const breakTimeInSeconds=0.5*3600;

    let currentIntervalTime=drivingIntervalInSeconds;
    let accumulatedTime=0;

    for(let i=0;accumulatedTime<totalTravelTimeInSeconds;i++)
    {
      //naci indeks tacke na ruti koja odgovara trenutnom intervalu
      const index=Math.min(Math.floor((routeCoords.length*currentIntervalTime)/totalTravelTimeInSeconds),routeCoords.length-1);
      const intervalCoords=routeCoords[index];
      //Prikazi odmorista u blizini intervalne tacke
      let coordsArr:L.LatLng[]=[start,intervalCoords];
      this.getPOIsOnRouteV2(coordsArr,display);
      //azuriraj vreme za sledeci interval sa dodatkom pauze
      currentIntervalTime+=drivingIntervalInSeconds+breakTimeInSeconds;
      accumulatedTime+=drivingIntervalInSeconds+breakTimeInSeconds;
    }
  }
  findAccomondationAtIntervals(start:L.LatLng,routeCoords:L.LatLng[],totalTravelTimeInSeconds:number,display:boolean)
  {
    const drivingIntervalInSeconds=2*3600;
    const breakTimeInSeconds=0.5*3600;

    let currentIntervalTime=drivingIntervalInSeconds;
    let accumulatedTime=0;

    for(let i=0;accumulatedTime<totalTravelTimeInSeconds;i++)
    {
      //naci indeks tacke na ruti koja odgovara trenutnom intervalu
      const index=Math.min(Math.floor((routeCoords.length*currentIntervalTime)/totalTravelTimeInSeconds),routeCoords.length-1);
      const intervalCoords=routeCoords[index];
      //Prikazi odmorista u blizini intervalne tacke
      let coordsArr:L.LatLng[]=[start,intervalCoords];
      this.showAccmmodationsOnRouteV2(coordsArr,display);
      //azuriraj vreme za sledeci interval sa dodatkom pauze
      currentIntervalTime+=drivingIntervalInSeconds+breakTimeInSeconds;
      accumulatedTime+=drivingIntervalInSeconds+breakTimeInSeconds;
    }
  }
  onOptionChange() {
    if (this.map) {
      this.map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
          this.map?.removeLayer(layer);
        }
      });
    }
    this.calculateRoute(this.selectedOption);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.startPoint=params['start'];
      this.endPoint=params['end'];
    });
  this.calculateRoute('None');
  this.map=L.map('map').setView([44.869,20.44],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

}
