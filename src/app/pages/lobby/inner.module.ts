import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LobbyComponent} from './lobby.component';
import {CharacterCardComponent} from './character-card/character-card.component';
import {CharacterListingComponent} from './character-listing/character-listing.component';
import {RouterModule, Routes} from '@angular/router';
import {PageRoutes} from '@constants/pageRoutes';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {IconDefinition} from '@ant-design/icons-angular';
import {SelectOutline} from '@ant-design/icons-angular/icons';
import {SelectedDirective} from '../../_directives/selected.directive';

export const routes: Routes = [
  {
    path: '',
    component: LobbyComponent
  },
  {
    path: '**',
    redirectTo: `/${PageRoutes.lobby}`
  }
]

const icons: IconDefinition[] = [ SelectOutline];

const zorroModules = [
  NzButtonComponent,
  NzCardModule,
  NzIconModule.forChild(icons),
  NzInputModule,
];

@NgModule({
  declarations: [
    CharacterCardComponent,
    CharacterListingComponent,
    LobbyComponent,
    SelectedDirective
  ],
  imports: [
    ...zorroModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [

  ]
})
export class InnerModule { }
