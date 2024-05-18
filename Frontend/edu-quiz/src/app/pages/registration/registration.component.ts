import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationModel } from 'src/app/models/registration.model';
import { AccountService } from 'src/app/services/account.service';
import { passwordValidator } from 'src/app/shared/password-validator.directive';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  user: RegistrationModel = new RegistrationModel("", "", "", "");

  registrationForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder) { 
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]]
    });
  }

  signUp(){
    

    console.log(this.user);
    // this.accountService.register(this.user)
    //   .subscribe(resp => {
    //     console.log("Logged in succesfully! ", resp);
    //     console.log("logged in: ", this.accountService.isLoggedIn());
    //   },
    //   error => {
    //     console.log("Error happend during login: ", error);
    //   });
  }

  login() {
    this.router.navigate(['/login']);
  }


}
