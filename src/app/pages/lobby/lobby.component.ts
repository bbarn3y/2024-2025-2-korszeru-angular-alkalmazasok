import { Component } from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';

@Component({
  selector: 'app-lobby',
  imports: [
    NzCardModule
  ],
  standalone: true,
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.less'
})
export class LobbyComponent {

}
