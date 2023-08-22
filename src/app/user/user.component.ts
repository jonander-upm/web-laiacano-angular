import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../shared/dialogs/login-dialog/login-dialog.component";
import {AuthService} from "../core/authentication.service";
import {RegisterDialogComponent} from "../shared/dialogs/register-dialog/register-dialog.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  username = undefined;

  constructor(private auth: AuthService, private dialog: MatDialog) {
  }

  login(): void {
    this.dialog.open(LoginDialogComponent,
      {
        height: "fit-content",
        width: "475px",
        panelClass: "auth-dialog"
      })
      .afterClosed()
      .subscribe(
        () => this.username = this.auth.getUsername()
      );
  }

  register(): void {
    this.dialog.open(RegisterDialogComponent,
      {
        height: "fit-content",
        width: "475px",
        panelClass: "auth-dialog"
      });
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
  }
}
