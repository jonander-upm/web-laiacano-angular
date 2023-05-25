import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../shared/dialogs/login-dialog/login-dialog.component";
import {AuthService} from "../core/authentication.service";

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
        height: "330px",
        width: "360px",
        panelClass: "auth-dialog"
      })
      .afterClosed()
      .subscribe(
        () => this.username = this.auth.getUsername()
      )
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
  }
}
