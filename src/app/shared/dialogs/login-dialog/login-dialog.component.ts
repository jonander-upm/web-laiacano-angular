import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../core/authentication.service";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  username: string;
  password: string;
  viewPassword = false;
  constructor(private auth: AuthService, private dialog: MatDialog) {
  }

  login(): void {
    this.auth.login({username: this.username, password: this.password}).subscribe(
      () => this.dialog.closeAll()
    );
  }

  toggleViewPassword(): void {
    this.viewPassword = !this.viewPassword;
  }
}
