"use strict"
//Duração em segundos de cada etapa
const durEtap1 = 60;
const durEtap2 = 60;
const durEtap3 = 30;
const duracaoTotal = durEtap1 + durEtap2 + durEtap3;
const liberacaoSat = 5;
//Capacidades dos compartimentos de combustivel.
const capacidade1 = 222;
const capacidade2 = 522;
const capacidade3 = 1822;
//Acelerações médias em cada estágio
const aceleração1 = 6000 / durEtap1;
const aceleração2 = 4000 / durEtap2;
const aceleração3 = 30320 / durEtap3;
const velocEscape = 40320;
//Peso inicial
const pesoInicial = 30452.5;
// Contagem de tempo
let seconds = 0;
let propulsao = false;
// Instanciamento dos Objetos
let combustivel = new Combustivel(capacidade1, capacidade2, capacidade3);
let peso = new Peso(pesoInicial);
let velocidade = new Velocidade();

//Inicia o lançamento do foguete.
function iniciaLanc() {
    propulsao = true;
    setInterval(atualizaInfo, 1000);
    let botao = document.getElementById('ig-button');
    botao.disabled = true;
}

//Atualiza o painel de informações
function atualizaInfo() {
    seconds++;
    let el = document.getElementById('time');
    el.innerText = seconds + 's';
    let el1 = document.getElementById('avisos');

    consultaPropulsao();
    if (propulsao === true) {
        if (ehEtapa1()) {
            el1.innerText = "Primeira etapa do lançamento em andamento."
            combustivel.decrementa1();
            velocidade.incrementaVel(aceleração1);
            peso.decrementaPeso(combustivel.getConsEt1());
        } else if (ehEtapa2()) {
            el1.innerText = "Segunda etapa do lançamento em andamento."
            combustivel.decrementa2();
            velocidade.incrementaVel(aceleração2);
            peso.decrementaPeso(combustivel.getConsEt2());
        } else if (ehEtapa3()){
            propulsao = true;
            el1.innerText = "Terceira etapa do lançamento em andamento."
            combustivel.decrementa3();
            velocidade.incrementaVel(aceleração3);
            peso.decrementaPeso(combustivel.getConsEt3());
        } else if (seconds - duracaoTotal < liberacaoSat){
            el1.innerText = "Fora da atmosfera da terra. Liberando satélite..."
        } else {
            el1.innerText = "Satélite Liberado com sucesso."
        }
    } else {
        el1.innerText = "Falha na propulsão."
    }
}

//Atualiza a situação da propulsão de acordo com as etapas 1 e 2
function consultaPropulsao() {
    if (ehEtapa1()) {
        propulsao = true;
    } else if (ehEtapa2()) {
        confereCentelha();
    }
}
//confere se a centelha continua acesa durante o segundo estágio
function confereCentelha(){
    let botao1 = document.getElementById('etapa2-button');
    var intervalo;
    //confere se o botão está sendo clicado
    botao1.addEventListener("mousedown", function(e){
        if(e.buttons == 2){
            intervalo = setInterval(propulsao = true, 100);
        }
    });
    //confere se o o botão foi solto
    botao1.addEventListener("mouseup", function(){
        botao1.disabled = true;
        //se na etapa 2 parar de apertar o botão, foguete falha.
        if(ehEtapa2()) {
            propulsao = false;
        }
    });
}
//confere se está na etapa 1
function ehEtapa1(){
    if (seconds <= durEtap1) 
        return true;
    else 
        return false;
}
//confere se está na etapa 2
function ehEtapa2(){
    if (seconds <= durEtap1 + durEtap2 && seconds > durEtap1) 
        return true;
    else 
        return false
}
//confere se está na etapa 3
function ehEtapa3(){
    if (seconds <= duracaoTotal && seconds > durEtap1 + durEtap2)  
        return true;
    else 
        return false;
}

// Classes
function Combustivel(cap1, cap2, cap3) {
    // informação sobre ocupação dos compartimentos
    this.compartimento1 = new Number(cap1);
    this.compartimento2 = new Number(cap2);
    this.compartimento3 = new Number(cap3);
    // consumo por segundo
    const consEtapa1 = cap1 / durEtap1;
    const consEtapa2 = cap2 / durEtap2;
    const consEtapa3 = cap3 / durEtap3;

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
    this.getConsEt1 = function(){
        return consEtapa1;
    }
    this.getConsEt2 = function(){
        return consEtapa2;
    }
    this.getConsEt3 = function(){
        return consEtapa3;
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
    const vel = 420

    this.incrementaVel = function(incremento){
        this.velocidadeAtual += incremento;
        let el = document.getElementById('velocidade');
        el.innerText = this.velocidadeAtual.toFixed(2) + ' Km/h';
    }
}


