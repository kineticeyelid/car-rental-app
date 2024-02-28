import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICar } from '../shared/models/car';
import { RentService } from './rent.service';
import { Maker } from '../shared/models/maker';
import { RentParams } from '../shared/models/rentParams';
import { Model } from '../shared/models/model';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;
  cars:ICar[]=[];
  makers:Maker[]=[];
  models:Model[]=[];
  rentParams : RentParams;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ];
  totalCount = 0;

  constructor(private rentService : RentService){
    this.rentParams = rentService.getRentParams();
  }

  ngOnInit(): void {
    this.getCars();
    this.getMakers();
    this.getModels();
  }

  getCars() {
    this.rentService.getCars().subscribe({
      next: response => {
        this.cars = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  getMakers() {
    this.rentService.getMakers().subscribe({
      next: response => this.makers = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  getModels() {
    this.rentService.getModels().subscribe({
      next: response => this.models = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  onMakerSelected(makerId: number) {
    const params = this.rentService.getRentParams();
    params.makerId = makerId;
    params.pageNumber = 1;
    this.rentService.setRentParams(params);
    this.rentParams = params;
    this.getCars();
  }

  onModelSelected(modelId: number) {
    const params = this.rentService.getRentParams();
    params.modelId = modelId;
    params.pageNumber = 1;
    this.rentService.setRentParams(params);
    this.rentParams = params;
    this.getCars();
  }

  onSortSelected(event: any) {
    const params = this.rentService.getRentParams();
    params.sort = event.target.value;
    this.rentService.setRentParams(params);
    this.rentParams = params;
    this.getCars();
  }

  onPageChanged(event: any) {
    const params = this.rentService.getRentParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.rentService.setRentParams(params);
      this.rentParams = params;
      this.getCars();
    }
  }

  onSearch() {
    const params = this.rentService.getRentParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.rentService.setRentParams(params);
    this.rentParams = params;
    this.getCars();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.rentParams = new RentParams();
    this.rentService.setRentParams(this.rentParams);
    this.getCars();
  }

}
