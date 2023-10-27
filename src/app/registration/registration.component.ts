import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { username, password } = this.registrationForm.value;
    this.authService.register(username, password).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Дополнительная обработка успешной регистрации
      },
      (error) => {
        console.error('Registration failed', error);
        // Дополнительная обработка ошибки регистрации
      }
    );
  }
}
