import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UiActions from '../ui.actions';
import { UIService } from '../ui.service';

@Injectable()
export class BaseService {
  public isAuth$: Observable<boolean>;

  constructor(
    protected uiService: UIService,
    protected store: Store<fromRoot.State>
  ) { }

  baseInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated).pipe(skipWhile(isAuthenticated => isAuthenticated));
  }

  baseError(error: Error, message: string = null) {
    console.log(error);
    this.store.dispatch(new UiActions.StopLoading());

    const errorMessage = message || error.message;
    this.uiService.showSnackBar(errorMessage, null);
  }
}
