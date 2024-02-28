import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RentComponent } from './rent.component';
import { CarDetailsComponent } from './car-details/car-details.component';


const routes: Routes = [
  {path: '', component: RentComponent},
   {path: ':id', component: CarDetailsComponent,data: {breadcrumb: {alias: 'carDetails'}}},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RentRoutingModule { }