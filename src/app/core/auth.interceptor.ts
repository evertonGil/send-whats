import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '../redux/selectors.store';


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    AUTH_TOKEN;

    constructor(private store: Store) {
        this.store.select(selectToken)
        .subscribe(token => this.AUTH_TOKEN = token)
     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;

        

        if (this.AUTH_TOKEN) {
            authReq = req.clone({ setHeaders: { Authorization: `Bearer ${this.AUTH_TOKEN}` } });
        }

        return next.handle(authReq)
        // .pipe(
        //     map((resp: HttpEvent<any>) => {
        //         if (resp instanceof HttpResponse && resp.body?.user?.token) {
        //             console.log('AUTH_TOKEN', resp.body?.user?.token);

        //             AUTH_TOKEN = resp.body?.user?.token;
        //         }
        //         return resp;
        //     }))
        ;
    }
}