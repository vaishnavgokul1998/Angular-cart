
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of as observableOf , switchMap } from 'rxjs';
import { environmentValues } from '../app.constants';
import { LoginRequest } from '../models/login/login.request.model';
import { LoginResponseModel } from '../models/login/login.response.model';
import { Response } from '../models/response';
import { SignupRequest } from '../models/signup/signup.request.model';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class RestApiService {

   public urlString : string = environmentValues.apiUrl;

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
        ) { }

    public login(body: LoginRequest){
        return this.httpClient.post<LoginResponseModel>(this.urlString+'/authenticate',body).pipe(
            switchMap((res)=>{
                this.authService.setUserDetails(res.responseBody)
                return observableOf(res);
            })
        )
    }
    public signUp(body: SignupRequest){
        return this.httpClient.post<Response>(this.urlString+'/createUser',body).pipe(
            map( res => {
                return res as Response
            })
        )
    }
    
}