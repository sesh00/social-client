import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  registrationError: string | undefined;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      info: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { name, info, birthdate, email, password } = this.registrationForm.value;
    this.authService.register(name, info, birthdate, email, password).subscribe(
      (response) => {
        console.log('Registration successful', response);
        localStorage.setItem('userId', response.userId);
        this.router.navigate(['/user', response.userId]);
      },
      (error) => {
        console.error('Registration failed', error);
        this.registrationError = 'User with this email already exists';
      }
    );
  }
}
