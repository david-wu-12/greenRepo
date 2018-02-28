import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {
    appSubscription: any;
    currentUserToken: any;

    constructor(public http: HttpClient) {
    }

    public get<T>(url: string, params?: any): Observable<T> {
        return this.http.get<T>(url, { headers: this.buildHeaders() });
    }

    public post<T>(url: string, data?: any, params?: any): Observable<HttpResponse<T>> {
        return this.http.post<T>(url, data, {headers: this.buildHeaders(),
            observe: 'response' });
    }

    public put<T>(url: string, data?: any, params?: any): Observable<HttpResponse<T>> {
        return this.http.put<T>(url, data, { headers: this.buildHeaders(),
            observe: 'response'
         });
    }

    public delete<T>(url: string): Observable<HttpResponse<T>> {
        return this.http.delete<T>(url, { headers: this.buildHeaders(),
            observe: 'response'
         });
    }

    private buildUrlSearchParams(params: any): HttpParams {
        const searchParams = new HttpParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams;
    }

    private buildHeaders(): HttpHeaders {
        // get USERTOKEN obj
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return headers;
    }

}
