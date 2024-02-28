import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { ICar } from 'src/app/shared/models/car';
import { BreadcrumbService } from 'xng-breadcrumb';
import { RentService } from '../rent.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  car?: ICar;
  rentDays = 1;
  rentDaysInBasket = 0;

  constructor(private rentService: RentService, private activatedRoute: ActivatedRoute, 
    private bcService: BreadcrumbService, private basketService: BasketService) {
      this.bcService.set('@carDetails', ' ')
    }

  ngOnInit(): void {
    this.loadcar();
  }

  loadcar() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.rentService.getCar(+id).subscribe({
      next: car => {
        this.car = car;
        this.bcService.set('@carDetails', car.name);
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: basket => {
            const item = basket?.items.find(x => x.id === +id);
            if (item) {
              this.rentDays = item.rentDays;
              this.rentDaysInBasket = item.rentDays;
            }
          }
        })
      },
      error: error => console.log(error)
    })
  }

  incrementRentDays() {
    this.rentDays++;
  }

  decrementRentDays() {
    this.rentDays--;
  }

  updateBasket() {
    if (this.car) {
      if (this.rentDays > this.rentDaysInBasket) {
        const itemsToAdd = this.rentDays - this.rentDaysInBasket;
        this.rentDaysInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.car, itemsToAdd);
      } else {
        const itemsToRemove = this.rentDaysInBasket - this.rentDays;
        this.rentDaysInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.car.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    return this.rentDaysInBasket === 0 ? 'Rent Car' : 'Update Rent Days';
  }

}