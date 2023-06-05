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
  @domInject("#data")
  private inputData: HTMLInputElement;
  @domInject("#quantidade")
  private inputQuantidade: HTMLInputElement;
  @domInject("#valor")
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private negociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @tempoExecucao()
  public adiconar(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.daysWeek(negociacao.data)) {
      this.mensagemView.update(
        "As negociações só podem ser realizadas em dias úteis."
      );
      return;
    }
    this.negociacoes.adicona(negociacao);
    this.limparFormulario();
    this.atualizaView();
  }

  public importaDados(): void {
    this.negociacoesService.obterNegociacoesDoDia()
    .then((negocioacoesDeHoje) => {
      for (let negocioacao of negocioacoesDeHoje) {
        this.negociacoes.adicona(negocioacao);
      }
      this.negociacoesView.update(this.negociacoes);
    });
  }

  private daysWeek(data: Date) {
    return (
      data.getDay() > DiasdaSemana.DOMINGO &&
      data.getDay() < DiasdaSemana.SABADO
    );
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso!");
  }
}
