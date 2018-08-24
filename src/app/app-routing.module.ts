import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import {PersonListComponent} from '@app/static/person-list/person-list.component';
import {AuthGuardService} from '@app/core';
import {LoginComponent} from '@app/core/auth/login/login.component';
import {RegisterComponent} from '@app/core/auth/register/register.component';
import {UserComponent} from '@app/core/auth/user/user.component';
import {UserResolver} from '@app/core/auth/user/user.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService], data: { title: 'anms.menu.login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'anms.menu.register' } },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}, data: { title: 'anms.menu.user' }},
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: 'examples',
    loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: 'list',
    component: PersonListComponent
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
