import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {filter, Observable, Subject, takeUntil, tap} from "rxjs";
import {LcOrderItem, ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Route} from "../../shared/enums/route";

@Component({
  selector: 'lc-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingCart') shoppingCartElement: ElementRef<HTMLElement>;

  readonly SHIPPING_ADDRESS_TITLE: string = 'Shipping Address';
  readonly BILLING_ADDRESS_TITLE: string = 'Billing Address';
  readonly CURRENCY_SYMBOL = '$';

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

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly shoppingCartService: ShoppingCartService) {
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

  handleCheckout() {
    if(this.shippingAddressForm.invalid || (!this.copyBillingAddress && this.billingAddressForm.invalid)) {
      this.shippingAddressForm.markAsDirty();
      this.billingAddressForm.markAsDirty();
      return;
    }

    // TODO Handle order creation
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
