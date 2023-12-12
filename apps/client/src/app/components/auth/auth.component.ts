import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from './services/auth.service';
import { AppStore } from '../../core/store/app.store';
import { LoginComponent } from './components/login/login.component';
import { switchMap, tap } from 'rxjs';
import { TUser } from '@libs/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule, ReactiveFormsModule, LoginComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  loginService = inject(AuthService);
  store = inject(AppStore);

  errorMessage: string = '';

  login(value: {username: string; password: string}) {
      this.loginService.login(value).pipe(
        tap(data => localStorage.setItem('token', data.access_token)),
        switchMap(() => this.loginService.getUser())
      ).subscribe((user: TUser) => {
        this.store.updateUser(user);
      }, (error: HttpErrorResponse) => {
        console.log(error)
        this.errorMessage = error.error.message;
      });

  }
}
