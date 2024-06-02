import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../../core/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EMPTY, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  username: string;
  password: string;
  loginError: boolean;
  loginForm: FormGroup;

  readonly loginButtonText: string = 'Login';
  constructor(private auth: AuthService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    let fb = new FormBuilder();
    this.loginForm = fb.group({
      username: new FormControl("",[Validators.required],
      ),
      password: new FormControl("",[Validators.required]
      ),
    });
  }

  login(): void {
    this.auth.login({username: this.username, password: this.password}).pipe(
      tap(() => this.dialog.closeAll()),
      catchError(() => {
        this.loginError = true;
        return EMPTY;
      })
    ).subscribe();
  }

  forgotPassword(): void {
    if(!this.username) {
      return;
    }
    this.auth.forgotPassword(this.username)
      .subscribe(() =>
        this.snackbar.open('A password renewal message has been sent. Please, check your email inbox.', '', {
          duration: 2000
        })
      );
  }

  register(): void {
    this.dialog.open(RegisterDialogComponent, {
      height: "fit-content",
      width: "400px",
      panelClass: "auth-dialog"
    });
  }
}
