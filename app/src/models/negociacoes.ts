import { Negociacao } from "./negociacao";

export class Negociacoes {
  private negociacoes: Negociacao[] = [];

  constructor() {}

  public adicona(negociacao: Negociacao) {
    this.negociacoes.push(negociacao);
  }

  public lista(): readonly Negociacao[] {
    return this.negociacoes;
  }
}

const negocioacoes = new Negociacoes();
