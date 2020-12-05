import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PageOfCarsComponent} from './cars/components/cars/page-of-cars/page-of-cars.component';
import {AdminViewComponent} from './cars/components/admin-view/admin-view.component';
import {RegistrationFormComponent} from './users/components/users/registration-form/registration-form.component';
import {LoginFormComponent} from './users/components/users/login-form/login-form.component';
import {PasswordResetFormComponent} from './users/components/users/password-reset-form/password-reset-form.component';

const APP_ROUTES: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'cars'},
  {path: 'cars', component: PageOfCarsComponent},
  {path: 'cars/**', component: PageOfCarsComponent},
  {path: 'admin', component: AdminViewComponent},
  {path: 'sign-in', component: LoginFormComponent},
  {path: 'sign-up', component: RegistrationFormComponent},
  {path: 'change-password/:token', component: PasswordResetFormComponent}
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
