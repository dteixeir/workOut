import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { UIService } from '../shared/ui.service';
import { AuthRoutingModule } from './auth-routing.module';

export {
  LoginComponent,
  SignupComponent,
  AuthService
};

@NgModule({
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
    UIService,
    AuthService
  ]
}) export class AuthModule { }
