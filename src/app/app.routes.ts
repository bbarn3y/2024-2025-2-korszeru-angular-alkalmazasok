import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {PageRoutes} from './_constants/pageRoutes';

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
    component: LobbyComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
