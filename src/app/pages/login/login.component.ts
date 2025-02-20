import { Component } from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzFormModule} from 'ng-zorro-antd/form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  login() {

  }

}
