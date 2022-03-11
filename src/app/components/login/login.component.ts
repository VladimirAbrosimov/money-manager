import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService : UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.submitted = false;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formFields() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    const username = this.formFields.username.value;
    const password = this.formFields.password.value;
    const user: User = {
      username,
      password
    }

    this.userService.authUser(user).subscribe({
      complete: () => {
        this.router.navigate(['/home']);
      }
    });

  }
}
