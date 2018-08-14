import { Store } from '@ngrx/store';

import { UserAuth } from './userAuth.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { RouteNames } from './../routes';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as AUTH from './auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  initAuthListner() {
    this.store.select(fromRoot.getIsAuthenticated).subscribe(data => {
      if (data) {
        this.router.navigate([ RouteNames.Training ]);
      } else {
        this.router.navigate([ RouteNames.Login ]);
      }
    });

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AUTH.SetAuthenticated());
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new AUTH.SetUnAuthenticated());
      }
    });
  }

  registerUser(userAuth: UserAuth) {
    this.store.dispatch(new UI.StartLoading());
    const promise: Promise<firebase.auth.UserCredential> = this.afAuth.auth.createUserWithEmailAndPassword(
      userAuth.email,
      userAuth.password
    );

    this.validatAuth(promise);
  }

  login(userAuth: UserAuth) {
    this.store.dispatch(new UI.StartLoading());
    const promise: Promise<firebase.auth.UserCredential> = this.afAuth.auth.signInWithEmailAndPassword(
      userAuth.email,
      userAuth.password
    );

    this.validatAuth(promise);
  }

  validatAuth(authCall): void {
    authCall.then(result => {

    })
      .catch(error => {
        this.uiService.showSnackBar(error.message, null);
      }).finally(() => {
        this.store.dispatch(new UI.StopLoading());
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
