import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl = 'http://localhost:8080/login';
  registerUrl = 'http://localhost:8080/register';

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

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<any>{
    return this.http.post(this.loginUrl, request).pipe(catchError(UserService.handleError));
  }

  register(request: LoginRequest): Observable<any>{
    return this.http.post(this.registerUrl, request).pipe(catchError(UserService.handleError));
  }
}
