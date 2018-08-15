import { map, take, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AppCollections } from './../app.constants';

import { Excersize } from './excersize.model';
import { Injectable } from '@angular/core';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as fromRoot from '../app.reducer';
import * as TrainingActions from './training.actions';
import * as UiActions from '../shared/ui.actions';
import { BaseService } from '../shared/shared.module';

@Injectable()
export class TrainingService extends BaseService {
  constructor(
    private db: AngularFirestore,
    protected uiService: UIService,
    protected store: Store<fromTraining.State>
  ) {
    super(
      uiService,
      store
    );

    this.baseInit();
  }

  fetchAvailableExcersizes() {
    this.store.dispatch(new UiActions.StartLoading());

    this.db.collection(AppCollections.AVAILABLE_EXCERSIZES)
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
        }),
        takeUntil(this.isAuth$)
      ).subscribe(
        (excersizes: Excersize[]) => {
          this.store.dispatch(new UiActions.StopLoading());
          this.store.dispatch(new TrainingActions.SetAvailableTraining(excersizes));
        }, (error) => this.baseError(error, 'Fetching available excersizes failed'));
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
      }, (error) => this.baseError(error));

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
      }, (error) => this.baseError(error));
  }

  getFinishedExcersizes() {
    this.store.dispatch(new UiActions.StartLoading());

    this.store.select(fromRoot.getUser)
      .pipe(take(1))
      .subscribe(user => {
        this.db.doc(`users/${user.userId}`).collection(AppCollections.FINISHED_EXCERSIZES)
          .valueChanges()
          .pipe(takeUntil(this.isAuth$))
          .subscribe((excersizes: Excersize[]) => {
            this.store.dispatch(new TrainingActions.SetFinishedTraining(excersizes));
            this.store.dispatch(new UiActions.StopLoading());
          }, (error) => {
            this.baseError(error, 'Unable to fetch Finished Excersizes');
          });
      }, (error) => this.baseError(error));
  }

  private saveExcersize(excersize: Excersize) {
    this.store.select(fromRoot.getUser)
      .pipe(take(1))
      .subscribe(({ userId }) => {
        this.db.doc(`users/${ userId }`)
          .collection(AppCollections.FINISHED_EXCERSIZES)
          .add(excersize);
      }, (error) => this.baseError(error));
  }
}
