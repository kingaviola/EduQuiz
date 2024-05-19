import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginModel } from 'src/app/models/login.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: LoginModel = new LoginModel("", "");

  constructor(private accountService: AccountService, private router: Router, private cookieService: CookieService) { }

  login() {
    console.log(this.user);
    this.accountService.login(this.user)
      .subscribe(resp => {
        this.accountService.setUserLoggedInStatus(true);
        this.cookieService.set("userId", resp.toString());
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
