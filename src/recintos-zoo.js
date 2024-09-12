class RecintosZoo {

    constructor(numero, bioma, tamanhoTotal, animaisExistentes) {
        this.numero = numero;
        this.bioma = bioma;
        this.tamanhoTotal = tamanhoTotal;
        this.animaisExistentes = animaisExistentes || [];  
        this.espacoDisponivel = tamanhoTotal - this.calculaEspacoOcupado();
    }

    calculaEspacoOcupado() {
        return this.animaisExistentes.reduce((espaco, animal) => espaco + animal.tamanho * animal.quantidade, 0);
    }

    verificaRecinto(animal) {
        if (!this.bioma.includes(animal.bioma.split(' ou ')[0])) {
            return false;
        }

        const espacoNecessario = animal.tamanho * animal.quantidade;
        if (this.espacoDisponivel < espacoNecessario) {
            return false;
        }

        if (animal.especie === 'HIPOPOTAMO') {
            const temOutrosAnimais = this.animaisExistentes.length > 0;
            if (temOutrosAnimais && this.bioma !== 'savana e rio') {
                return false;
            }
        }
        
        if (animal.especie === 'MACACO' && this.animaisExistentes.some(a => a.especie !== 'MACACO')) {
            return false;  
        }

        return true;
    }

    adicionarAnimal(animal) {
        if (this.verificaRecinto(animal)) {
            this.animaisExistentes.push(animal);
            this.espacoDisponivel -= animal.tamanho * animal.quantidade;
            return `Recinto ${this.numero} (espaço livre: ${this.espacoDisponivel} total: ${this.tamanhoTotal})`;
        } else {
            return null;
        }
    }
}

function alocarAnimais(tipoAnimal, quantidade) {
    const animal = new Animais(tipoAnimal, quantidade);

    const recintos = [
        new RecintosZoo(1, 'savana', 10, [{ especie: 'MACACO', tamanho: 1, quantidade: 3 }]),
        new RecintosZoo(2, 'floresta', 5, []),
        new RecintosZoo(3, 'savana e rio', 7, [{ especie: 'GAZELA', tamanho: 2, quantidade: 1 }]),
        new RecintosZoo(4, 'rio', 8, []),
        new RecintosZoo(5, 'savana', 9, [{ especie: 'LEAO', tamanho: 3, quantidade: 1 }])
    ];

    const recintosViaveis = recintos.map(recinto => recinto.adicionarAnimal(animal)).filter(r => r !== null);

    if (recintosViaveis.length === 0) {
        console.log("Não há recinto viável");
        return "Não há recinto viável";
    } else {
        console.log(recintosViaveis);
        return recintosViaveis;
    }
}

//Exemplo
alocarAnimais('HIPOPOTAMO', 2);