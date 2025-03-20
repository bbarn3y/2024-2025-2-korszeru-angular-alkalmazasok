import {
  Component,
} from '@angular/core';
import {RouterService} from '@services/router.service';
import {UserService} from '@services/user.service';

@Component({
  selector: 'app-lobby',
  standalone: false,
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.less'
})
export class LobbyComponent {

  constructor(public routerService: RouterService,
              public userService: UserService) {}

}
