import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordsMatchValidator} from "./validators/passwords-match.validator";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  registrationForm: FormGroup;

  readonly registerButtonText: string = 'Register';

  constructor(private auth: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    let fb = new FormBuilder();
    this.registrationForm = fb.group({
      username: new FormControl("",[Validators.required, Validators.minLength(8),
        Validators.maxLength(32)],
      ),
      email: new FormControl("",[Validators.required, Validators.email]),
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
  }

  register(): void{
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    this.auth.register({username: this.username, email: this.email, password: this.password}).subscribe(
      user => {
        this.snackBar.open("User " + this.username + " created successfully!", undefined, config);
        this.auth.login({
          username: this.username,
          password: this.password
        }).subscribe(() => {
          this.dialog.closeAll();
        });
      }
    );
  }

  getErrorMessage(formControlName: string): string | undefined {
    if(!this.registrationForm.controls[formControlName].errors) {
      return undefined;
    }
    if(formControlName == "repeatPassword" && this.registrationForm.hasError("notMatching")) {
      return "The provided passwords do not match";
    }
    let validationError = Object.keys(this.registrationForm.controls[formControlName].errors)[0];
    let errorMessages = {
      required: formControlName + " is required",
      minlength: formControlName + " must be at least 8 characters long",
      maxlength: formControlName + " cannot be longer than 32 characters",
      email: formControlName + " must have a valid email format",
      pattern: formControlName + " must contain uppercase and lowercase letters, a number and a special character"
    }
    return errorMessages[validationError];
  }
}
