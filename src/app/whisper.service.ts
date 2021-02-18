import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export interface GoodListRequest {
  category: string;
}

export interface GoodSimpleInfo {
  imageUrl: string;
  description: string;
  price: number;
  skuId: string;
}

export interface GoodListResponse {
  goods: GoodSimpleInfo[];
}

export interface SignInUpRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhisperService {

  constructor(private http: HttpClient) { }
/**/
  loginUrl = 'http://localhost:8080/login';
  registerUrl = 'http://localhost:8080/register';
  listGoodUrl = 'http://localhost:8080/good-list';

  private static handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  login(request: SignInUpRequest): Observable<any> {
    return this.http.post(this.loginUrl, request).pipe(catchError(WhisperService.handleError));
  }

  register(request: SignInUpRequest): Observable<any> {
    return this.http.post(this.registerUrl, request).pipe(catchError(WhisperService.handleError));
  }

  getGoodList(request: GoodListRequest): Observable<any> {
    return this.http.post(this.listGoodUrl, request).pipe(catchError(WhisperService.handleError));
  }
}
