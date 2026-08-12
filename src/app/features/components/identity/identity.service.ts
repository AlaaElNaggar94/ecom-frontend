import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private baseUrl = environment.baseUrl; // تأكد أن الـ baseUrl ينتهي بـ / أو أضفه في الـ endpoint

  constructor(private http: HttpClient) {}

  register(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Account/register`, model);
  }

  login(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Account/login`, model, { withCredentials: true });
  }

  activateAccount(model: { email: string; token: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Account/activate-account`, model);
  }

  forgetPassword(model: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Account/forget-password`, model);
  }

  resetPassword(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Account/reset-password`, model);
  }
}