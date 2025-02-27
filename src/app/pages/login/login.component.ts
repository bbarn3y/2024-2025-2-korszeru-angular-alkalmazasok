import { Component } from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzFormModule} from 'ng-zorro-antd/form';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {RouterService} from '@services/router.service';
import {IconService} from '@ant-design/icons-angular';
import {LockOutline, UserOutline} from '@ant-design/icons-angular/icons';

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
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private iconService: IconService,
              private routerService: RouterService) {
    this.iconService.addIcon(LockOutline, UserOutline);
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }, {
      updateOn: 'blur'
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.routerService.routeToLobby();
    } else {
      Object.values(this.loginForm.controls).forEach((control: AbstractControl) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      })
    }
  }

}
