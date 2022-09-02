//Duração em segundos de cada etapa
const durEtap1 = 6;
const durEtap2 = 6;
const durEtap3 = 3;
//Capacidades dos compartimentos de combustivel.
const capacidade1 = 222;
const capacidade2 = 522;
const capacidade3 = 2000;
//Acelerações
const aceleração1 = 6000 / durEtap1; // + bonus do peso
const aceleração2 = 4000 / durEtap2;
const aceleração3 = 30320 / durEtap3;
const velocEscape = 40320;
//Peso inicial
const pesoInicial = 15432;
// Contagem de tempo
let tempoDecorrido = 0;
let propulsao = false;
let seconds = 0;
// Instanciamento dos Objetos
let combustivel = new Combustivel(capacidade1, capacidade2, capacidade3);
let peso = new Peso(pesoInicial);
let velocidade = new Velocidade();

function iniciaProp() {
    propulsao = true;
    let cancel = setInterval(incrementSeconds, 1000);
    let button = document.getElementById('ig-button');
    button.disabled = true;
}

function incrementSeconds() {
    seconds++;
    let el = document.getElementById('time');
    el.innerText = seconds + 's';
    let el1 = document.getElementById('avisos');

    if (propulsao === true) {
        if (seconds <= durEtap1) {
            combustivel.decrementa1();
            velocidade.incrementaVel(aceleração1);
            peso.decrementaPeso(capacidade1 / durEtap1);
            el1.innerText = "Primeira etapa do lançamento em andamento."
        } else if (seconds <= durEtap1 + durEtap2) {
            combustivel.decrementa2();
            velocidade.incrementaVel(aceleração2);
            peso.decrementaPeso(capacidade2 / durEtap2);
            el1.innerText = "Segunda etapa do lançamento em andamento."
        } else if (seconds <= durEtap1 + durEtap2 + durEtap3){
            combustivel.decrementa3();
            velocidade.incrementaVel(aceleração3);
            peso.decrementaPeso(capacidade3 / durEtap3);
            el1.innerText = "Terceira etapa do lançamento em andamento."
        } else {
            el1.innerText = "Fora da atmosfera da terra."
        }
    }
}
//método para incremetar na aceleração peso perdido;
function Combustivel(cap1, cap2, cap3) {
    // informação sobre ocupação dos compartimentos
    this.compartimento1 = new Number(cap1);
    this.compartimento2 = new Number(cap2);
    this.compartimento3 = new Number(cap3);
    // consumo por segundo
    const consEtapa1 = cap1 / durEtap1;
    const consEtapa2 = cap2 / durEtap2;
    const consEtapa3 = cap3 / durEtap3 / 3;

    this.decrementa1 = function(){
        this.compartimento1 -= consEtapa1;
        let el = document.getElementById('compartimento1');
        el.innerText = this.compartimento1.toFixed(2);
    }
    this.decrementa2 = function(){
        this.compartimento2 -= consEtapa2;
        let el = document.getElementById('compartimento2');
        el.innerText = this.compartimento2.toFixed(2);
    }
    this.decrementa3 = function(){
        this.compartimento3 -= consEtapa3;
        let el = document.getElementById('compartimento3');
        el.innerText = this.compartimento3.toFixed(2);
    }
}

function Peso(pesoAtual){
    this.pesoAtual = new Number(pesoAtual);
    
    this.decrementaPeso = function(decremento){
        this.pesoAtual -= decremento;
        let el = document.getElementById('peso');
        el.innerText = this.pesoAtual.toFixed(2);
    }
}

function Velocidade(){
    this.velocidadeAtual = new Number(0);

    this.incrementaVel = function(incremento){
        this.velocidadeAtual += incremento;
        let el = document.getElementById('velocidade');
        el.innerText = this.velocidadeAtual.toFixed(2) + ' Km/h';
    }
}


