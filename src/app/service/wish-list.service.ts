import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentValues } from '../app.constants';
import { Response } from '../models/response';

@Injectable({providedIn: 'root'})
export class WishListService {

    public urlString : string = environmentValues.apiUrl;

    constructor(private httpClient: HttpClient) { }

    getWishList(){
        return this.httpClient.get<Response>(this.urlString+'/wishlist/getWishList')
    }

    updateWishList(id:number){

        return this.httpClient.put(this.urlString+'/wishlist/updateWishList/'+id,{})
    }
    
}