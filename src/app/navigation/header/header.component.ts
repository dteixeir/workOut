import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Route } from './../../model.index';
import { Routes } from '../../routes';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  routes: Route[] = Routes;
  isAuthenticated$: Observable<boolean>;
  @Output() emit = new EventEmitter<void>();

  constructor(
    private store: Store<fromRoot.State>
  ) {  }

  onEmit(): void {
    this.emit.emit();
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }
}
