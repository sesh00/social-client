import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
