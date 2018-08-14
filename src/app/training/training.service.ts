import { map, last, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AppCollections } from './../app.constants';

import { Excersize } from './excersize.model';
import { Subject, Subscription } from 'rxjs';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import { Injectable } from '@angular/core';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as TrainingActions from './training.actions';
import * as UiActions from '../shared/ui.actions';

@Injectable()
export class TrainingService {
  private _fbSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) { }

  fetchAvailableExcersizes() {
    this.store.dispatch(new UiActions.StartLoading());

    const subscription: Subscription = this.db.collection(AppCollections.AVAILABLE_EXCERSIZES)
      .snapshotChanges()
      .pipe(
      map(data => {
        // throw new Error();
          return data.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            } as Excersize;
          }) as Excersize[];
        })
      )
      .subscribe(
        (excersizes: Excersize[]) => {
          this.store.dispatch(new UiActions.StopLoading());
          this.store.dispatch(new TrainingActions.SetAvailableTraining(excersizes));
        },
        (error) => {
          this.store.dispatch(new UiActions.StopLoading());
          this.uiService.showSnackBar('Fetching available excersizes failed', null);
        });

    this._fbSubscriptions.push(subscription);
  }

  startExcersize(excersize: Excersize): void {
    this.store.dispatch(new TrainingActions.StartTraining(excersize));
  }

  completeExcersize() {
    this.store.select(fromTraining.getActiveExcersize)
      .pipe(take(1))
      .subscribe(excersize => {
        this.saveExcersize({
          ...excersize,
          date: new Date(),
          state: 'completed'
        });
    });

    this.store.dispatch(new TrainingActions.StopTraining());
  }

  cancelExcersize(progress: number) {
    this.store.select(fromTraining.getActiveExcersize)
      .pipe(take(1))
      .subscribe(excersize => {
        this.saveExcersize({
          ...excersize,
          duration: excersize.duration * (progress / 100),
          caloriesBurned: excersize.caloriesBurned * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });

        this.store.dispatch(new TrainingActions.StopTraining());
      });
  }

  getFinishedExcersizes() {
    this.store.dispatch(new UiActions.StartLoading());
    const subscription: Subscription = this.db.collection(AppCollections.FINISHED_EXCERSIZES)
      .valueChanges()
      .subscribe(
        (excersizes: Excersize[]) => {
          this.store.dispatch(new TrainingActions.SetFinishedTraining(excersizes));
          this.store.dispatch(new UiActions.StopLoading());        },
        (error) => {
          this.store.dispatch(new UiActions.StopLoading());
          this.uiService.showSnackBar('Unable to fetch Finished Excersizes', null);
        }
      );

    this._fbSubscriptions.push(subscription);
  }

  private saveExcersize(excersize: Excersize) {
    this.db.collection(AppCollections.FINISHED_EXCERSIZES).add(excersize);
  }

  cancelSubscriptions(): void {
    this._fbSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
