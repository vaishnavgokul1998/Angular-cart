
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { AppSelectors } from '../store/app.selector';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { AuthService } from '../service/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.url.endsWith("authenticate") && !req.url.endsWith('createUser')) {
            const Authorization = 'Bearer ' + this.authService?.getToken();
            return next.handle(req.clone({ setHeaders: { Authorization } })).pipe(
                catchError(
                    (err, caught) => {
                        if (err.status == 401) {
                            this.authService.logOut()
                            return of(err)
                        }
                       throw err;
                    })
            )
        }
        return next.handle(req);
    }
}