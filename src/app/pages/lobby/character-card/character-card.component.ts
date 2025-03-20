import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Character} from '../../../_models/character';

@Component({
  selector: 'app-character-card',
  standalone: false,
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.less'
})
export class CharacterCardComponent {
  @Input() character!: Character;

  @Output() characterSelected: EventEmitter<Character> = new EventEmitter<Character>();
}
