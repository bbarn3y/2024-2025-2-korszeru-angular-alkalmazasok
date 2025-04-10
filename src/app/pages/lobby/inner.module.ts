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
import {CharacterNamePipe} from '../../_pipes/character-name.pipe';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {CharacterCreatorComponent} from './character-creator/character-creator.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {KonvaComponent} from './konva/konva.component';

export const routes: Routes = [
  {
    path: '',
    component: LobbyComponent
  },
  {
    path: 'konva',
    component: KonvaComponent
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
  NzFormModule,
  NzIconModule.forChild(icons),
  NzInputModule,
  NzInputNumberModule,
  NzModalModule,
  NzPopconfirmModule,
  NzRadioModule,
  NzSelectModule
];

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    CharacterCardComponent,
    CharacterCreatorComponent,
    CharacterListingComponent,
    CharacterNamePipe,
    KonvaComponent,
    LobbyComponent,
    SelectedDirective
  ],
  imports: [
    ...zorroModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpClient]},
      defaultLanguage: 'en'
    })
  ],
  exports: [

  ]
})
export class InnerModule { }
