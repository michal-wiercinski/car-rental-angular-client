import {CarParameter} from './car-parameter';
import {CarModel} from './car-model';
import {CarLocation} from './car-location';

export interface Car {
  id: number;
  registrationNumber: string;
  carStatus: string;
  carModel: CarModel;
  carParameter: CarParameter;
  location: CarLocation;
}
