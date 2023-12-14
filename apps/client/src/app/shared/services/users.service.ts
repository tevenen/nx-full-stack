import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http = inject(HttpClient);

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/users/username/${username}`);
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/users/email/${email}`);
  }

}
