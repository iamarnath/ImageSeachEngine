import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class HttpService {
  private baseUrl = environment.baseUrl;
  AUTH_TOKEN = 'auth_token';

  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
 /**
   * This is a get function which will 
   * invoke get api call.
   * @author Amar nath
   * @param {string} url - A string param  - url of the api
   * @param {object} params - A object param  - params(key,page,page_no) for the get call
   * @return {Observable} Return a observable of photos based on search query  
   */
  get(url: string, params?: any): Observable<any> {
    const data = { params };
    return this.httpClient
      .get(this.baseUrl + url, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }
 /**
   * This is a errorHandler function which will 
   * give error in case of api call.
   * @author Amar nath
   * @param {object} response - A object param  - contains error response details
   * @return {Observable} Return a observable of photos based on search query  
   */
  public errorHandler(response: any) {
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
