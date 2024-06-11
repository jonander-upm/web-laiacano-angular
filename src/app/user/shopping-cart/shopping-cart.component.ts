import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {filter, mergeMap, Observable, Subject, take, takeUntil, tap} from "rxjs";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Route} from "../../shared/enums/route";
import {AuthService} from "../../core/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../../shared/dialogs/login-dialog/login-dialog.component";
import {Address, LcOrderItem, OrderItem} from "../../shared/services/order.model";
import {OrderService} from "../../shared/services/order.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'lc-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingCart') shoppingCartElement: ElementRef<HTMLElement>;

  readonly SHIPPING_ADDRESS_TITLE: string = 'Shipping Address';
  readonly BILLING_ADDRESS_TITLE: string = 'Billing Address';
  readonly CURRENCY_SYMBOL = '$';
  readonly ORDER_SUMMARY_ROUTE: string = '/order'

  readonly shoppingCart$: Observable<LcOrderItem[]>;
  readonly shoppingCartTotalPrice$: Observable<number>;

  readonly shippingAddressForm: FormGroup = this.fb.group(
    {
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      postcode: [null, Validators.required],
      addressLine: [null, Validators.required],
      additionalAddressLine: null,
    }
  );
  readonly billingAddressForm: FormGroup = this.fb.group(
    {
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      postcode: [null, Validators.required],
      addressLine: [null, Validators.required],
      additionalAddressLine: null,
    },
    {updateOn: 'submit'}
  );

  copyBillingAddress: boolean = true;

  destroy$: Subject<void> = new Subject<void>();

  get authenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  constructor(private readonly auth: AuthService,
              private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly fb: FormBuilder,
              private readonly shoppingCartService: ShoppingCartService,
              private readonly orderService: OrderService) {
    this.shoppingCart$ = this.shoppingCartService.getShoppingCart();
    this.shoppingCartTotalPrice$ = this.shoppingCartService.getShoppingCartTotalPrice();
  }

  ngOnInit(): void {
    this.shoppingCartService.getShoppingCartItemNumber().pipe(
      filter(itemNum => !itemNum),
      tap(() => this.router.navigateByUrl(Route.SHOP)),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  toggleCopyBillingAddress(checked: boolean) {
    this.copyBillingAddress = checked;
  }

  removeFromCart(amount: number, item: LcOrderItem) {
    this.shoppingCartService.removeProductFromCart(item.product, amount);
  }

  addToCart(amount: number, item: LcOrderItem) {
    this.shoppingCartService.addProductToCart(item.product, amount);
  }

  handlePreCheckout() {
    if(!this.authenticated) {
      this.dialog.open(LoginDialogComponent, {
        height: "fit-content",
        width: "400px",
        panelClass: "auth-dialog"
      }).afterClosed().pipe(
        filter(() => this.authenticated),
        tap(() => this.validateAddressForm())
      ).subscribe()
    } else {
      this.validateAddressForm()
    }
  }

  private validateAddressForm() {
    if(this.shippingAddressForm.invalid || (!this.copyBillingAddress && this.billingAddressForm.invalid)) {
      this.shippingAddressForm.markAsDirty();
      this.billingAddressForm.markAsDirty();
      return;
    }

    this.checkout();
  }

  checkout() {
    // TODO Implement payment gateway
    this.createOrder()
  }

  private createOrder(): void {
    const shippingAddress = this.mapAddress(this.shippingAddressForm);
    const billingAddress = this.copyBillingAddress
      ? shippingAddress
      : this.mapAddress(this.billingAddressForm);
    this.shoppingCart$.pipe(
      take(1),
      map(orderItems => this.mapOrderItems(orderItems)),
      map(orderItems => ({
        shippingAddress,
        billingAddress,
        orderItems
      })),
      mergeMap(order => this.orderService.createOrder(order)),
      tap(orderId => {
        this.shoppingCartService.emptyShoppingCart()
        return this.router.navigate([this.ORDER_SUMMARY_ROUTE, orderId]);
      }),
    ).subscribe();
  }

  private mapAddress(form: FormGroup): Address {
    const formControls = this.shippingAddressForm.controls;
    return {
      firstName: formControls['firstName'].value,
      lastName: formControls['lastName'].value,
      phoneNumber: formControls['phoneNumber'].value,
      country: formControls['country'].value,
      state: formControls['state'].value,
      city: formControls['city'].value,
      postcode: formControls['postcode'].value,
      addressLine: formControls['addressLine'].value,
      additionalAddressLine: formControls['additionalAddressLine'].value,
    };
  }

  private mapOrderItems(orderItems: LcOrderItem[]): OrderItem[] {
    return orderItems.map(orderItem => ({
      productId: orderItem.product.id,
      amount: orderItem.amount
    }));
  }

  getErrorMessage(formControlName: string, form: FormGroup): string | undefined {
    if(!form.controls[formControlName].errors) {
      return undefined;
    }

    let validationError = Object.keys(form.controls[formControlName].errors)[0];
    let errorMessages = {
      required: formControlName + " is required",
    }
    return errorMessages[validationError];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
