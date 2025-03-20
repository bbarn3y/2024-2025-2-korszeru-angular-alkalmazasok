import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {PageRoutes} from './_constants/pageRoutes';
import {privateGuard} from './_guards/private.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `/${PageRoutes.login}`
  },
  {
    title: 'Login',
    path: PageRoutes.login,
    component: LoginComponent,
  },
  {
    title: 'Lobby',
    path: PageRoutes.lobby,
    loadChildren: () =>
      import('./pages/lobby/inner.module').then((m) => m.InnerModule),
    // component: LobbyComponent,
    canActivate: [privateGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
