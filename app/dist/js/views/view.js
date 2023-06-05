export class View {
    constructor(seletor) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`Seletor ${elemento} não existe no DOM, verifique.`);
        }
    }
    update(model) {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
