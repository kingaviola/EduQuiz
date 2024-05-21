import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private accountService: AccountService, private cookieService: CookieService, private router: Router) {}

  logout() {
    this.accountService.logout()
      .subscribe(resp => {
        console.log("Logged out succesfully", resp);
        this.accountService.setUserLoggedInStatus(false);
        this.cookieService.delete("userId");
        this.router.navigate(["/login"]);
      }, error => {
        console.log("Error happened during logout: ", error);
      });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
