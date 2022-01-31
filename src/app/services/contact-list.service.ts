import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReponseWrapper } from '../models/response-api-default';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactListService {
    constructor(private httpClient: HttpClient) { }

    ImportListOrders(formData: FormData): Observable<ReponseWrapper> {
        return this.httpClient.post<ReponseWrapper>(`${environment.FEATURE_API}/FileInput`, formData, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        })
    }
}