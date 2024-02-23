import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from '../environment/environment';
import { UserRegistration } from '../model/registration';
import { HttpResponse } from '../model/HttpResponse';
import { UserLogin } from '../model/login';
import { AuthenticationResponse } from '../model/authResponse';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  private userBaseUrl = environment.userBaseUrl;
  constructor(private http: HttpClient) {}

  registerUser(
    userData: UserRegistration
  ): Observable<HttpResponse<{ token: string }>> {
    return this.http
      .post<HttpResponse<{ token: string }>>(
        `${this.userBaseUrl}/register`,
        userData
      )
      .pipe(
        map((response) => {
          console.log('Mapped Response:', response);
          if (response.message) {
            return response;
          } else {
            throw new Error(
              'Registration successful, but no message was provided.'
            );
          }
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMsg = error.error?.message || 'An unknown error occurred';
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  authenticateUser(
    loginData: UserLogin
  ): Observable<HttpResponse<AuthenticationResponse>> {
    return this.http
      .post<HttpResponse<AuthenticationResponse>>(
        `${this.userBaseUrl}/login`,
        loginData
      )
      .pipe(
        map((response) => {
          console.log('Mapped Response:', response);
          if (response.message) {
            return response;
          } else {
            throw new Error(
              'Authentication successful, but no message was provided.'
            );
          }
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMsg = error.error?.message || 'An unknown error occurred';
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  logout(): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.delete(`${environment.userBaseUrl}/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
