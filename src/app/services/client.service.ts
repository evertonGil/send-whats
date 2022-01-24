import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { ReponseWrapper } from '../models/response-api-default';
import { ClientApiType } from '../models/ClientType';
import { Store } from '@ngrx/store';
import { updateClient } from '../redux/actions/client.action';

@Injectable({ providedIn: 'root' })
export class ClientService {
    constructor(private httpClient: HttpClient, private store: Store) { }

    get() {
        return this.httpClient.get<ReponseWrapper<{ client: ClientApiType }>>(`${environment.FEATURE_API}/Clients`, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Content-Type': 'application/json'
                , 'Access-Control-Allow-Origin': '*'
            }
        })
            .pipe(map(res => {
                this.store.dispatch(updateClient(res.client))
            }));
    }

    create(client: ClientApiType) {
        return this.httpClient.post<ReponseWrapper<{ client: ClientApiType }>>(
            `${environment.FEATURE_API}/Clients`,
            client,
            {
                headers: {
                    'Access-Control-Allow-Credentials': 'true'
                    , 'Content-Type': 'application/json'
                    , 'Access-Control-Allow-Origin': '*'
                }
            });
    }

}