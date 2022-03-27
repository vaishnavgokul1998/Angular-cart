import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../models/login/login.response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    userDetailSubject: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(JSON.parse(localStorage.getItem('userDetails') || 'null'));


    constructor(
        private router: Router
    ) {
    }

    isLoggedIn(): boolean {
        let value = localStorage.getItem('userDetails')
        return value ? true : false
    }

    public getUserDetails() {
        let value = localStorage.getItem('userDetails')
        if (value) {
            return JSON.parse(localStorage.getItem('userDetails') || '{}');
        }
       return null
    }
    public setUserDetails(value: LoginResponse) {
        this.userDetailSubject.next(value)
        localStorage.setItem('userDetails', JSON.stringify(value))
    }

    public logOut() {
        localStorage.clear();
        this.userDetailSubject.next(null)
        this.router.navigate(['/'])
    }

}