import { Component, OnInit } from '@angular/core';
import * as fromTraining from './training.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean>;

  constructor(
    private store: Store<fromTraining.State>,
  ) { }

  ngOnInit() {
    this.onGoingTraining$ = this.store.select(fromTraining.hasActiveExcersize);
  }
}
