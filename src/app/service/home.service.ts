import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentValues } from '../app.constants';
import { Response } from '../models/response';
import { Book, BookResponseModel } from '../models/home.response';
import { Observable, of, switchMap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class HomeService {
    public urlString : string = environmentValues.apiUrl;

    constructor(private httpClient: HttpClient) { }

    getBooksList() : Observable<Book[]>{
        return this.httpClient.get(this.urlString+"/books/getBooks").pipe(
            switchMap((response)=>{
                let result = response  as BookResponseModel;
                return of(result.responseBody)
            })
        )
    }
    
}