import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PageOfCarsComponent} from './components/cars/page-of-cars/page-of-cars.component';
import {AdminViewComponent} from './components/admin-view/admin-view.component';
import {RegistrationFormComponent} from './components/users/registration-form/registration-form.component';
import {LoginFormComponent} from './components/users/login-form/login-form.component';

const APP_ROUTES: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'cars'},
  {path: 'cars', component: PageOfCarsComponent},
  {path: 'cars/**', component: PageOfCarsComponent},
  {path: 'admin', component: AdminViewComponent},
  {path: 'sign-in', component: LoginFormComponent},
  {path: 'sign-up', component: RegistrationFormComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
