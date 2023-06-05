export function domInject(selector: string) {
  return function (target: any, propertyKey: string) { 
    
    console.log(
      `Modificando prototype ${target.constructor.name} e add getter para a propriedade ${propertyKey}`
    );

    let elemento: HTMLElement;

    const getter = function () {
      if (!elemento) {
        elemento = <HTMLElement>document.querySelector(selector);

        console.log(
          `Buscando elemento do DOM com o seletor ${selector} para injetar em ${propertyKey}`
        );
      }
      return elemento;
    };

    Object.defineProperty(target, propertyKey, { get: getter });
  };
}
