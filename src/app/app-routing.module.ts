import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';

const APP_ROUTES: Route[] = [
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
