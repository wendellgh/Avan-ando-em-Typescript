export function domInject(selector) {
    return function (target, propertyKey) {
        console.log(`Modificando prototype ${target.constructor.name} e add getter para a propriedade ${propertyKey}`);
        let elemento;
        const getter = function () {
            if (!elemento) {
                elemento = document.querySelector(selector);
                console.log(`Buscando elemento do DOM com o seletor ${selector} para injetar em ${propertyKey}`);
            }
            return elemento;
        };
        Object.defineProperty(target, propertyKey, { get: getter });
    };
}
