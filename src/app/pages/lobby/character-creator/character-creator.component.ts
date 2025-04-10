import {Component, inject} from '@angular/core';
import {Character, CharacterClass} from '../../../_models/character';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterService} from '@services/character.service';
import {ValidatorService} from '@services/validator.service';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.less',
  standalone: false
})
export class CharacterCreatorComponent {

  protected readonly CharacterClass = CharacterClass;

  nzModalData: { character: Character } = inject(NZ_MODAL_DATA);

  characterForm: FormGroup;

  constructor(private characterService: CharacterService,
              private fb: FormBuilder,
              private nzModalRef: NzModalRef,
              private validatorService: ValidatorService) {
    this.characterForm = fb.group({
      name: [this?.nzModalData?.character ? this.nzModalData.character.name : '', [Validators.required, this.validatorService.twoWordsValidator ]],
      image: [this?.nzModalData?.character ? this.nzModalData.character.image : '', Validators.required],
      characterClass: [this?.nzModalData?.character ? this.nzModalData.character.characterClass : CharacterClass.MAGE, Validators.required],
      hp: [this?.nzModalData?.character ? this.nzModalData.character.maxHp : 1, [Validators.required, Validators.min(1), Validators.max(10)]]
    }, {
      updateOn: 'change',
      validators: [
        this.validatorService.maxHpByClassValidator
      ]
    });
  }

  createOrEditCharacter() {
    if (this.characterForm.valid) {
      const character = new Character(
        this.characterForm.get('name')?.value,
        this.characterForm.get('characterClass')?.value,
        this.characterForm.get('hp')?.value,
        this.characterForm.get('image')?.value,
      );
      if (this?.nzModalData?.character) {
        this.characterService.updateCharacter(this.nzModalData.character.id, character);
      } else {
        this.characterService.addCharacter(character);
      }
      this.nzModalRef.close();
    }
  }


}
