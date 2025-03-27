import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Character} from '../../../_models/character';
import {CharacterNamePipe} from '../../../_pipes/character-name.pipe';

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
  ) {
    // this.characterNamePipe.transform(this.character, '/');
  }
}
