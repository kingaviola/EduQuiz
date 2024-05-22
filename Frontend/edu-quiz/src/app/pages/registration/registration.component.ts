import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationModel } from 'src/app/models/registration.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  user: RegistrationModel = new RegistrationModel("", "", "", "");

  registrationForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder, private userService: UserService) { 
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
    });
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const confirmValue = control.value;
    const passwordValue = this.registrationForm.get('password')?.value;
    if (!confirmValue || !passwordValue) {
      return null; 
    }

    return passwordValue !== confirmValue ? { passwordMismatch: true } : null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; 
    }
  
    const hasDigit = /\d/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNonAlphanumeric = /\W/.test(value);
    const minLength = value.length >= 8;
    const uniqueChars = new Set(value).size >= 3;
  
    const isValid = hasDigit && hasLower && hasUpper && hasNonAlphanumeric && minLength && uniqueChars;
  
    return isValid ? null : { passwordInvalid: true };
  }

  signUp(){
    if (this.registrationForm.valid) {
      this.user.name = this.registrationForm.get('name')?.value;
      this.user.userName = this.registrationForm.get('userName')?.value;
      this.user.email = this.registrationForm.get('email')?.value;
      this.user.password = this.registrationForm.get('password')?.value;
    }

    this.accountService.register(this.user)
      .subscribe(resp => {
        console.log("Registration is succesfull! ", resp);
        this.accountService.setUserLoggedInStatus(true);
        this.userService.setUserId(resp);
        this.router.navigate(['/home']);
      },
      error => {
        console.log("Error happend during registration: ", error);
      });
  }

  login() {
    this.router.navigate(['/login']);
  }


}
