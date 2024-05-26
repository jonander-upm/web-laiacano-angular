import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./user/home/home.component";
import {
  ResetPasswordDialogWrapperComponent
} from "./shared/dialogs/reset-password-dialog/wrapper/reset-password-dialog-wrapper.component";
import {ShopComponent} from "./user/shop/shop.component";
import {Route} from "./shared/enums/route";
import {ShoppingCartComponent} from "./user/shopping-cart/shopping-cart.component";

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
      pageData: {
        title: 'Shop',
        hasFilters: true,
        showCart: true,
      } ,
    },
  },
  {
    path: Route.SHOPPING_CART,
    component: ShoppingCartComponent,
    data: {
      pageData: {
        title: 'Shopping Cart',
        hasFilters: false,
        showCart: false,
      } ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
