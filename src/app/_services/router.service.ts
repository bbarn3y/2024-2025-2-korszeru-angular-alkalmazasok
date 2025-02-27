import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {PageRoutes} from '@constants/pageRoutes';

@Injectable({
  providedIn: 'root' // Singleton service
})
export class RouterService {

  constructor(private router: Router) {}

  routeToLobby() {
    this.router.navigateByUrl(`/${PageRoutes.lobby}`);
  }

  routeToLogin() {
    this.router.navigateByUrl(`/${PageRoutes.login}`);
  }
}
