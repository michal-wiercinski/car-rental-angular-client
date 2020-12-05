import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CarDetailsComponent} from './components/cars/cars-details/car-details.component';
import {CarResolveService} from './car-resolve-service';
import {PageOfCarsComponent} from './components/cars/page-of-cars/page-of-cars.component';
import {NewCarFormComponent} from './components/cars/forms-components/new-car-form/new-car-form.component';
import {EditCarFormComponent} from './components/cars/forms-components/edit-car-form/edit-car-form.component';
import {NewRentalFormComponent} from './components/rentals/new-rental-form/new-rental-form.component';
import {ProfileComponent} from '../users/components/users/profile/profile.component';
import {UserResolveService} from '../users/user-resolve-service';

const CARS_ROUTES: Route[] = [
  {
    path: 'cars/:id',
    component: CarDetailsComponent,
    resolve: {car: CarResolveService}
  },
  {
    path: 'new-car',
    component: NewCarFormComponent,
  },
  {
    path: 'edit-car/:id',
    component: EditCarFormComponent,
    resolve: {car: CarResolveService}
  },
  {
    path: 'new-rental/:id',
    component: NewRentalFormComponent,
    resolve: {car: CarResolveService}
  },
  {
    path: 'user-profile',
    component: ProfileComponent,
    resolve: {user: UserResolveService}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(CARS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class CarsRoutingModule {
}
