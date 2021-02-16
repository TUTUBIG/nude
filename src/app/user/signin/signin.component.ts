import { Component, OnInit } from '@angular/core';
import {LoginRequest, LoginResponse, UserService} from '../../user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchValidator} from '../signup/signup.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {
  constructor(private backend: UserService) { }

  get email(): FormControl {
    return this.emailLogin.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.emailLogin.get('passwordFormControl')?.get('password') as FormControl;
  }
  get confirm(): FormControl {
    return this.emailLogin.get('passwordFormControl')?.get('confirm') as FormControl;
  }
  hide = true;

  emailLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormGroup({
      password: new FormControl('', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$')),
      confirm: new FormControl(),
    }, { validators: matchValidator }),
  });

  login(): void {
    console.log('login components: ', this.email.value, this.password.value);
    const loginRequest: LoginRequest = {
      email: this.email.value,
      password: this.password.value
    };
    console.log('components: ', loginRequest);
    this.backend.login(loginRequest).subscribe(data => {
      const loginResponse = data as LoginResponse;
      console.log('uid: ', loginResponse.uid);
    });
  }

  ngOnInit(): void {}
}
