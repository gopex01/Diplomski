import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenCageResponse } from '../models/opencage.interface';
import * as L from 'leaflet';
import { OpenCage } from 'leaflet-control-geocoder/dist/geocoders';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  //8c5b61b13c35491da890e6fbfb9334b3

  private apiKeyOpenRoute = '5b3ce3597851110001cf62486fc4ec1e25b24bc4a45588be06108ecc';
  private apiKeyOpenCage='8c5b61b13c35491da890e6fbfb9334b3';

  constructor(private http: HttpClient) {}
  
  getCoordinates(cityName:string):Observable<OpenCageResponse>
  {
    const url=`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${this.apiKeyOpenCage}`;
    return this.http.get<OpenCageResponse>(url);
  }
  getRoute(start: L.LatLng, end: L.LatLng) {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

    return this.http.get(url, {
      headers: {
        'Authorization': this.apiKeyOpenRoute,
        'Content-Type': 'application/json'
      }
    });
  }
  getPOIsOnRoute(start: L.LatLng, end: L.LatLng): Observable<any> {//pumpe
    const southWest = L.latLng(Math.min(start.lat, end.lat), Math.min(start.lng, end.lng));
    const northEast = L.latLng(Math.max(start.lat, end.lat), Math.max(start.lng, end.lng));

    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node[amenity=fuel](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng}););out;`;

    return this.http.get(overpassUrl);
  }

  getAccomodationsOnRoute(start:L.LatLng,end:L.LatLng)//prenocista
  {
    const southWest = L.latLng(Math.min(start.lat, end.lat), Math.min(start.lng, end.lng));
  const northEast = L.latLng(Math.max(start.lat, end.lat), Math.max(start.lng, end.lng));

  // Overpass API upit za prenoćišta (hoteli, hosteli, guest houses)
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
    (
      node[amenity=hotel](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
      node[amenity=hostel](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
      node[tourism=guest_house](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
    );
    out;`;

    return this.http.get(overpassUrl);
  }
  getRestaurantsOnRoute(start: L.LatLng, end: L.LatLng): Observable<any> {//restorani
    const southWest = L.latLng(Math.min(start.lat, end.lat), Math.min(start.lng, end.lng));
    const northEast = L.latLng(Math.max(start.lat, end.lat), Math.max(start.lng, end.lng));
  
    // Overpass API upit za restorane
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
      (
        node[amenity=restaurant](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
      );
      out;`;
  
    return this.http.get(overpassUrl);
  }
  getChargingStationsOnRoute(start: L.LatLng, end: L.LatLng): Observable<any> {//punjaci
    const southWest = L.latLng(Math.min(start.lat, end.lat), Math.min(start.lng, end.lng));
    const northEast = L.latLng(Math.max(start.lat, end.lat), Math.max(start.lng, end.lng));
  
    // Overpass API upit za punjače za električne automobile
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
      (
        node[amenity=charging_station](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
      );
      out;`;
  
    return this.http.get(overpassUrl);
  }
  
  getRestAreasOnRoute(start: L.LatLng, end: L.LatLng): Observable<any> {//odmorista
  const southWest = L.latLng(Math.min(start.lat, end.lat), Math.min(start.lng, end.lng));
  const northEast = L.latLng(Math.max(start.lat, end.lat), Math.max(start.lng, end.lng));

  // Overpass API upit za odmorišta
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
    (
      node[amenity=rest_area](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
    );
    out;`;

  return this.http.get(overpassUrl);
}





  
}
