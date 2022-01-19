import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { map, Observable } from 'rxjs';

let AUTH_TOKEN;

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;

        if (AUTH_TOKEN) {
            authReq = req.clone({ setHeaders: { AUTH_TOKEN } });
        }

        return next.handle(authReq).pipe(
            map((resp: HttpEvent<any>) => {
                if (resp instanceof HttpResponse && resp.body?.user?.token) {
                    console.log('AUTH_TOKEN', resp.body?.user?.token);

                    AUTH_TOKEN = resp.body?.user?.token;
                }
                return resp;
            }));
    }
}