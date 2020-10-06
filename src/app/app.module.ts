import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {CarsModule} from './cars/cars.module';
import {CarsService} from './services/cars.service';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core-module/core.module';
import {AppRoutingModule} from './app-routing.module';
import {CarsRoutingModule} from './cars/cars-routing.module';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminViewComponent} from './components/admin-view/admin-view.component';
import {SharedModule} from './shared-module/shared.module';
import {NewCarFormComponent} from './components/cars/forms-components/new-car-form/new-car-form.component';
import {EditCarFormComponent} from './components/cars/forms-components/edit-car-form/edit-car-form.component';
import {authInterceptorProviders} from './interceptors/auth-interceptor.service';
import { ProfileComponent } from './components/users/profile/profile.component';
import { NewRentalFormComponent } from './components/rentals/new-rental-form/new-rental-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminViewComponent,
    ProfileComponent,
    NewRentalFormComponent,
  ],
    imports: [
        NgbPaginationModule,
        BrowserModule,
        HttpClientModule,
        CarsModule,
        CoreModule,
        AppRoutingModule,
        CarsRoutingModule,
        NgbModule,
        SharedModule,
        ReactiveFormsModule,
    ],
  entryComponents: [
    NewCarFormComponent,
    EditCarFormComponent
  ],
  providers: [
    CarsService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
