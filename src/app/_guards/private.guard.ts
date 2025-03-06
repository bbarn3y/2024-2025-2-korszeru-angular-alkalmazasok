import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '@services/user.service';
import {RouterService} from '@services/router.service';

export const privateGuard: CanActivateFn = (route, state) => {
  const userIsLoggedIn = inject(UserService).isLoggedIn;
  if (!userIsLoggedIn) {
    inject(RouterService).routeToLogin();
  }
  return inject(UserService).isLoggedIn;
};
