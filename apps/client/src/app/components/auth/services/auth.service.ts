import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, RegisterResponse, TCredentials, TUser } from '@libs/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(payload: TCredentials): Observable<{access_token: string}> {
    return this.http.post<{access_token: string}>('/api/auth/login', payload);
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/api/auth/register', payload);
  }

  getUser(): Observable<TUser> {
    return this.http.get<TUser>('/api/users/current');
  }
}
