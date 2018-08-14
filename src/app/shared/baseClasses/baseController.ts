import { Observable } from 'rxjs';
import { UIService } from '../ui.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';


@Injectable()
export class BaseController {
  public isLoading$: Observable<boolean>;

  constructor(
    protected store: Store<fromRoot.State>,
    protected uiService: UIService
  ) { }

  baseInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }
}
