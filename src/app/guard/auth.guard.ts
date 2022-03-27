import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { AppSelectors } from 'src/app/store/app.selector';
import { AuthService } from '../service/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    @SelectSnapshot(AppSelectors.getJwtToken) jwtToken !: string

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(!this.authService.isLoggedIn()){
            this.router.navigate(['/login']);
            return false
        }
        return true;
    }
}