import { Injectable } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {CharacterClass, CharacterClassDetails} from '../_models/character';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  maxHpByClassValidator = (group: FormGroup): ValidationErrors | null => {
    const characterClass: CharacterClass = group.get('characterClass')?.value;
    const maxHp: number = group.get('hp')?.value;
    if (characterClass && maxHp && maxHp > CharacterClassDetails[characterClass].maxHp) {
      return {
        invalidMaxHpForClass: true
      }
    } else {
      return null;
    }
  }

  twoWordsValidator = (control: FormControl): ValidationErrors | null  => {
    if (control.value && control.value.trim().split(' ').length < 2) {
      return {
        invalidWordCount: true,
      }
    } else {
      return null;
    }
  }
}
