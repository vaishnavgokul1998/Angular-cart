import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocatorService {

  addressConvertAPi = "http://api.positionstack.com/v1/forward?access_key=25ba546c5b08330aeb0c6fceeeaa2894&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC"
  constructor(
    private httpCliecnt: HttpClient
  ) { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

  getLatAndLong(address: string) {
    return this.httpCliecnt.get(this.addressConvertAPi )
  }

}