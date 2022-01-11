import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {
    constructor(private httpClient: HttpClient) { }

    signIn(): Subject<boolean> {
        const subject = new Subject<boolean>();

        localStorage.setItem("login", "true");
        subject.next(true);

        return subject;
    }

    SignOut(): Subject<boolean> {
        const subject = new Subject<boolean>();

        localStorage.removeItem("login");
        subject.next(true);

        return subject;
    }

    checkLogin(): boolean {
        const result = localStorage.getItem("login") == "true" ? true : false;
        return result;
    }
    
}