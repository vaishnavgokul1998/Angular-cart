import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/login/login.response.model';
import { AuthService } from '../../../service/auth.service';
import { LocatorService } from '../../../service/locator.service';

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

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event?.latLng?.toJSON() as any);
  }
  constructor(
    private authService: AuthService,
    private locatorService: LocatorService
  ) {
    // this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw', 'callback')
    //     .pipe(
    //       map(() => true),
    //       catchError(() => of(false)),
    //     );
  }

  ngOnInit(): void {
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
