import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReponseWrapper } from '../models/response-api-default';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ContactListType } from '../models/ContactListType';
import { ContactList } from '../models/ContactList';

@Injectable({ providedIn: 'root' })
export class ContactListService {
    constructor(private httpClient: HttpClient) { }

    getContactList() {
        return this.httpClient.get<ReponseWrapper<ContactListType>>(`${environment.FEATURE_API}/ContactListResume`, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }

    ImportListOrders(formData: FormData): Observable<ReponseWrapper> {
        return this.httpClient.post<ReponseWrapper>(`${environment.FEATURE_API}/FileInput`, formData, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        })
    }

      
    get(idList:string){
        return this.httpClient.get<ReponseWrapper<ContactList>>(`${environment.FEATURE_API}/ContactList/${idList}`,{
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }
}