import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export {
  ConfirmModalComponent
};

const components = [
  ConfirmModalComponent
];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FlexLayoutModule
  ],
  exports: components,
  declarations: components,
  entryComponents: [
    ConfirmModalComponent
  ]
}) export class ModalModule { }
