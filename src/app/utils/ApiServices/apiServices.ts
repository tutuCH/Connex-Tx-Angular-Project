import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private domain: string | undefined;

  constructor() { 
    this.domain = environment.API_URL;
  }
  makeApiCall(apiUrl: string): Observable<any> {
    const url = `${this.domain}${apiUrl}`;
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
    const url = `${this.domain}${apiUrl}`;
    return new Observable(observer => {
      axios.post(url, body)
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