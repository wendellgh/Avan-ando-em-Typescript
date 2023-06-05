var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInject } from "../decorators/dom-inject.js";
import { inspect } from "../decorators/inspect.js";
import { tempoExecucao } from "../decorators/tempo-de-execucao.js";
import { DiasdaSemana } from "../enuns/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../service/negociacoes-service.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView");
        this.mensagemView = new MensagemView("#mensagemView");
        this.negociacoesService = new NegociacoesService();
        this.negociacoesView.update(this.negociacoes);
    }
    adiconar() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.daysWeek(negociacao.data)) {
            this.mensagemView.update("As negociações só podem ser realizadas em dias úteis.");
            return;
        }
        this.negociacoes.adicona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }
    importaDados() {
        this.negociacoesService.obterNegociacoesDoDia()
            .then((negocioacoesDeHoje) => {
            for (let negocioacao of negocioacoesDeHoje) {
                this.negociacoes.adicona(negocioacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }
    daysWeek(data) {
        return (data.getDay() > DiasdaSemana.DOMINGO &&
            data.getDay() < DiasdaSemana.SABADO);
    }
    limparFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso!");
    }
}
__decorate([
    domInject("#data")
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInject("#quantidade")
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInject("#valor")
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    inspect,
    tempoExecucao()
], NegociacaoController.prototype, "adiconar", null);
