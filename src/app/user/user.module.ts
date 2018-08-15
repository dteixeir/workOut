import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { UIService } from '../shared/ui.service';
import { SharedModule } from '../shared/shared.module';

import { UserService } from './user.service';

export {
  UserService
};

@NgModule({
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    UIService,
    UserService
  ]
}) export class UserModule { }
