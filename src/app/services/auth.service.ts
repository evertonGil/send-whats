import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, Subject, throwError } from 'rxjs';
import { ClientApiType, UserStoreType, UserType } from '../models/ClientType';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { selectUser } from '../redux/selectors.store';
import { signin as signinAction, signout } from '../redux/actions/client.action';
import { ReponseWrapper } from '../models/response-api-default';

@Injectable({ providedIn: 'root' })
export class AuthService {
    userClient: UserStoreType;

    constructor(private httpClient: HttpClient, private store: Store) {
        store.select(selectUser)
        .subscribe( res => {
            this.userClient = res
        });

     }

    signIn({ login, password, role }: UserType) {
        const subject = new Subject<{sucess: boolean,message: string }>();

        return this.httpClient
            .post(`${environment.FEATURE_API}/Authenticate/login`, { login, password, role }, {
                headers: {
                    'Access-Control-Allow-Credentials': 'true'
                    , 'Content-Type': 'application/json'
                    , 'Access-Control-Allow-Origin': '*'
                }
            }).pipe(map((res: ReponseWrapper<ClientApiType>) => {
                const {role,  id, login} = res.user;
                this.store.dispatch(signinAction({signed: true, role, id, login}));
                return res;
            }));         
    }

    SignOut(): Subject<boolean> {
        const subject = new Subject<boolean>();

        setTimeout(() => {
            this.store.dispatch(signout())
            subject.next(true);
        }, 0);

        return subject;
    }

    checkLogin(): boolean {
        return this.userClient.signed;
    }

}