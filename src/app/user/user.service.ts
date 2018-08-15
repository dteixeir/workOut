import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { takeUntil, take, skipUntil, skipWhile, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { BaseService } from '../shared/shared.module';
import { UIService } from '../shared/ui.service';
import { User } from './user.model';

import * as fromRoot from '../app.reducer';
import { AppCollections } from '../app.constants';

@Injectable()
export class UserService extends BaseService {
  public hasUser$: Observable<User>;

  constructor(
    private db: AngularFirestore,
    protected uiService: UIService,
    protected store: Store<fromRoot.State>
  ) {
    super(uiService, store);

    this.baseInit();
  }

  checkForUser() {
    this.store.select(fromRoot.getUser)
      .pipe(
        skipUntil(this.store.select(fromRoot.getHasUser)),
        takeUntil(this.isAuth$)
      )
      .subscribe(user => {
        this.db.collection(AppCollections.USERS)
          .doc(user.userId)
          .snapshotChanges()
          .pipe(
            take(1),
            takeUntil(this.isAuth$)
          )
          .subscribe(data => {
            if (!data.payload.exists) {
              this.createUserEntity(user);
            }
          }, (error) => this.baseError(error));
      }, (error) => this.baseError(error));
  }

  createUserEntity(user: User) {
    this.db.doc(`users/${user.userId}`).set({
      userId: user.userId,
      email: user.email
    });
  }
}
