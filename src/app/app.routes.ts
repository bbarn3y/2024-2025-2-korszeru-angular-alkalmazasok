import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
