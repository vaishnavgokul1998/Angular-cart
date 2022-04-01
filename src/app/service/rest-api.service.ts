
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of as observableOf , switchMap } from 'rxjs';
import { environmentValues } from '../app.constants';
import { LoginRequest } from '../models/login/login.request.model';
import { LoginResposeModel, UserDetail, UserDetailModel } from '../models/login/login.response.model';
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
        return this.httpClient.post<LoginResposeModel>(this.urlString+'/authenticate',body).pipe(
            switchMap((res)=>{
                this.authService.setToken(res.responseBody.jwtToken)
                return observableOf(res);
            })
        )
    }
    public getUserDetails(){
        return this.httpClient.get<UserDetailModel>(this.urlString+'/user/getUserDetails').pipe(
            switchMap((res)=>{
                let userDetails = res.responseBody as UserDetail;
                this.authService.setUserDetails(userDetails)
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