import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { UIService } from '../shared/ui.service';
import { BaseController } from './baseClasses/baseController';
import { BaseService } from './baseClasses/baseService';

export {
  BaseService,
  BaseController,
  UIService
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    UIService
  ]
}) export class SharedModule { }
