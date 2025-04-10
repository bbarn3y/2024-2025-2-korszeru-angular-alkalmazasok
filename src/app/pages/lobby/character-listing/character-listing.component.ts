import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {debounceTime, fromEvent, map} from 'rxjs';
import {Character, CharacterClass, CharacterClassDetails} from '../../../_models/character';
import {CharacterService} from '@services/character.service';

@Component({
  selector: 'app-character-listing',
  standalone: false,
  templateUrl: './character-listing.component.html',
  styleUrl: './character-listing.component.less'
})
export class CharacterListingComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  @ViewChild('filterInput', { static: true } ) filterInputEl!: ElementRef<HTMLInputElement>;

  characters: Character[] = []; // this.generateCharacters();
  filteredCharacters: Character[] = [...this.characters];
  selectedCharacter?: Character;

  constructor(private characterService: CharacterService) {
    characterService.charactersChanged.subscribe((characters: Character[]) => {
      this.characters = characters;
      this.filterCharacters(this.filterInputEl.nativeElement.value);
    });
  }


  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit() {
    this.characters = this.characterService.getCharacters();
    this.filterCharacters(this.filterInputEl.nativeElement.value);
  }

  ngAfterViewInit() {
    fromEvent<Event>(this.filterInputEl.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        // @todo Check type!
        map((ev: Event) => (ev.target as HTMLInputElement)?.value.trim())
      )
      .subscribe((query: string)=> {
        this.filterCharacters(query)
      })
  }

  ngOnDestroy() {

  }

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


  protected readonly CharacterClassDetails = CharacterClassDetails;
}
