import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);

  login(payload: {username: string, password: string}): Observable<{access_token: string}> {
    return this.http.post<{access_token: string}>('/api/auth/login', payload);
  }
}
