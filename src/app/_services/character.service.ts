import { Injectable } from '@angular/core';
import {Character} from '../_models/character';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  charactersStorageKey = 'characters';
  charactersChanged: Subject<Character[]> = new Subject();

  constructor() { }

  addCharacter(character: Character): void {
    const updatedCharacters = [...this.getCharacters(), character];
    this.saveCharacters(updatedCharacters);
  }

  getCharacters(): Character[] {
    const charactersString = localStorage.getItem(this.charactersStorageKey);
    return charactersString ? (JSON.parse(charactersString) as []) : [];
  }

  removeCharacter(id: string): void {
    this.saveCharacters(
      this.getCharacters().filter(c => c.id === id)
    );
  }

  updateCharacter(character: Character): void {
    const characterToModify = this.getCharacters().find(c => c.id === character.id);
    if (characterToModify) {
      this.saveCharacters(
        this.getCharacters().map(c => c.id === character.id ? character : c)
      )
    }
  }

  private saveCharacters(characters: Character[]): void {
    localStorage.setItem(this.charactersStorageKey, JSON.stringify(characters));
    this.charactersChanged.next(characters);
  }
}
