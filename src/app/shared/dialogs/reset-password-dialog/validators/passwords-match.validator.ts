import {AbstractControl, ValidatorFn} from "@angular/forms";

export function PasswordsMatchValidator(): ValidatorFn{
  return (formGroup: AbstractControl) => {
    const control = formGroup.get("password");
    const matchingControl = formGroup.get("repeatPassword");

    return (matchingControl?.value !== "" && control?.value !== matchingControl?.value)
        ? {notMatching: true}
        : null;
  }
}
