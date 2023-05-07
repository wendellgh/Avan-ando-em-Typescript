import { DiasdaSemana } from "../enuns/dias-da-semana";
import { Negociacao } from "../models/negociacao";
import { Negociacoes } from "../models/negociacoes";
import { MensagemView } from "../views/mensagem-view";
import { NegociacoesView } from "../views/negociacoes-view";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView", true);
        this.mensagemView = new MensagemView("#mensagemView");
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
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
