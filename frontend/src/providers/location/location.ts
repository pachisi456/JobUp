import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation";

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  lat: number = 0;
  lon: number = 0;

  constructor(public http: HttpClient, private geo: Geolocation) {
    this.setLocation();
  }

  /**
   * set variables of this very provider
   */
  setLocation(){
    this.geo.getCurrentPosition().then( result => {
      this.lat = result.coords.latitude;
      this.lon = result.coords.longitude;
    });
  }

  /**
   * return an observable to be handled in line
   * @returns {Promise<Geoposition>}
   */
  getLocation(){
    return this.geo.getCurrentPosition({timeout:20000});
  }

}
