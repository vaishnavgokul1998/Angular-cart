import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentValues } from '../app.constants';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { CartListResponse, CartRequest } from '../models/cart/cart.model';

@Injectable({providedIn: 'root'})
export class CartService {

    public urlString : string = environmentValues.apiUrl;

    constructor(
        private httpClient: HttpClient
        ) { 

    }

    addItemToCart(body: CartRequest):Observable<Response>{
        return this.httpClient.post<Response>(this.urlString+'/cart/addBookToCart',body);
    }

    getCartItems() : Observable<CartListResponse>{
        return this.httpClient.get<CartListResponse>(this.urlString+'/cart/getCartItemsByUser');
    }

    updateCartItem(body: CartRequest,id:number) : Observable<Response>{
        return this.httpClient.put<Response>(this.urlString+'/cart/updateCartItem/'+id,body);
    }

    deleteItem(id:number) : Observable<Response>{
        return this.httpClient.delete<Response>(this.urlString+'/cart/deleteCartItem/'+id);
    }
    
}