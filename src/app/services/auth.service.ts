import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Subject, throwError } from 'rxjs';
import { UserType } from '../models/ClientType';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    signIn({ login, password, role }: UserType) {
        const subject = new Subject<{sucess: boolean,message: string }>();

        return this.httpClient
            .post(`${environment.FEATURE_API}/Authenticate/login`, { login, password, role }, {
                headers: {
                    'Access-Control-Allow-Credentials': 'true'
                    , 'Content-Type': 'application/json'
                    , 'Access-Control-Allow-Origin': '*'
                }
            })
            
            // .subscribe(res => {
            //     console.log(res);

            //     localStorage.setItem("login", JSON.stringify(res));

            //     subject.next({sucess: true, message: 'Loggin realizado com sucesso!' });
            // });

        return subject;
    }

    SignOut(): Subject<boolean> {
        const subject = new Subject<boolean>();

        setTimeout(() => {
            localStorage.removeItem("login");
            subject.next(true);
        }, 0);

        return subject;
    }

    checkLogin(): boolean {
        const result = localStorage.getItem("login") == "true" ? true : false;
        return result;
    }

}