import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetectQueerService {

    private tipoDeViado: string[] = [
        'Gay', 'Muito Gay', 'Bissexual', 'Homem Trans', 'Mulher Trans', 'LGBTQIA + Porra toda', 'Chupadinha por diversão',
        'Transa com o anal', 'Suruba de pica mole', 'Sacolé de Nervo', 'levar pica de cavalo é pouco'
    ]

  constructor() {}

  getTipoDeViado(): string {
    const randomGay = Math.floor(Math.random() * this.tipoDeViado.length);
    return this.tipoDeViado[randomGay];
  }
}
