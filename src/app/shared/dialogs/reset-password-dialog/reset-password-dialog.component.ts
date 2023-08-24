import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordsMatchValidator} from "./validators/passwords-match.validator";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {
  username?: string;
  token?: string;
  password: string;
  repeatPassword: string;
  resetPasswordForm: FormGroup;

  readonly resetPasswordButtonText: string = 'Reset password';

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar)
  {
    let fb = new FormBuilder();
    this.resetPasswordForm = fb.group({
      password: new FormControl("",[Validators.required, Validators.minLength(8),
        Validators.maxLength(32),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.$¡!%*¿?&=()#|<>\\-_])[A-Za-z\\d@.$¡!%*¿?&=()#|<>\\-_]{8,32}$")]
      ),
      repeatPassword: new FormControl("",[Validators.required])
    }, {
      validators: PasswordsMatchValidator()
    });
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.queryParams['username'];
    this.token = this.route.snapshot.queryParams['token'];
    if(!this.username || !this.token) {
      this.snackBar.open("Username or token not provided!", undefined, {duration: 2000});
      this.dialog.closeAll();
    }
  }

  resetPassword(): void{
    this.auth.resetPassword({username: this.username, token: this.token, password: this.password}).subscribe(
      () => {
        this.snackBar.open("Password updated successfully!", undefined, {duration: 2000});
        this.dialog.closeAll();
      }
    );
  }

  getErrorMessage(formControlName: string): string | undefined {
    if(!this.resetPasswordForm.controls[formControlName].errors) {
      return undefined;
    }
    if(formControlName == "repeatPassword" && this.resetPasswordForm.hasError("notMatching")) {
      return "The provided passwords do not match";
    }
    let validationError = Object.keys(this.resetPasswordForm.controls[formControlName].errors)[0];
    let errorMessages = {
      required: formControlName + " is required",
      minlength: formControlName + " must be at least 8 characters long",
      maxlength: formControlName + " cannot be longer than 32 characters",
      pattern: formControlName + " must contain uppercase and lowercase letters, a number and a special character"
    }
    return errorMessages[validationError];
  }
}
