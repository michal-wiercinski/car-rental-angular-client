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
import {SharedModule} from './shared-module/shared.module';
import {NewCarFormComponent} from './cars/components/cars/forms-components/new-car-form/new-car-form.component';
import {EditCarFormComponent} from './cars/components/cars/forms-components/edit-car-form/edit-car-form.component';
import {authInterceptorProviders} from './interceptors/auth-interceptor.service';
import {ReactiveFormsModule} from '@angular/forms';
import {UserRoutingModule} from "./users/user-routing.module";
import {UserService} from "./services/user.service";
import {UsersModule} from "./users/users.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbPaginationModule,
    BrowserModule,
    HttpClientModule,
    CarsModule,
    UsersModule,
    CoreModule,
    AppRoutingModule,
    CarsRoutingModule,
    UserRoutingModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    CarsService,
    UserService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
