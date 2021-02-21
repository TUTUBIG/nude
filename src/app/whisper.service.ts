import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

const loginUrl = 'http://localhost:8080/login';
const registerUrl = 'http://localhost:8080/register';
const listGoodUrl = 'http://localhost:8080/goods';
const listCartGoodsUrl = 'http://localhost:8080/cart/goods';
const checkoutUrl = 'http://localhost:8080/checkout';

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

export interface CheckoutRequest {
  cart_ids: string[];
  destination: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhisperService {

  constructor(private http: HttpClient) { }


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
    return this.http.post(loginUrl, request).pipe(catchError(WhisperService.handleError));
  }

  register(request: SignInUpRequest): Observable<any> {
    return this.http.post(registerUrl, request).pipe(catchError(WhisperService.handleError));
  }

  getGoodList(category: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('category', category);

    return this.http.get(listGoodUrl, {
      params,
    }).pipe(catchError(WhisperService.handleError));
  }

  getCartGoodList(uid: string | null): Observable<any> {
    let params = new HttpParams();
    if (typeof uid === 'string') {
      params = params.set('uid', uid);
    }

    return this.http.get(listCartGoodsUrl, {
      params,
    }).pipe(catchError(WhisperService.handleError));
  }

  checkout(req: CheckoutRequest): Observable<any> {
    return this.http.post(checkoutUrl, req).pipe(catchError(WhisperService.handleError));
  }
}
