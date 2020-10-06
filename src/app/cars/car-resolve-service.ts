import {CarsService} from '../services/cars.service';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Car} from '../models/car';
import {Injectable} from '@angular/core';

@Injectable()
export class CarResolveService implements Resolve<Car> {
  constructor(private carsService: CarsService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.carsService.getCar(route.params['id']);
  }

}
