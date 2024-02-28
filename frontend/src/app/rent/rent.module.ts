import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentComponent } from './rent.component';
import { CarItemComponent } from './car-item/car-item.component';
import { SharedModule } from '../shared/shared.module';
import { CarDetailsComponent } from './car-details/car-details.component';
import { RouterModule } from '@angular/router';
import { RentRoutingModule } from './rent-routing.module';



@NgModule({
  declarations: [
    RentComponent,
    CarItemComponent,
    CarDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RentRoutingModule
  ],
  exports : [
    RentComponent
  ]
})
export class RentModule { }
