import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../shared/dialogs/login-dialog/login-dialog.component";
import {AuthService} from "../core/authentication.service";
import {RegisterDialogComponent} from "../shared/dialogs/register-dialog/register-dialog.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor() {
  }
}
