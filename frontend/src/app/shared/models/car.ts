export interface ICar {
    id: number;
    name: string;
    isAvailable: string;
    rentalPrice: number;
    pictureUrl: string;
    carMaker: string;
    carModel: string;
  }
  
  export interface ICarToCreate {
  name: string;
  isAvailable: string;
  rentalPrice: number;
  pictureUrl: string;
  carMakerId: number;
  carModelId: number;
  }
  
  export class CarFormValues implements ICarToCreate {
  name = '';
  isAvailable = '';
  rentalPrice = 0;
  pictureUrl = '';
  carMakerId!: number;
  carModelId!: number;
  
  constructor(init?: CarFormValues) {
    Object.assign(this, init);
  }
  }