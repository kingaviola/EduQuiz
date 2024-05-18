import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: LoginModel = new LoginModel("", "");

  constructor(private accountService: AccountService, private router: Router) {
    console.log("logged in: ", accountService.isLoggedIn());
  }

  login() {
    console.log(this.user);
    this.accountService.login(this.user)
      .subscribe(resp => {
        console.log("Logged in succesfully! ", resp);
        console.log("logged in: ", this.accountService.isLoggedIn());
      },
      error => {
        console.log("Error happend during login: ", error);
      });
  }

  signUp() {
    this.router.navigate(['/registration']);
  }
}
