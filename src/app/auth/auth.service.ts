import { Store } from '@ngrx/store';

import { UserAuth } from './userAuth.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { RouteNames } from './../routes';
import { BaseService } from '../shared/shared.module';
import { UIService } from '../shared/ui.service';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as AUTH from './auth.actions';
import * as USER from '../user/user.actions';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    protected uiService: UIService,
    protected store: Store<fromRoot.State>
  ) {
    super(uiService, store);
  }

  initAuthListner() {
    this.store.select(fromRoot.getIsAuthenticated)
      .subscribe(data => {
        if (data) {
          this.router.navigate([ RouteNames.Training ]);
        } else {
          this.router.navigate([ RouteNames.Login ]);
        }
      }, (error) => this.baseError(error));

    this.afAuth.authState
      .subscribe(user => {
        if (user) {
          this.store.dispatch(new AUTH.SetAuthenticated());
          this.store.dispatch(new USER.SetUser({
            userId: user.uid,
            email: user.email
          }));
        } else {
          this.store.dispatch(new USER.SetUser(null));
          this.store.dispatch(new AUTH.SetUnAuthenticated());
        }
      }, (error) => this.baseError(error));
  }

  registerUser(userAuth: UserAuth) {
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.auth.createUserWithEmailAndPassword(
      userAuth.email,
      userAuth.password
    ).then((user) => {
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      this.baseError(error);
    });
  }

  login(userAuth: UserAuth) {
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.auth.signInWithEmailAndPassword(
      userAuth.email,
      userAuth.password
    ).then(() => {
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      this.baseError(error);
    });
  }

  logout() {
    this.store.dispatch(new USER.SetUser(null));
    this.store.dispatch(new AUTH.SetUnAuthenticated());
    this.afAuth.auth.signOut();
  }
}
