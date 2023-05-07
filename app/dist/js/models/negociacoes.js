export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adicona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
    }
}
const negocioacoes = new Negociacoes();
