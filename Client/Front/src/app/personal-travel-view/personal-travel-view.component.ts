import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeocodingService } from '../services/geocoding.service';
import { HttpClient } from '@angular/common/http';
import { TravelService } from '../services/travel.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import { CameraPresevoComponent } from '../camera-presevo/camera-presevo.component';
import { CameraGradinaComponent } from '../camera-gradina/camera-gradina.component';
import { CameraVrskaCukaComponent } from '../camera-vrska-cuka/camera-vrska-cuka.component';
import { CameraTrbusnicaComponent } from '../camera-trbusnica/camera-trbusnica.component';
import { CameraRacaComponent } from '../camera-raca/camera-raca.component';
import { CameraZvornikComponent } from '../camera-zvornik/camera-zvornik.component';
import { CameraKotromanComponent } from '../camera-kotroman/camera-kotroman.component';
import { CameraVatinComponent } from '../camera-vatin/camera-vatin.component';
import { CameraSidComponent } from '../camera-sid/camera-sid.component';
import { CameraBatrovciComponent } from '../camera-batrovci/camera-batrovci.component';
import { CameraGostunComponent } from '../camera-gostun/camera-gostun.component';
import { CameraJabukaComponent } from '../camera-jabuka/camera-jabuka.component';
import { CameraHorgosComponent } from '../camera-horgos/camera-horgos.component';
import { CameraKelebijaComponent } from '../camera-kelebija/camera-kelebija.component';
import { CameraCalaComponent } from '../camera-cala/camera-cala.component';
import * as turf from '@turf/turf';
import { Dialog } from '@angular/cdk/dialog';
@Component({
  selector: 'app-personal-travel-view',
  templateUrl: './personal-travel-view.component.html',
  styleUrls: ['./personal-travel-view.component.css']
})
export class PersonalTravelViewComponent implements OnInit{

  startPoint:string;//inicijalizuje se kroz query iz search
  endPoint:string;//inicijalizuje se kroz query iz search
  map?:L.Map;
  selectedOption: any='None';//za radio buttoni da se izabere kakav prikaz zelimo na mapi
  proposedPOIS:any[]=[];//preporucene pumpe za pauzu
  proposedRestaurants:any[]=[];//preporuceni restorani za pauzu

  bulgariaGeoJson:any;
  bosniaGeoJson:any;
  croatiaGeoJson:any;
  hungaryGeoJson:any;
  macedoniaGeoJson:any;
  montenegroGeoJson:any;
  rumunyGeoJson:any;

  isRouteInBulgaria:boolean=false;
  isRouteInBosnia:boolean=false;
  isRouteInCroatia:boolean=false;
  isRouteInHungary:boolean=false;
  isRouteInMacedonia:boolean=false;
  isRouteInMontenegro:boolean=false;
  isRouteInRumuny:boolean=false;

  constructor(private geocodingService:GeocodingService,
    private http:HttpClient
    ,private route: ActivatedRoute
    ,private travelService:TravelService,
    private dialog:Dialog)
  {
    this.startPoint='';
    this.endPoint='';
    
  }
 
