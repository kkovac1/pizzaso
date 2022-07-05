import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { IFormGroup, IFormBuilder } from '@rxweb/types';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { RegisterForm } from '../../models/RegisterForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: IFormGroup<RegisterForm>;

  private formBuilder: IFormBuilder;

  constructor(
    public authService: AuthService,
    formBuilder: UntypedFormBuilder
  ) {
    this.formBuilder = formBuilder;
    this.registerForm = this.formBuilder.group<RegisterForm>({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
  }

  register() {
    var email = this.registerForm.value?.email;
    var password = this.registerForm.value?.password;
    var displayName = `${this.registerForm.value?.firstName} ${this.registerForm.value?.lastName}`;
    if (email && password) this.authService.signUpWithEmailAndPassword(email, password, displayName);
  }
}
