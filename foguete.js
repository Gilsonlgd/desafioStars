const duraçãoEtapa1 = 60;
const duraçãoEtapa2 = 60;
const duraçãoEtapa3 = 30;
//Capacidades dos compartimentos de combustível.
const capacidade1 = 200;
const capacidade2 = 500;
const capacidade3 = 1000;
//Acelerações
const aceleração1 = 6000 / duraçãoEtapa1; // + bonus do peso
const aceleração2 = 4000 / duraçãoEtapa2;
const aceleração3 = 30320 / duraçãoEtapa3;

// Contagem de tempo
let tempoDecorrido = 0;
let iniciou = false;

function Combustível(capacidade1, capacidade2, capacidade3) {
    // informação sobre ocupação dos compartimentos
    this.compartimento1 = capacidade1;
    this.compartimento2 = capacidade2;
    this.compartimento3 = capacidade3;
    // consumo por segundo
    const consEtapa1 = capacidade1 / duraçãoEtapa1;
    const consEtapa2 = capacidade2 / duraçãoEtapa2;
    const consEtapa3 = capacidade3 / duraçãoEtapa3;

    this.decrementa1 = function(){
        this.compartimento1 -= consComp1;
        //modifica label compartimento1;
    }
    this.decrementa2 = function(){
        this.compartimento2 -= consEtapa2;
        //modifica label compartimento2;
    }
    this.decrementa3 = function(){
        this.compartimento3 -= consEtapa3;
        //modifica label compartimento2;
    }
}

function Peso(pesoAtual){
    this.pesoAtual = pesoAtual;
    this.decrementaPeso = function(decremento){
        this.pesoAtual -= decremento;
    }
}

function Velocidade(){
    this.velocidadeAtual = 0;
    this.incrementaVel = function(incremento){
        this.velocidadeAtual += incremento;
    }
}

