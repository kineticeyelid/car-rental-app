import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {CarFormValues} from '../shared/models/car';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createCar(car: CarFormValues) {
    return this.http.post(this.baseUrl + 'cars', car);
  }

  updateCar(car: CarFormValues, id: number) {
    return this.http.put(this.baseUrl + 'cars/' + id, car);
  }

  deleteCar(id: number) {
    return this.http.delete(this.baseUrl + 'cars/' + id);
  }
}