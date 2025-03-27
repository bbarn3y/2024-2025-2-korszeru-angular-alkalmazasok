import { Pipe, PipeTransform } from '@angular/core';
import {Character} from '../_models/character';

@Pipe({
  name: 'characterName',
  pure: true,
  standalone: false
})
export class CharacterNamePipe implements PipeTransform {

  transform(value: Character, separator: string = ',', ...args: unknown[]): unknown {
    if (value && value.name && value.name.split(' ').length === 2) {
      const splitName = value.name.split(' ');
      return `${splitName[1]}${separator} ${splitName[0]}`;
    }
    return value.name;
  }

}
