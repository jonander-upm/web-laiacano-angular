import {LcProductItem} from "../../user/shop/shop.component";

export interface Order {
  shippingAddress: Address;
  billingAddress: Address;
  orderItems: OrderItem[];
}

export interface Address {
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  addressLine: string;
  additionalAddressLine: string;
  postcode: string;
  phoneNumber: string;
}

export interface OrderItem {
  productId: string;
  amount: number;
}

export interface LcOrderItem {
  product: LcProductItem;
  amount: number;
  total: number;
}
