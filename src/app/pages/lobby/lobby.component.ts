import {Component, ElementRef, ViewChild} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {Character, CharacterClass} from '../../_models/character';
import {CommonModule} from '@angular/common';
import {NzInputDirective, NzInputModule} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-lobby',
  imports: [
    CommonModule,
    NzCardModule,
    NzInputModule,
  ],
  standalone: true,
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.less'
})
export class LobbyComponent {
  @ViewChild('filterInput') filterInputEl!: ElementRef;

  characters: Character[] = this.generateCharacters();
  filteredCharacters: Character[] = [...this.characters];

  filterCharacters(query: string) {
    this.filteredCharacters = this.characters.filter((character) =>
      character.name.toLowerCase().includes(query.toLowerCase()));
  }

  generateCharacters(): Character[] {
    return [
      new Character('Mage Márton', CharacterClass.MAGE, 6, '/assets/characters/mage.webp'),
      new Character('Rogue Róbert', CharacterClass.ROGUE, 10, '/assets/characters/rogue.webp'),
      new Character('Shaman Sándor', CharacterClass.SHAMAN, 9),
    ];
  }

}
