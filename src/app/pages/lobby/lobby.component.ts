import {
  Component,
} from '@angular/core';
import {RouterService} from '@services/router.service';
import {UserService} from '@services/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-lobby',
  standalone: false,
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.less'
})
export class LobbyComponent {
  language: 'en' | 'hu' = 'en';

  constructor(public routerService: RouterService,
              public translateService: TranslateService,
              public userService: UserService) {
    // this.translateService.instant('LOBBY.LOGOUT')
  }

}
