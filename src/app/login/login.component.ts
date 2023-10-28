// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginError: string | undefined

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Login successful', response);

      },
      (error) => {
        console.error('Login failed', error);
        this.loginError = 'Неправильный email или пароль';
      }
    );
  }
}
