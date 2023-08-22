import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../../core/authentication.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  username: string;
  password: string;
  viewPassword = false;
  loginForm: FormGroup;

  readonly loginButtonText: string = 'Login';
  constructor(private auth: AuthService, private dialog: MatDialog) {
    let fb = new FormBuilder();
    this.loginForm = fb.group({
      username: new FormControl("",[],
      ),
      password: new FormControl("",[]
      ),
    });
  }

  login(): void {
    this.auth.login({username: this.username, password: this.password}).subscribe(
      () => this.dialog.closeAll()
    );
  }
}
