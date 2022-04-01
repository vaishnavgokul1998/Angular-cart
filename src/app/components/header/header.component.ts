import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/login/login.response.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  userDetails!:UserDetail | null

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.userDetailSubject.subscribe(response=>{
      this.userDetails = response;
    })

  }

}
