import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs';

export class UserValidator {

  static usernameExistsValidator(usersService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => usersService.checkUsernameAvailability(value)),
        map(value => value ? null : {usernameNotAvailable: true}),
        first()
      );
    }
  }

  static emailExistsValidator(usersService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => usersService.checkEmailAvailability(value)),
        map(value => value ? null : {emailNotAvailable: true}),
        first()
      );
    }
  }

}

