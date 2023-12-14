import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef, EventEmitter,
  inject,
  OnInit,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserValidator } from '../../../../shared/validators/user.validator';
import { UsersService } from '../../../../shared/services/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegisterRequest } from '@libs/models';

@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  @Output() register: EventEmitter<RegisterRequest> = new EventEmitter<RegisterRequest>();

  usersService = inject(UsersService);
  changeDetector = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);

  registerForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [
        UserValidator.emailExistsValidator(this.usersService)
      ]
    }),
    username: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [
        UserValidator.usernameExistsValidator(this.usersService)
      ]
    }),
    name: new FormControl<string>('', {
      validators: [Validators.required]
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(12)]
    }),
    repeatPassword: new FormControl<string>('', {
      validators: [Validators.required]
    })
  });

  get passwordControl(): FormControl  {
    return this.registerForm.get('password') as FormControl;
  }

  get emailControl(): FormControl  {
    return this.registerForm.get('email') as FormControl;
  }

  get usernameControl(): FormControl  {
    return this.registerForm.get('username') as FormControl;
  }

  hidePassword: boolean = true;
  hideRepeatPassword: boolean = true;

  submit() {
    if(this.registerForm.valid) {
      const value = this.registerForm.value;
      delete value.repeatPassword;
      this.register.emit(value);
    }
  }

  ngOnInit(): void {
    this.registerForm.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.changeDetector.markForCheck();
    });
  }
}
