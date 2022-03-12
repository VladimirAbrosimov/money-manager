import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder, FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from 'src/app/models/user';
import {UserService} from 'src/app/services/user.service';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.submitted = false;
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)], [this.checkUsernameUsed()]],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]]
      },
      {
        updateOn: 'blur'
      });
  }

  get formFields() {
    return this.registerForm.controls;
  }

  checkUsernameUsed(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.isUsernameUsed(control.value).pipe(
        map(isUsernameUsed => {
          return isUsernameUsed ? {usernameUsed: true} : null;
        })
      );
    }
  }

  checkPasswordConfirm() {
    return (control: FormControl) => {
      return control.value === this.registerForm.controls.password.value ?
        {passwordsNotMatch: true} : null
    }
  }

  matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl):
      ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
      !!control.parent.value &&
      control.value ===
      (control.parent?.controls as any)[matchTo].value
        ? null
        : {matching: true};
    };
  }

  onSubmit() {
    this.submitted = true;

    const username = this.formFields.username.value;
    const password = this.formFields.password.value;
    const passwordConfirm = this.formFields.password.value;

    const user: User = {
      username,
      password,
      passwordConfirm
    }

    this.userService.addUser(user).subscribe({
      complete: () => {
        this.userService.authUser(user).subscribe({
          complete: () => this.router.navigate(['/home'])
        })
      }
    });
  }

}
