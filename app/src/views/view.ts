import { escapar } from "../decorators/escapar";
import { inspect } from "../decorators/inspect.js";
import { tempoExecucao } from "../decorators/tempo-de-execucao.js";

export abstract class View<T> {
  protected elemento: HTMLElement;
  

  constructor(seletor: string) {
    const elemento = document.querySelector(seletor);

    if(elemento){
      this.elemento = elemento as HTMLElement;
    } else {
      throw Error (`Seletor ${elemento} não existe no DOM, verifique.`)
    }
    
  }

  protected abstract template(model: T): string;

 
 public update(model: T): void {
    let template = this.template(model);
  
    this.elemento.innerHTML = template;
  }

}
