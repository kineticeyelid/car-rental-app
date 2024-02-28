import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Maker } from '../shared/models/maker';
import { Pagination } from '../shared/models/pagination';
import { ICar } from '../shared/models/car';
import { RentParams } from '../shared/models/rentParams';
import { Model } from '../shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  baseUrl = 'https://localhost:5001/api/';
  cars: ICar[] = [];
  makers: Maker[] = [];
  models: Model[] = [];
  pagination?: Pagination<ICar[]>;
  rentParams = new RentParams();
  carCache = new Map<string, Pagination<ICar[]>>();

  constructor(private http: HttpClient) { }

  getCars(useCache = true): Observable<Pagination<ICar[]>> {

    if (!useCache) this.carCache = new Map();

    if (this.carCache.size > 0 && useCache) {
      if (this.carCache.has(Object.values(this.rentParams).join('-'))) {
        this.pagination = this.carCache.get(Object.values(this.rentParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.rentParams.makerId > 0) params = params.append('makerId', this.rentParams.makerId);
    if (this.rentParams.modelId) params = params.append('modelId', this.rentParams.modelId);
    params = params.append('sort', this.rentParams.sort);
    params = params.append('pageIndex', this.rentParams.pageNumber);
    params = params.append('pageSize', this.rentParams.pageSize);
    if (this.rentParams.search) params = params.append('search', this.rentParams.search);

    return this.http.get<Pagination<ICar[]>>(this.baseUrl + 'cars', {params}).pipe(
      map(response => {
        this.carCache.set(Object.values(this.rentParams).join('-'), response)
        this.pagination = response;
        return response;
      })
    )
  }

  setRentParams(params: RentParams) {
    this.rentParams = params;
  }

  getRentParams() {
    return this.rentParams;
  }

  getCar(id: number) {
    const car = [...this.carCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as ICar)

    if (Object.keys(car).length !== 0) return of(car);

    return this.http.get<ICar>(this.baseUrl + 'cars/' + id);
  }

  getMakers() {
    if (this.makers.length > 0) return of(this.makers);

    return this.http.get<Maker[]>(this.baseUrl + 'cars/makers').pipe(
      map(makers => this.makers = makers)
    );
  }

  getModels() {
    if (this.models.length > 0) return of(this.models);

    return this.http.get<Model[]>(this.baseUrl + 'cars/models').pipe(
      map(models => this.models = models)
    );
  }
}