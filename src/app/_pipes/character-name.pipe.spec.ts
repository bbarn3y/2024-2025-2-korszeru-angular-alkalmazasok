import { CharacterNamePipe } from './character-name.pipe';

describe('CharacterNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CharacterNamePipe();
    expect(pipe).toBeTruthy();
  });
});
