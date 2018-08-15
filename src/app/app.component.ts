import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.module';
import { UserService } from './user/user.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'angular6-redux';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.initAuthListner();
    this.userService.checkForUser();
  }
}
