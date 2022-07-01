import { Component, OnInit } from '@angular/core';
import * as auth from '@angular/fire/auth';
import { User } from '../../../shared/models/User';
import { FormBuilder, Validators } from '@angular/forms';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { LoginForm } from '../../models/LoginForm';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;

  public loginForm: IFormGroup<LoginForm>;

  private formBuilder: IFormBuilder;

  constructor(
    public authService: AuthService,
    formBuilder: FormBuilder
  ) {
    this.formBuilder = formBuilder;

    this.loginForm = this.formBuilder.group<LoginForm>({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

  }

  ngOnInit(): void {
  }

  signInWithEmailAndPassword() {
    var email = this.loginForm.value?.email;
    var password = this.loginForm.value?.password;

    if (email && password) this.authService.signInViaEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    this.authService.signInViaGoogle();
  }

  signInWithFacebook() {
    this.authService.signInViaFacebook();
  }

}
