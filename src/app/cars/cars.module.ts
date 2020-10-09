import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared-module/shared.module';
import {PageOfCarsComponent} from '../components/cars/page-of-cars/page-of-cars.component';
import {CarDetailsComponent} from '../components/cars/cars-details/car-details.component';
import {CarResolveService} from './car-resolve-service';
import {RouterModule} from '@angular/router';
import {NgbCarouselModule, NgbDropdownModule, NgbModule, NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdCarouselBasicComponent} from '../components/cars/ngbd-carousel-basic/ngbd-carousel-basic.component';
import {CarsFilterComponent} from '../components/cars/cars-filter/cars-filter.component';
import {TypeaheadCarsModelComponent} from '../components/cars/typeahead-cars-model/typeahead-cars-model.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TypeaheadLocationComponent} from '../components/cars/typeahead-location/typeahead-location.component';
import {NewCarFormComponent} from '../components/cars/forms-components/new-car-form/new-car-form.component';
import {EditCarFormComponent} from '../components/cars/forms-components/edit-car-form/edit-car-form.component';
import {RegistrationFormComponent} from '../components/users/registration-form/registration-form.component';
import {LoginFormComponent} from '../components/users/login-form/login-form.component';


@NgModule({
  declarations: [
    PageOfCarsComponent,
    CarDetailsComponent,
    NgbdCarouselBasicComponent,
    CarsFilterComponent,
    TypeaheadCarsModelComponent,
    TypeaheadLocationComponent,
    NewCarFormComponent,
    EditCarFormComponent,
    RegistrationFormComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    PageOfCarsComponent,
    CarsFilterComponent,
    NewCarFormComponent],
  providers: [
    CarResolveService
  ]
})
export class CarsModule {
}
