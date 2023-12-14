import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TCredentials } from '@libs/models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  @Input() errorMessage: string = '';

  @Output() login: EventEmitter<TCredentials> = new EventEmitter<TCredentials>();

  loginForm: FormGroup = new FormGroup({
    username: new FormControl<string>('milan1@gmail.com', Validators.compose([Validators.required, Validators.min(3)])),
    password: new FormControl<string>('password', Validators.compose([Validators.required]))
  });
  hidePassword: boolean = true;

  submit() {
    if(this.loginForm.valid) {
      this.login.emit(this.loginForm.value);
    }
  }
}
