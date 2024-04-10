// Constantes de conversão
const valoresConversao = {
    real: { euro: 0.19, dolar: 0.20, simbolo: "R$" },
    dolar: { real: 4.99, euro: 0.92, simbolo: "US$" },
    euro: { real: 5.40, dolar: 1.08, simbolo: "€" }
};

// Elementos da página
const botaoAceitaMensagem = document.getElementById('botao-aceita-mensagem');
const mensagemUsuario = document.getElementById('mensagem-usuario');
const botaoInverter = document.getElementById("botao-inverter");
const botaoConverter = document.getElementById("botao-converter");
const botaoLimpar = document.getElementById("botao-limpar");
const valorUsuario = document.getElementById("valorEntrada");

// Verifica se a mensagem foi aceita
let itemFormLocalStorage = localStorage.getItem('aceitouMensagem');
if(itemFormLocalStorage === "1") {
    mensagemUsuario.style.display = 'none';
}

// Eventos
botaoAceitaMensagem.addEventListener('click', aceitaMensagem);
botaoInverter.addEventListener("click", inverter);
botaoConverter.addEventListener("click", converter);
botaoLimpar.addEventListener("click", limpar);
valorUsuario.addEventListener("keypress", manipulaTeclas);

// Funções
function aceitaMensagem() {
    localStorage.setItem('aceitouMensagem', "1");
    mensagemUsuario.style.display = 'none';
}

function manipulaTeclas(event) {
    if (event.ctrlKey) {
        switch (event.key) {
            case "L":
                event.preventDefault();
                limpar();
                break;
            case "I":
                event.preventDefault();
                inverter();
                break;
        }
    }

    if (event.key == "Enter") {
        event.preventDefault();
        converter();
    }
}

function converter() {
    let valor = valorUsuario.value;

    if (valor <= 0) {
        alert("Valor não suportado");
        return;
    }

    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;

    if (moeda1 == moeda2) {
        alert("As moedas são iguais !!");
        return;
    }

    let simbolo = valoresConversao[moeda2]["simbolo"];
    let resultado = valor * valoresConversao[moeda1][moeda2];

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = `${simbolo} ${resultado.toFixed(2)}`;
}

function limpar() {
    document.getElementById("resultado").textContent = "";
    valorUsuario.value = "";
}

function inverter() {
    let valorMoeda1 = document.getElementById("moeda1").value;
    let valorMoeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = valorMoeda2;
    document.getElementById("moeda2").value = valorMoeda1;
}
