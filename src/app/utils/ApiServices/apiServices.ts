import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  makeApiCall(apiUrl: string): Observable<any> {
    return new Observable(observer => {
      axios.get(apiUrl)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  postApiCall(apiUrl: string, body: any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json'
    };

    return new Observable(observer => {
      axios.post(apiUrl, body, { headers })
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}