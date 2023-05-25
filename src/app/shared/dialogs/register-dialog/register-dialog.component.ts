import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../../core/user.model";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordsMatchValidator} from "./validators/passwords-match.validator";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  viewPassword = false;
  repeatPassword: string;
  viewRepeatPassword = false;
  registrationForm: FormGroup;

  constructor(private auth: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    let fb = new FormBuilder();
    this.registrationForm = fb.group({
      username: new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
      repeatPassword: new FormControl("",[Validators.required])
    }, {
      validators: PasswordsMatchValidator()
    });
  }

  ngOnInit(): void {
  }

  toggleViewPassword() {
    this.viewPassword = !this.viewPassword;
  }

  toggleViewRepeatPassword() {
    this.viewRepeatPassword = !this.viewRepeatPassword;
  }

  register(): void{
    this.auth.register({username: this.username, email: this.email, password: this.password}).subscribe(
      () => {
        this.snackBar.open("User " + this.username + " created successfully!");
        this.dialog.closeAll();
      }
    );
  }

  getErrorMessage(formControlName: string): string {
    if(formControlName == "repeatPassword" && this.registrationForm.hasError("notMatching")) {
      return "The provided passwords do not match";
    }
    let errorMessages = {
      required: formControlName + " is required",
      minlength: formControlName + " must be at least 8 characters long",
      maxlength: formControlName + " cannot be longer than 32 characters",
      email: formControlName + " must have a valid email format",
    }
    let validationError = Object.keys(this.registrationForm.controls[formControlName].errors)[0];
    return errorMessages[validationError];
  }
}
