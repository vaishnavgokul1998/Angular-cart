import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/login/login.response.model';
import { AuthService } from '../../../service/auth.service';
import { LocatorService } from '../../../service/locator.service';
import {MapGeocoder} from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // apiLoaded: Observable<boolean>;
  userDetails!: UserDetail;

  center: google.maps.LatLngLiteral = { lat: 23, lng: 89 };
  zoom = 10;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [
    {
      lat: 23,
      lng: 89
    }
  ];
  geocoder = new google.maps.Geocoder();
  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event?.latLng?.toJSON() as any);
  }
  constructor(
    private authService: AuthService,
    private locatorService: LocatorService,
    private httpClient:HttpClient
  ) {
    // geocoder.geocode({
    //   address: 'Sydney, NSW'
    // }).subscribe(({results}) => {
    //   console.log(results);
    // });
    
  }

  ngOnInit(): void {
   this.httpClient.get("http://api.positionstack.com/v1/forward?access_key=25ba546c5b08330aeb0c6fceeeaa2894&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC")
   .subscribe(res=>{
     console.log(res)
   })
    this.geocoder.geocode( { 'address': "Sydney, NSW"}, function(results, status) {
      console.log(results,status)
      // if (status == 'OK') {
      //   // map.setCenter(results[0].geometry.location);
      //   // var marker = new google.maps.Marker({
      //   //     map: map,
      //   //     position: results[0].geometry.location
      //   // });
      // } else {
      //   alert('Geocode was not successful for the following reason: ' + status);
      // }
    });
    this.userDetails = this.authService.getUserDetails();
    console.log(this.userDetails.memberJoinDate)
    this.locatorService.getPosition().then(pos => {
      this.center = {
        lat: pos.lat,
        lng: pos.lng
      }
      this.markerPositions = [{
        lat: pos.lat,
        lng: pos.lng
      }]
    });
  }
  
}
