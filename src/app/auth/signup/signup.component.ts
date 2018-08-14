import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { BaseController } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent extends BaseController implements OnInit {
  maxDate: Date;

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

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
