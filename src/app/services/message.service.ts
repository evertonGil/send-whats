import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactListType } from '../models/ContactListType';
import { ReponseWrapper } from '../models/response-api-default';
import { environment } from 'src/environments/environment';
import { MessageResponseType, MessageSendType, MessageType } from '../models/MessageType';
import { catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { updateAll } from '../redux/actions/message.action';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(
        private httpClient: HttpClient,
        private store: Store,
        private toastr: ToastrService
    ) { }

    get() {
        return this.httpClient.get<ReponseWrapper<MessageResponseType>>(`${environment.FEATURE_API}/Message`, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        }).pipe(
            catchError(error => {
                this.toastr.error('Erro ao procurar a lista de mensagens, por favor contacte o suporte!!');
                return throwError(() => new Error(error.message));
            }),
            map(res => {
                this.store.dispatch(updateAll({ messages: res.messages.length ? res.messages : mockMsgs }))
            })
        );
    }

    post(message: string) {
        return this.httpClient.post<ReponseWrapper>(`${environment.FEATURE_API}/Message?message=${encodeURIComponent(message)}`, {}, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }

    delete(message: MessageType) {
        return this.httpClient.delete<ReponseWrapper>(`${environment.FEATURE_API}/Message?idMessage=${encodeURIComponent(message.id)}`, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }

    send(message: MessageSendType) {
        return this.httpClient.post<ReponseWrapper>(`${environment.FEATURE_API}/Message/send-message`, message, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }
}


export const mockMsgs: MessageType[] = [
    {
        id: "1",
        idClient: "1",
        "title": "Mensagem Envio normal 1",
        "message": "dsadsa\n*dsanjkbjfksabj*\n_fdsanjkdsnbajkb_\nfdsadsa",
        "picture": "https://www.adobe.com/br/express/create/media_19da0db39efaa40b43fa0f5fefb7aeb14328a929e.jpeg?width=400&format=jpeg&optimize=medium"
    },
    {
        id: "1",
        idClient: "1",
        "title": "Mensagem Envio normal 2",
        "message": "dsadsa\n*dsanjkbjfksabj*\n_fdsanjkdsnbajkb_\nfdsadsa",
        "picture": "https://www.vaivai.com.br/wp-content/uploads/2020/05/FLYER.png"
    },
    {
        id: "3",
        idClient: "1",
        "title": "Mensagem Envio normal 3",
        "message": "dsadsa\n*dsanjkbjfksabj*\n_fdsanjkdsnbajkb_\nfdsadsa",
        "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-nMbGmB3O4o-4EYQCzeGGUhRDUMYqAccrUQ&usqp=CAU"
    }
]