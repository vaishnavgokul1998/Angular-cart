
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CartListResponse } from 'src/app/models/cart/cart.model';
import { CartService } from 'src/app/service/cart.service';

@Injectable({ providedIn: 'root' })
export class CartResolver implements Resolve<CartListResponse> {
    constructor(private cartService:CartService){}
    resolve(route: ActivatedRouteSnapshot): Observable<CartListResponse> | Promise<CartListResponse> | CartListResponse {
        return this.cartService.getCartItems();
    }
}