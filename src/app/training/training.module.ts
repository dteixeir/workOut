import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TrainingComponent } from './training.component';
import { TrainingNewComponent } from './training-new/training-new.component';
import { TrainingCurrentComponent } from './training-current/training-current.component';
import { TrainingPastComponent } from './training-past/training-past.component';

import { TrainingService } from './training.service';
import { UIService } from '../shared/ui.service';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

export {
  TrainingComponent,
  TrainingNewComponent,
  TrainingCurrentComponent,
  TrainingPastComponent
};

const components = [
  TrainingComponent,
  TrainingNewComponent,
  TrainingCurrentComponent,
  TrainingPastComponent
];

@NgModule({
  imports: [
    TrainingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  providers: [
    TrainingService,
    UIService
  ],
  exports: components,
  declarations: components
}) export class TrainingModule { }
