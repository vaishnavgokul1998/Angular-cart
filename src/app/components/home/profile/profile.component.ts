import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/models/login/login.response.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails!:LoginResponse;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails();
    console.log(this.userDetails.memberJoinDate)
  }

}