  async calculateRoute(option:any)
  {
    try {
      const startCoords = await this.geocodingService.getCoordinates(this.startPoint).toPromise();
      const endCoords = await this.geocodingService.getCoordinates(this.endPoint).toPromise();
      console.log('start cords odgovor ',startCoords);

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

    routingControl.on('routesfound', async (e:any)=>{
      const routes=e.routes;
      const summary=routes[0].summary;
      const routeCoords=routes[0].coordinates;

      await this.loadBulgariaJson();
      await this.loadBosniaJson();
      await this.loadCroatiaJson();
      await this.loadHungaryJson();
      await this.loadMacedoniaJson();
      await this.loadMontenegroJson();
      await this.loadRumunyJson();

      this.isRouteInBulgaria=this.checkRouteInCountry(routeCoords,this.bulgariaGeoJson);
      this.isRouteInBosnia=this.checkRouteInCountry(routeCoords,this.bosniaGeoJson);
      this.isRouteInCroatia=this.checkRouteInCountry(routeCoords,this.croatiaGeoJson);
      this.isRouteInHungary=this.checkRouteInCountry(routeCoords,this.hungaryGeoJson);
      this.isRouteInMacedonia=this.checkRouteInCountry(routeCoords,this.macedoniaGeoJson);
      this.isRouteInMontenegro=this.checkRouteInCountry(routeCoords,this.montenegroGeoJson);
      this.isRouteInRumuny=this.checkRouteInCountry(routeCoords,this.rumunyGeoJson);
      
      const totalTimeInMinutes = summary.totalTime / 60;
      const totalTimeInSeconds=summary.totalTime;
      const hours = Math.floor(totalTimeInMinutes / 60);
      const minutes = Math.floor(totalTimeInMinutes % 60);
      const popupContent = `
      <b>Travel distance:</b> ${(summary.totalDistance / 1000).toFixed(2)} km<br>
      <b>Travel time:</b> ${hours} hours and ${minutes} minutes`;
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
          iconSize: [12, 12], 
          iconAnchor: [16, 32], 
          popupAnchor: [0, -32] 
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
          fuelStation.bindPopup('Petrol Station');
          fuelStation.on('click', () => {
            const stationCoords = L.latLng(element.lat, element.lon);
    
            // Kreiraj novu rutu do benzinske pumpe
            L.Routing.control({
              waypoints: [
                routeCoords[0], // Početna tačka (prva iz postojeće rute)
                stationCoords   // Benzinska pumpa
              ],
              routeWhileDragging: true
            }).addTo(this.map!);
          });
        });
        
       // console.log('Filtrirani POI:', filteredPOIs);
      });
  }
  async getPOIsOnRouteV2(routeCoords: L.LatLng[], display: boolean,iteration:number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.geocodingService.getPOIsOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1])
        .subscribe({
          next: (data: any) => {
            const radius = 15000; // Radijus provere u metrima (15 km)
            const customIcon = L.icon({
              iconUrl: '../../assets/images/gas-station.png',
              iconSize: [12, 12],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
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
            filteredPOIs.forEach((poi: any) => {
              poi.iteration = iteration; // Dodavanje atributa 'iteration' da bi znali koji je redni broj pauze
            });
        
  
            if (display) {
              filteredPOIs.forEach((element: any) => {
                const fuelStation = L.marker([element.lat, element.lon], { icon: customIcon }).addTo(this.map!);
                fuelStation.bindPopup('Petrol station');
              });
            } else {
              if (filteredPOIs.length > 3) {
                let pomocni = filteredPOIs.slice(0, 3);
                pomocni.forEach((x: any) => {
                  this.proposedPOIS.push(x);
                });
              } else {
                //this.proposedPOIS = filteredPOIs;
                filteredPOIs.forEach((x:any)=>{
                  this.proposedPOIS.push(x);
                });
              }
              this.proposedPOIS = this.proposedPOIS.filter(
                (obj, index, self) =>
                  index === self.findIndex(o => o.lat === obj.lat && o.lon === obj.lon)
              );
              //console.log('Proposed pumpe', this.proposedPOIS);
              
            }
            resolve(); // Signalizira završetak
          },
          error: (err) => reject(err),
        });
    });
  }
  
  showAccmmodationsOnRoute(routeCoords:L.LatLng[]){
    this.geocodingService.getAccomodationsOnRoute(routeCoords[0],routeCoords[routeCoords.length-1])
    .subscribe((data:any)=>{
      const radius=5000;
      const accomodationIcon=L.icon({
        iconUrl: '../../assets/images/hotel.png', // Putanja do ikone prenoćišta
        iconSize: [16, 16], 
        iconAnchor: [8, 8], 
        popupAnchor: [0, -8] 
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
        accommodationMarker.bindPopup('accommodation');
        accommodationMarker.on('click',()=>{
          const stationCoords = L.latLng(element.lat, element.lon);
    
            // Kreiraj novu rutu do prenocista
            L.Routing.control({
              waypoints: [
                routeCoords[0], // Početna tačka (prva iz postojece rute)
                stationCoords   // prenociste
              ],
              routeWhileDragging: true
            }).addTo(this.map!);
        });
      });
      //console.log('Filtrirana prenoćišta:', filteredAccommodations);
    });
  }
  showAccmmodationsOnRouteV2(routeCoords:L.LatLng[],display:boolean){
    this.geocodingService.getAccomodationsOnRoute(routeCoords[0],routeCoords[routeCoords.length-1])
    .subscribe((data:any)=>{
      const radius=15000;
      const accomodationIcon=L.icon({
        iconUrl: '../../assets/images/hotel.png', // Putanja do ikone prenoćišta
        iconSize: [16, 16], 
        iconAnchor: [8, 8], 
        popupAnchor: [0, -8] 
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
        accommodationMarker.bindPopup('accommodation');
      });
      //console.log('Filtrirana prenoćišta:', filteredAccommodations);
    
    });
  }
  showRestaurantsOnRoute(routeCoords: L.LatLng[]) {
    this.geocodingService.getRestaurantsOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1])
      .subscribe((data: any) => {
        const radius = 5000; // Radijus pretrage u metrima (5 km)
  
        const restaurantIcon = L.icon({
          iconUrl: '../../assets/images/cutlery.png', // Putanja do ikone restorana
          iconSize: [16, 16], 
          iconAnchor: [8, 8], 
          popupAnchor: [0, -8] 
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
          restaurantMarker.bindPopup('Restaurant');
          restaurantMarker.on('click',()=>{
            const stationCoords = L.latLng(element.lat, element.lon);
    
            // Kreiraj novu rutu do restorana
            L.Routing.control({
              waypoints: [
                routeCoords[0], // Početna tačka (prva iz postojece rute)
                stationCoords   //restoran
              ],
              routeWhileDragging: true
            }).addTo(this.map!);
          })
        });
  
       // console.log('Filtrirani restorani:', filteredRestaurants);
      });
  }
  async showRestaurantsOnRouteV2(routeCoords: L.LatLng[],display:boolean,iteration:number) {
    return new Promise<void>((resolve,reject)=>{
    this.geocodingService.getRestaurantsOnRoute(routeCoords[0], routeCoords[routeCoords.length - 1])
      .subscribe({
        next:(data:any)=>{
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
        console.log('Filtrirani restorani',filteredRestaurants);
        filteredRestaurants.forEach((rest:any)=>{
          rest.iteration=iteration;
        })
        if(display){
        filteredRestaurants.forEach((element: any) => {
          const restaurantMarker = L.marker([element.lat, element.lon], { icon: restaurantIcon }).addTo(this.map!);
          restaurantMarker.bindPopup('Restaurant');
        });
      }
      else{
        if(filteredRestaurants.length>3)
        {
          let pomocni=filteredRestaurants.slice(0,3);
          pomocni.forEach((x:any)=>{
            this.proposedRestaurants.push(x);
          });
        }
        else{
          filteredRestaurants.forEach((x:any)=>{
            this.proposedRestaurants.push(x);
          });
        }
        this.proposedRestaurants = this.proposedRestaurants.filter(
          (obj, index, self) =>
            index === self.findIndex(o => o.lat === obj.lat && o.lon === obj.lon)
        );
        console.log('Proposed restaurants',this.proposedRestaurants);
      }
      resolve();
      },
      error:(err)=>reject(err),
    });
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
          chargingMarker.bindPopup('Charging station');
          chargingMarker.on('click',()=>{
            const stationCoords = L.latLng(element.lat, element.lon);
    
            // Kreiraj novu rutu do benzinske pumpe
            L.Routing.control({
              waypoints: [
                routeCoords[0], // Početna tačka (prva iz postojeće rute)
                stationCoords   // Benzinska pumpa
              ],
              routeWhileDragging: true
            }).addTo(this.map!);
          })
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
          restAreaMarker.bindPopup('Rest area');
        });
  
        console.log('Filtrirana odmorišta:', filteredRestAreas);
      });
  }
  saveTravel()
  {
    this.travelService.createTravel(this.startPoint,this.endPoint);
  }
  async findRestAreasAtIntervals(start:L.LatLng,routeCoords:L.LatLng[],totalTravelTimeInSeconds:number,display:boolean)
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
      await this.showRestaurantsOnRouteV2(coordsArr,display,i);
      //azuriraj vreme za sledeci interval sa dodatkom pauze
      currentIntervalTime+=drivingIntervalInSeconds+breakTimeInSeconds;
      accumulatedTime+=drivingIntervalInSeconds+breakTimeInSeconds;
    }
  }
  async findPOIAtIntervals(start:L.LatLng,routeCoords:L.LatLng[],totalTravelTimeInSeconds:number,display:boolean)
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
      //console.log('redni broj iteracije',i);
      await this.getPOIsOnRouteV2(coordsArr,display,i);
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
  
  checkIfPointInCountry(lat:number,lng:number,countryGeoJson:any):boolean{
    const point=turf.point([lng,lat]);
    const polygon=turf.polygon(countryGeoJson.features[0].geometry.coordinates);
    return turf.booleanPointInPolygon(point,polygon);
  }

  checkRouteInCountry(routeCoords:L.LatLng[],countryGeoJson:any):boolean{
    return routeCoords.some(coord=>
      this.checkIfPointInCountry(coord.lat,coord.lng,countryGeoJson)
    );
  }

  async loadBulgariaJson(): Promise<any> {
    try {
      const response = await fetch('../../assets/geojson/bulgaria.json');
      this.bulgariaGeoJson = await response.json();
      
    } catch (error) {
      console.error('Greška prilikom učitavanja GeoJSON:', error);
    }
  }

  async loadHungaryJson():Promise<any>{
    try {
      const response = await fetch('../../assets/geojson/hungary.json');
      this.hungaryGeoJson = await response.json();
     
    } catch (error) {
      console.error('Greška prilikom učitavanja GeoJSON:', error);
    }
  }

  async loadCroatiaJson():Promise<any>
  {
    try {
      const response = await fetch('../../assets/geojson/croatia.json');
      this.croatiaGeoJson = await response.json();
      
    } catch (error) {
      console.error('Greška prilikom učitavanja GeoJSON:', error);
    }
  }
  
  async loadBosniaJson():Promise<any>
  {
    try {
      const response = await fetch('../../assets/geojson/bosnia.json');
      this.bosniaGeoJson = await response.json();
      
    } catch (error) {
      console.error('Greška prilikom učitavanja GeoJSON:', error);
    }
  }

  async loadMontenegroJson():Promise<any>
  {
    try {
      const response = await fetch('../../assets/geojson/montenegro.json');
      this.montenegroGeoJson = await response.json();
     
    } catch (error) {
      console.error('Greška prilikom učitavanja GeoJSON:', error);
    }
  }
  async loadMacedoniaJson():Promise<any>
  {
    try {
      const response = await fetch('../../assets/geojson/macedonia.json');
      this.macedoniaGeoJson = await response.json();
      
    } catch (error) {
      console.error('Greška prilikom učitavanja GeoJSON:', error);
    }
  }
  async loadRumunyJson():Promise<any>
  {
    try {
      const response = await fetch('../../assets/geojson/rumuny.json');
      this.rumunyGeoJson = await response.json();
    } catch (error) {
      console.error('Greška prilikom učitavanja GeoJSON:', error);
    }
  }
  
  openCala()
  {
    this.dialog.open(CameraCalaComponent);
  }
  openKelebija()
  {
    this.dialog.open(CameraKelebijaComponent);
  }
  openHorgos()
  {
    this.dialog.open(CameraHorgosComponent);
  }
  openJabuka()
  {
    this.dialog.open(CameraJabukaComponent);
  }
  openGostun()
  {
    this.dialog.open(CameraGostunComponent);
  }
  openBatrovci()
  {
    this.dialog.open(CameraBatrovciComponent);
  }
  openSid()
  {
    this.dialog.open(CameraSidComponent);
  }
  openVatin()
  {
    this.dialog.open(CameraVatinComponent);
  }
  openKotroman()
  {
    this.dialog.open(CameraKotromanComponent);
  }
  openZvornik()
  {
    this.dialog.open(CameraZvornikComponent);
  }
  openRaca()
  {
    this.dialog.open(CameraRacaComponent);
  }
  openTrbusnica()
  {
    this.dialog.open(CameraTrbusnicaComponent);
  }
  openVrskaCuka()
  {
    this.dialog.open(CameraVrskaCukaComponent);
  }
  openGradina()
  {
    this.dialog.open(CameraGradinaComponent);
  }
  openPresevo()
  {
    this.dialog.open(CameraPresevoComponent);
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
