import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./user/home/home.component";
import {
  ResetPasswordDialogWrapperComponent
} from "./shared/dialogs/reset-password-dialog/wrapper/reset-password-dialog-wrapper.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{
      path: 'reset-password',
      component: ResetPasswordDialogWrapperComponent,
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
