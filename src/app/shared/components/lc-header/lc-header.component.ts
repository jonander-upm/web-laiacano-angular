import { Component, OnInit } from '@angular/core';
import {LoginDialogComponent} from "../../dialogs/login-dialog/login-dialog.component";
import {RegisterDialogComponent} from "../../dialogs/register-dialog/register-dialog.component";
import {AuthService} from "../../../core/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {Route} from "../../enums/route";

@Component({
  selector: 'lc-header',
  templateUrl: './lc-header.component.html',
  styleUrls: ['./lc-header.component.scss']
})
export class LcHeaderComponent implements OnInit {
  username = undefined;
  readonly Route = Route;

  constructor(private auth: AuthService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.dialog.open(LoginDialogComponent,
      {
        height: "fit-content",
        width: "400px",
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
        width: "400px",
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
