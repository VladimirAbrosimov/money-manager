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
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
        passwordConfirm: ['', [Validators.required]]
      },{
        validator: ConfirmedValidator('password', 'passwordConfirm')
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

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

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


function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
