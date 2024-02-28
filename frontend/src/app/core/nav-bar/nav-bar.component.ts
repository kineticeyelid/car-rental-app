import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItem } from 'src/app/shared/models/basket';
import { User } from 'src/app/shared/models/user';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<Basket | null>; 
  currentUser$!: Observable<User | null>;
  isAdmin$!: Observable<boolean>;

  constructor(public basketService: BasketService, public accountService: AccountService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$.pipe(
      filter(basket => basket !== null)
    );

    this.currentUser$ = this.accountService.currentUser$.pipe(
      filter(user => user !== null)
    );

    this.isAdmin$ = this.accountService.isAdmin$;
  }

  getCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.rentDays, 0);
  }

}
