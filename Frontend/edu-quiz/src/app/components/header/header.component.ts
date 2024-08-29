import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private accountService: AccountService, private userService: UserService, private router: Router) {}

  logout() {
    this.accountService.logout()
      .subscribe(resp => {
        this.accountService.setUserLoggedInStatus(false);
        this.userService.setUserId(-1);
        this.router.navigate(["/login"]);
      }, error => {
        console.log("Error happened during logout: ", error);
      });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
