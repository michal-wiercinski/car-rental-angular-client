import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {LoginFormComponent} from "./components/users/login-form/login-form.component";
import {RegistrationPageComponent} from "./components/users/registration-page/registration-page.component";
import {PasswordResetFormComponent} from "./components/password/password-reset-form/password-reset-form.component";

const USERS_ROUTES: Route[] = [
  {
    path: 'sign-in',
    component: LoginFormComponent
  },
  {
    path: 'sign-up',
    component: RegistrationPageComponent
  },
  {
    path: 'change-password/:token',
    component: PasswordResetFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(USERS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule {
}
