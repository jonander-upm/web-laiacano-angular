import {LcProductItem} from "../../user/shop/shop.component";

export interface Order {
  id?: string;
  shippingAddress: Address;
  billingAddress: Address;
  orderItems: OrderItem[];
  status?: Status;
  price?: string;
  createdDate?: string;
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

export enum Status {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  READY_TO_SHIP = 'Ready to Ship',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}
