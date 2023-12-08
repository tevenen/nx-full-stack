import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  loginService = inject(LoginService);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', Validators.compose([Validators.required, Validators.min(3)])),
    password: new FormControl<string>('', Validators.compose([Validators.required]))
  });

  login() {
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(console.log);
    }
  }
}
