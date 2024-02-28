import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { ICar } from 'src/app/shared/models/car';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent {
  @Input() car?: ICar;


  constructor(private basketService: BasketService) {}

  addItemToBasket() {
    this.car && this.basketService.addItemToBasket(this.car);
  }
}
