import * as cuid from 'cuid';

export interface BasketItem {
    id: number;
    carName: string;
    rentalPrice: number;
    rentDays: number;
    pictureUrl: string;
    maker: string;
    model: string;
}

export interface Basket {
    id: string;
    items: BasketItem[];
}

export class Basket implements Basket {
    id = cuid();
    items: BasketItem[] = [];
}

export interface BasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}