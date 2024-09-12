class Animais {
    constructor(especie, quantidade) {
        this.especie = especie;
        this.quantidade = quantidade;
        
        switch (especie) {
            case 'LEAO':
            case 'LEOPARDO':
            case 'GAZELA':
                this.tamanho = especie === 'GAZELA' ? 2 : 3;
                this.bioma = 'savana';
                break;
            case 'CROCODILO':
                this.tamanho = 3;
                this.bioma = 'rio';
                break;
            case 'MACACO':
                this.tamanho = 1;
                this.bioma = 'savana ou floresta';
                break;
            case 'HIPOPOTAMO':
                this.tamanho = 4;
                this.bioma = 'savana ou rio';
                break;
            default:
                throw new Error("Animal inválido");
        }
    }
}