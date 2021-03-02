import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchValidator} from '../signup/signup.component';
import {SignInRequest, WhisperService} from '../../whisper.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {
  constructor(private backend: WhisperService) { }

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
    const req: SignInRequest = {
      email: this.email.value,
      password: this.password.value,
    };
    this.backend.login(req).subscribe();
  }

  ngOnInit(): void {}
}
