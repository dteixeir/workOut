import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excersize } from '../excersize.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { BaseController } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-training-new',
  templateUrl: './training-new.component.html',
  styleUrls: [ './training-new.component.scss' ]
})
export class TrainingNewComponent extends BaseController implements OnInit {
  currentEexcersize$: Observable<Excersize>;
  availableExcersizes$: Observable<Excersize[]>;

  constructor(
    private trainingService: TrainingService,
    protected uiService: UIService,
    protected store: Store<fromTraining.State>
  ) {
    super(
      store,
      uiService
    );
  }

  start(form: NgForm) {
    this.trainingService.startExcersize(form.value.selectedExcersize);
  }

  ngOnInit(): void {
    this.baseInit();

    this.currentEexcersize$ = this.store.select(fromTraining.getActiveExcersize);

    this.availableExcersizes$ = this.store.select(fromTraining.getAvailableExcersizes);

    this.fetchExcersizes();
  }

  fetchExcersizes(): void {
    this.trainingService.fetchAvailableExcersizes();
  }
}
