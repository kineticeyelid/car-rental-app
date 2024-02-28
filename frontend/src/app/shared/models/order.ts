import { Address } from "./user";

export interface OrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: Address;
}

export interface Order {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shipToAddress: Address;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: OrderItem[];
    subtotal: number;
    total: number;
    status: string;
  }

  export interface OrderItem {
    carId: number;
    carName: string;
    pictureUrl: string;
    rentalPrice: number;
    rentDays: number;
  }