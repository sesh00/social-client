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
  loginError: string | undefined;

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

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('userId', response.userId);
        this.router.navigate(['/user', response.userId]);
      },
      (error) => {
        console.error('Login failed', error);
        this.loginError = 'Invalid email or password';
      }
    );
  }
}
