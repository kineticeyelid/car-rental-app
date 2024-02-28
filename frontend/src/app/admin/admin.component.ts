import { Component, OnInit } from '@angular/core';
import {RentService} from '../rent/rent.service';
import {AdminService} from './admin.service';
import {ICar} from '../shared/models/car';
import {RentParams} from '../shared/models/rentParams';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  cars!: ICar[];
  totalCount!: number;
  rentParams: RentParams;

  constructor(private rentService: RentService, private adminService: AdminService) {
    this.rentParams = this.rentService.getRentParams();
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(useCache = false) {
    this.rentService.getCars(useCache).subscribe(response => {
      this.cars = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  onPageChanged(event: any) {
    const params = this.rentService.getRentParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.rentService.setRentParams(params);
      this.getCars(true);
    }
  }

  deleteCar(id: number) {
    this.adminService.deleteCar(id).subscribe((response: any) => {
      this.cars.splice(this.cars.findIndex(p => p.id === id), 1);
      this.totalCount--;
    });
  }
}