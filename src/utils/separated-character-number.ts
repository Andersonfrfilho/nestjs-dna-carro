export function separatedCharacterNumber(phrase: string): (string | number)[] {
  const characters = phrase.split(/[\W\d]+/).join('');
  const numbers = phrase.split(/[^\d]+/).join('');
  return [characters, parseInt(numbers ?? '', 10)];
}
