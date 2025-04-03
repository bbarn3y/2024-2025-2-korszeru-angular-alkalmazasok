import {
  Component,
} from '@angular/core';
import {RouterService} from '@services/router.service';
import {UserService} from '@services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {CharacterCreatorComponent} from './character-creator/character-creator.component';

@Component({
  selector: 'app-lobby',
  standalone: false,
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.less'
})
export class LobbyComponent {
  language: 'en' | 'hu' = 'en';

  constructor(private modalService: NzModalService,
              public routerService: RouterService,
              public translateService: TranslateService,
              public userService: UserService) {
    // this.translateService.instant('LOBBY.LOGOUT')
  }

  openCharacterCreator() {
    this.modalService.create({
      nzTitle: 'Character creator',
      nzContent: CharacterCreatorComponent,
      nzFooter: null,
    });
  }

}
