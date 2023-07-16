import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  makeApiCall(apiUrl: string): Observable<any> {
    const url = `${environment.API_URL}${apiUrl}`;
    return new Observable(observer => {
      axios.get(url)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(`Error: ${error.message}`);
        });
    });
  }

  postApiCall(apiUrl: string, body: any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json'
    };
    const url = `${environment.API_URL}${apiUrl}`;
    return new Observable(observer => {
      axios.post(url, body, { headers })
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.next({status: 'fail', message: error});
          observer.complete();
        });
    });
  }
}