import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./user/home/home.component";
import {
  ResetPasswordDialogWrapperComponent
} from "./shared/dialogs/reset-password-dialog/wrapper/reset-password-dialog-wrapper.component";
import {ShopComponent} from "./user/shop/shop.component";
import {Route} from "./shared/enums/route";
import {ShoppingCartComponent} from "./user/shopping-cart/shopping-cart.component";
import {OrderSummaryComponent} from "./user/order-summary/order-summary.component";
import {OrdersComponent} from "./user/orders/orders.component";
import {PortfolioComponent} from "./user/portfolio/portfolio.component";

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
        filters: ['title', 'format'],
        showCart: true,
        hasId: false,
      } ,
    },
  },
  {
    path: Route.SHOPPING_CART,
    component: ShoppingCartComponent,
    data: {
      pageData: {
        title: 'Shopping Cart',
        filters: [],
        showCart: false,
        hasId: false,
      } ,
    },
  },
  {
    path: Route.ORDERS,
    component: OrdersComponent,
    data: {
      pageData: {
        title: 'Orders',
        filters: ['status'],
        showCart: true,
        hasId: false,
      }
    }
  },
  {
    path: Route.ORDER_SUMMARY,
    component: OrderSummaryComponent,
    data: {
      pageData: {
        title: 'Order',
        filters: [],
        showCart: true,
        hasId: true,
      }
    },
  },
  {
    path: Route.PORTFOLIO,
    component: PortfolioComponent,
    data: {
      pageData: {
        title: 'Portfolio',
        filters: ['title'],
        showCart: true,
        hasId: false,
      }
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
