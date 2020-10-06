import {Car} from './car';
import {User} from './user';

export interface Rental {
  id: number;
  car: Car;
  user: User;
  startDate: Date;
  endDate: Date;
  rentalCost: number;
  distance: number;
  isLimitedTime: boolean;
}
