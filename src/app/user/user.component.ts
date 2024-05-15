import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../shared/dialogs/login-dialog/login-dialog.component";
import {AuthService} from "../core/authentication.service";
import {RegisterDialogComponent} from "../shared/dialogs/register-dialog/register-dialog.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {LcSubheaderData} from "../shared/components/lc-subheader/lc-subheader.component";
import {filter, flatMap, mergeMap, tap} from "rxjs";
import {map} from "rxjs/operators";
import {data} from "autoprefixer";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  subheaderData?: LcSubheaderData;
  showFilters: boolean = false;

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.handleRouterData();
  }

  private handleRouterData() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      mergeMap(() => this.activatedRoute.firstChild.data),
      tap(data => this.subheaderData = data['subheaderData']),
    ).subscribe();
  }

  toggleFilters(filtersShown: boolean): void {
    this.showFilters = filtersShown;
  }
}
