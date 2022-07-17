import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class HttpService {
  private baseUrl = 'https://pixabay.com/api';
  AUTH_TOKEN = 'auth_token';

  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get(url: string, params?: any): Observable<any> {
    const data = { params };
    return this.httpClient
      .get(this.baseUrl + url, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(response: any) {
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];
    if (response.status === 401) {
      // auth token delete
      // redirect login page
    }
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    if (key === 'isTrusted') {
    } else {
      message = key + ' : ' + message;
    }
    return throwError({ messages: message, error });
  }
}
