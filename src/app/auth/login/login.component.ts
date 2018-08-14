import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { BaseController, UIService } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent extends BaseController implements OnInit {
  constructor(
    private authService: AuthService,
    protected uiService: UIService,
    protected store: Store<fromRoot.State>
  ) {
    super(
      store,
      uiService
    );
  }

  ngOnInit(): void {
    this.baseInit();

    this.authService.logout();
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
