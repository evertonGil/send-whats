import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '../redux/selectors.store';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

const Unauthorized = 401;

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    AUTH_TOKEN;

    constructor(private store: Store, private authService: AuthService, private toastr: ToastrService) {
        this.store.select(selectToken)
            .subscribe(token => this.AUTH_TOKEN = token)
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;


        const skipInsertAuthToken = req.headers.get('Skip-Auth-Iterceptor');

        if (this.AUTH_TOKEN && !skipInsertAuthToken) {
            authReq = req.clone({ setHeaders: { Authorization: `Bearer ${this.AUTH_TOKEN}` } });
        }

        return next
            .handle(authReq)
            .pipe(catchError<any, any>(e => {
                console.log(e);
                if (e.status === Unauthorized) {
                    this.signOut();
                }
                return e;
            }))
    }

    private signOut() {
        this.authService.SignOut()
            .subscribe(e => {
                this.toastr.warning('Sua sessão expirou, realize o login novamente!');
            });
    }
}