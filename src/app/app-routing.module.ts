import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./user/home/home.component";
import {
  ResetPasswordDialogWrapperComponent
} from "./shared/dialogs/reset-password-dialog/wrapper/reset-password-dialog-wrapper.component";
import {ShopComponent} from "./user/shop/shop.component";
import {Route} from "./shared/enums/route";

const routes: Routes = [
  {
    path: Route.HOME,
    component: HomeComponent,
    children: [{
      path: 'reset-password',
      component: ResetPasswordDialogWrapperComponent,
    }]
  },
  {
    path: Route.SHOP,
    component: ShopComponent,
    data: {
      subheaderData: {
        title: 'Shop',
        hasFilters: true,
      } ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
