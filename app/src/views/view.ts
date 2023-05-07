import { tempoExecucao } from "../decorators/tempo-de-execucao.js";

export abstract class View<T> {
  protected elemento: HTMLElement;
  private escapar = false;

  constructor(seletor: string, escapar?: boolean) {
    const elemento = document.querySelector(seletor);

    if(elemento){
      this.elemento = elemento as HTMLElement;
    } else {
      throw Error (`Seletor ${elemento} não existe no DOM, verifique.`)
    }
    
    if(escapar){
      this.escapar = escapar;
    }
  }

  protected abstract template(model: T): string;

  @tempoExecucao()
 public update(model: T): void {
    let template = this.template(model);
    if(this.escapar){
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    this.elemento.innerHTML = template;
  }

}
