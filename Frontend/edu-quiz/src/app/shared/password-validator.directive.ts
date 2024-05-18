import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
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
