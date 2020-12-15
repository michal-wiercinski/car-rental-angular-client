import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationPageComponent} from './components/users/registration-page/registration-page.component';
import {RegistrationFormComponent} from "./components/users/registration-form/registration-form.component";
import {LoginFormComponent} from "./components/users/login-form/login-form.component";
import {ProfileComponent} from "./components/users/profile/profile.component";
import {PasswordReminderFormComponent} from "./components/password/password-reminder-form/password-reminder-form.component";
import {PasswordResetFormComponent} from "./components/password/password-reset-form/password-reset-form.component";
import {PasswordUpdateFormComponent} from "./components/password/password-update-form/password-update-form.component";
import {ApiMessagePipe} from "../pipes/api-message.pipe";
import {SharedModule} from "../shared-module/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NgbCarouselModule,
  NgbDropdownModule,
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule
} from "@ng-bootstrap/ng-bootstrap";
import {UserResolveService} from "./user-resolve-service";


@NgModule({
  declarations: [
    RegistrationPageComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    ProfileComponent,
    PasswordReminderFormComponent,
    PasswordResetFormComponent,
    PasswordUpdateFormComponent,
    ApiMessagePipe
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
    RegistrationFormComponent
  ],
  providers: [
    UserResolveService
  ]
})
export class UsersModule {
}
