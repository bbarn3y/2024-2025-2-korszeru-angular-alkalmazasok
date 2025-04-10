import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Character} from '../../../_models/character';
import {CharacterNamePipe} from '../../../_pipes/character-name.pipe';
import {CharacterService} from '@services/character.service';
import {CharacterCreatorComponent} from '../character-creator/character-creator.component';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-character-card',
  standalone: false,
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.less'
})
export class CharacterCardComponent {
  @Input() character!: Character;

  @Output() characterSelected: EventEmitter<Character> = new EventEmitter<Character>();

  constructor(
    // private characterNamePipe: CharacterNamePipe
    public characterService: CharacterService,
    private modalService: NzModalService,
  ) {
    // this.characterNamePipe.transform(this.character, '/');
  }

  editCharacter() {
    this.modalService.create({
      nzTitle: 'Character editor',
      nzContent: CharacterCreatorComponent,
      nzData: {
        character: this.character
      },
      nzFooter: null,
    });
  }
}
