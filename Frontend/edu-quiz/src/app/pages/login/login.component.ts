import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: LoginModel = new LoginModel("", "");

  constructor(private accountService: AccountService, private router: Router, private userService: UserService) { }

  login() {
    console.log(this.user);
    this.accountService.login(this.user)
      .subscribe(resp => {
        this.accountService.setUserLoggedInStatus(true);
        this.userService.setUserId(resp);
        this.router.navigate(['/home']);
      },
      error => {
        console.log("Error happend during login: ", error);
      });
  }

  signUp() {
    this.router.navigate(['/registration']);
  }
}
