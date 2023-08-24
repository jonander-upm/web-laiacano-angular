import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../../core/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  username: string;
  password: string;
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
    this.auth.login({username: this.username, password: this.password}).subscribe(
      () => this.dialog.closeAll()
    );
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
}
