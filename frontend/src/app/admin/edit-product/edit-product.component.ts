import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { RentService } from '../../rent/rent.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarFormValues } from '../../shared/models/car';
import { Maker } from '../../shared/models/maker';
import { Model } from '../../shared/models/model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  car: CarFormValues;
  makers: Maker[] = [];
  models: Model[] = [];

  constructor(
    private adminService: AdminService,
    private rentService: RentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.car = new CarFormValues();
  }

  ngOnInit(): void {
    const makers = this.getMakers();
    const models = this.getModels();

    forkJoin([makers, models]).subscribe(
      (results) => {
        this.makers = results[0];
        this.models = results[1];
      },
      (error) => {
        console.log(error);
      },
      () => {
        if (this.route.snapshot.url[0].path === 'edit') {
          this.loadCar();
        }
      }
    );
  }

  updateRentalPrice(event: any) {
    this.car.rentalPrice = event;
  }

  loadCar() {
    const carId = +this.route.snapshot.params['id'];
    if (this.makers && this.models) {
      this.rentService.getCar(carId).subscribe((response: any) => {
        const carMakerId = this.makers.find((x) => x.name === response.carMaker)?.id;
        const carModelId = this.models.find((x) => x.name === response.carModel)?.id;
        this.car = { ...response, carMakerId, carModelId };
      });
    }
  }

  getMakers() {
    return this.rentService.getMakers();
  }

  getModels() {
    return this.rentService.getModels();
  }

  onSubmit(car: CarFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedCar = { ...this.car, ...car, rentalPrice: +car.rentalPrice };
      const carId = +this.route.snapshot.params['id'];
      this.adminService.updateCar(updatedCar, carId).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    } else {
      const newCar = { ...car, rentalPrice: +car.rentalPrice };
      this.adminService.createCar(newCar).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
