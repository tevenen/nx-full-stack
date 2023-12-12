import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TCredentials, TUser } from '@libs/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(payload: TCredentials): Observable<{access_token: string}> {
    return this.http.post<{access_token: string}>('/api/auth/login', payload);
  }

  getUser(): Observable<TUser> {
    return this.http.get<TUser>('/api/users/current');
  }
}
