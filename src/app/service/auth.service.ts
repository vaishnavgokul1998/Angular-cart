import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginRespose, UserDetail } from '../models/login/login.response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    userDetailSubject: BehaviorSubject<UserDetail | null> = new BehaviorSubject<UserDetail | null>(JSON.parse(localStorage.getItem('userDetails') || 'null'));


    constructor(
        private router: Router
    ) {
    }

    isLoggedIn(): boolean {
        let value = localStorage.getItem('loginInfo')
        return value ? true : false
    }

    public getUserDetails() {
        let value = localStorage.getItem('userDetails')
        if (value) {
            return JSON.parse(localStorage.getItem('userDetails') || '{}');
        }
       return null
    }
    public setUserDetails(value: UserDetail) {
        this.userDetailSubject.next(value)
        localStorage.setItem('userDetails', JSON.stringify(value))
    }

    public getLoginInfo():LoginRespose | null {
        let value = localStorage.getItem('loginInfo')
        if (value) {
            return JSON.parse(localStorage.getItem('loginInfo') || '{}');;;
        }
       return null;
    }

    public setLoginInfo(value: LoginRespose) {
        localStorage.setItem('loginInfo', JSON.stringify(value))
    }

    public logOut() {
        localStorage.clear();
        this.userDetailSubject.next(null)
        this.router.navigate(['/'])
    }

}