import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateType',
})
export class TranslateTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'fire':
        return 'Fogo';
      case 'water':
        return 'Água';
      case 'grass':
        return 'Grama';
      case 'flying':
        return 'Voador';
      case 'fighting':
        return 'Lutador';
      case 'poison':
        return 'Venenoso';
      case 'electric':
        return 'Elétrico';
      case 'ground':
        return 'Terra';
      case 'rock':
        return 'Pedra';
      case 'psychic':
        return 'Psíquico';
      case 'ice':
        return 'Gelo';
      case 'bug':
        return 'Inseto';
      case 'ghost':
        return 'Fantasma';
      case 'steel':
        return 'Aço';
      case 'dragon':
        return 'Dragão';
      case 'dark':
        return 'Sombrio';
      case 'fairy':
        return 'Fada';
      default:
        return value;
    }
  }
}
