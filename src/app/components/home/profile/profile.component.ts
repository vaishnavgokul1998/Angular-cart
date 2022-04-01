import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/login/login.response.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails!:UserDetail;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails();
    console.log(this.userDetails.memberJoinDate)
  }

}
