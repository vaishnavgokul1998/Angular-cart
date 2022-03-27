import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../../models/home.response';
import { HomeService } from 'src/app/service/home.service';

@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<Book[]> {
    constructor(private homeservice:HomeService){}
    resolve(route: ActivatedRouteSnapshot): Observable<Book[]> | Promise<Book[]> | Book[] {
        return this.homeservice.getBooksList();
    }
}