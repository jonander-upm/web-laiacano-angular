import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ResetPasswordDialogComponent} from "../reset-password-dialog.component";

@Component({
  selector: 'lc-reset-password-dialog-wrapper',
  templateUrl: './reset-password-dialog-wrapper.component.html'
})
export class ResetPasswordDialogWrapperComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    this.openDialog();
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent,
      {
        height: "fit-content",
        width: "475px",
        panelClass: "auth-dialog"
      });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
