import { questoesFaceis, questoesMedias, questoesDificeis, questoesMuitoDificeis } from "./questoes.js";

window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const dificuldade = params.get("dificuldade");
    const modo = params.get("modo") || "1";

    let questoes = [];

    if (dificuldade === "facil") {
        questoes = questoesFaceis;
    } else if (dificuldade === "medio") {
        questoes = questoesMedias;
    } else if (dificuldade === "dificil") {
        questoes = questoesDificeis;
    } else if (dificuldade === "muitoDificil") {
        questoes = questoesMuitoDificeis;
    }

    main(questoes, modo);
});

function main(questoes, modo) {
    let indice = 0
    let acertos = 0

    vidas();

    if (modo === "1") {
        gerarQuestao(indice, acertos, questoes);
    } else {
        jogoMultiPlayer(questoes);
    }
}

function vidas() {
    const coracoes = document.getElementById("coracoes")
    for (let i = 0; i < 5; i++) {
        const coracao = document.createElement("img")
        coracao.src = "img/coracao.png"
        coracao.alt = "Coração"
        coracao.className = "coracao"
        coracao.classList.add("coracao")
        coracoes.appendChild(coracao)
    }
}

function pontos(acertos) {
    const pontos = document.getElementById("pontos-texto");
    pontos.textContent = `Pontos: ${acertos}`
}

function gerarQuestao(indice, acertos, questoes) {
    const indiceAtual = Math.floor(Math.random() * questoes.length)
    const questaoAtual = questoes.splice(indiceAtual, 1)[0]

    const questaoDiv = document.getElementById("questao")
    const alternativasDiv = document.getElementById("alternativas")
    const mensagemDiv = document.getElementById("mensagem")

    questaoDiv.innerHTML = ""
    alternativasDiv.innerHTML = ""
    mensagemDiv.innerHTML = ""

    pontos(acertos)

    const questaoConteudo = document.createElement("p")
    questaoConteudo.textContent = questaoAtual.pergunta
    questaoDiv.appendChild(questaoConteudo)

    for (let i = 0; i < questaoAtual.opcoes.length; i++) {
        const botao = document.createElement("button")
        botao.textContent = questaoAtual.opcoes[i]
        botao.addEventListener("click", () =>
            verificarQuestao(questaoAtual, acertos, botao, indice, questoes)
        )
        alternativasDiv.appendChild(botao)
    }
}

function verificarQuestao(questao, acertos, botao, indice, questoes) {
    const coracoes = document.getElementById("coracoes")

    if (botao.textContent === questao.correta) {
        botao.style.backgroundColor = "green"
        mensagemResposta(true)
        destacar(questao, botao, true)
        acertos++
    } else {
        botao.style.backgroundColor = "red"
        mensagemResposta(false)
        destacar(questao, botao, false)
        if (coracoes.children.length > 1) {
            coracoes.removeChild(coracoes.lastChild)
        } else {
            fimDeJogo()
            return;
        }
    }

    indice++

    if (indice < 15) {
        setTimeout(() => gerarQuestao(indice, acertos, questoes), 1000)
    } else {
        setTimeout(() => venceuJogo(acertos), 1000)
    }
}

function fimDeJogo() {
    const mainContainer = document.getElementById("container")
    const coracoes = document.getElementById("coracoes")

    coracoes.innerHTML = ""
    mainContainer.innerHTML = ""

    coracoes.style.height = "32px"
    mainContainer.style.fontSize = "clamp(2rem, 8vw, 7rem)"
    mainContainer.textContent = "Game Over!"
    setTimeout(() => window.location.reload(), 3000)
}

function venceuJogo(acertos) {
    const mainContainer = document.getElementById("container")

    pontos(acertos)

    mainContainer.innerHTML = ""

    mainContainer.id = "vencer-jogo"
    mainContainer.textContent = "Parabéns! Você completou o jogo!★"

    if (acertos === 15) {
        const mensagemPerfeito = document.createElement("div")
        mensagemPerfeito.id = "pontuacao-perfeita"
        mensagemPerfeito.textContent = "Incrível! Você acertou todas as questões! ♕"
        mainContainer.appendChild(mensagemPerfeito)
    }
}

function destacar(questao, botao, acerto) {
    const questaoDiv = document.getElementById("questao")
    questaoDiv.innerHTML = ""
    const resposta = document.createElement("p")

    if (acerto) {
        for (let i = 0; i < questao.pergunta.length; i++) {
            if (questao.pergunta[i] === "_") {
                const span = document.createElement("span")
                span.textContent = botao.textContent
                span.style.color = "green"
                span.style.fontWeight = "bold"
                resposta.appendChild(span)
            } else {
                resposta.appendChild(document.createTextNode(questao.pergunta[i]))
            }
        }
        questaoDiv.appendChild(resposta)
    } else {
        for (let i = 0; i < questao.pergunta.length; i++) {
            if (questao.pergunta[i] === "_") {
                const span = document.createElement("span")
                span.textContent = botao.textContent
                span.style.color = "red"
                span.style.fontWeight = "bold"
                resposta.appendChild(span)
            } else {
                resposta.appendChild(document.createTextNode(questao.pergunta[i]))
            }
        }
        questaoDiv.appendChild(resposta)
    }

}

function mensagemResposta(correta) {
    const container = document.getElementById("container")
    const mensagemDiv = document.getElementById("mensagem")

    const mensagem = document.createElement("p")
    
    if (correta) {
        mensagem.textContent = "Resposta Correta! ✅"
        mensagem.style.color = "green"
    } else {
        mensagem.textContent = "Resposta Errada! ❌"
        mensagem.style.color = "red"
    }
    mensagemDiv.appendChild(mensagem)
    container.appendChild(mensagemDiv)
}

function jogoMultiPlayer(questoes) {
    let jogadorAtual = 1
    let pontuacao = { 1: 0, 2: 0 }

    const dados = document.getElementById("dados");
    dados.innerHTML = ""

    const jogadorDiv = document.createElement("div");
    const pontuacaoDiv = document.createElement("div");
    const timerDiv = document.createElement("div");
    const containerDiv = document.getElementById("container")

    jogadorDiv.id = "jogador"
    pontuacaoDiv.id = "pontuacao"
    timerDiv.id = "timer"

    const tempoTexto = document.createElement("p");
    const jogadorTexto = document.createElement("p");
    const pontuacao1 = document.createElement("p");
    const pontuacao2 = document.createElement("p");

    pontuacao1.textContent = `P1: ${pontuacao[1]} Pontos`
    pontuacao2.textContent = `P2: ${pontuacao[2]} Pontos`

    pontuacao1.id = "p1"
    pontuacao2.id = "p2"

    jogadorTexto.textContent = `Jogador ${jogadorAtual}`;
    jogadorDiv.appendChild(jogadorTexto);
    pontuacaoDiv.appendChild(pontuacao1);
    pontuacaoDiv.appendChild(pontuacao2);
    timerDiv.appendChild(tempoTexto);
    dados.appendChild(jogadorDiv);
    dados.appendChild(pontuacaoDiv);
    containerDiv.prepend(timerDiv);

    contador(pontuacao, jogadorAtual, tempoTexto, jogadorTexto, questoes);
    gerarQuestaoMultiPlayer(pontuacao, jogadorAtual, questoes)
}

function contador(pontuacao, jogadorAtual, tempoTexto, jogadorTexto, questoes) {
    let tempoRestante = 60
    jogadorTexto.textContent = `Jogador ${jogadorAtual}`;
    tempoTexto.textContent = `${tempoRestante}s`
    
    const timer = setInterval(() => {
        tempoRestante--
        tempoTexto.textContent = `${tempoRestante}s`
        
        if (tempoRestante <= 0) {
            clearInterval(timer)
            
            if (jogadorAtual === 1) {
                alert("Tempo acabou! Agora é a vez do Jogador 2!");
                gerarQuestaoMultiPlayer(pontuacao, 2, questoes)
                contador(pontuacao, 2, tempoTexto, jogadorTexto, questoes);
            } else {
                finalizarPartidaMultiplayer(pontuacao);
                return
            }
        }
    }, 1000);
}

function gerarQuestaoMultiPlayer(pontuacao, jogadorAtual, questoes) {
    const indiceAtual = Math.floor(Math.random() * questoes.length)
    const questaoAtual = questoes.splice(indiceAtual, 1)[0]

    const questaoDiv = document.getElementById("questao")
    const alternativasDiv = document.getElementById("alternativas")
    const mensagemDiv = document.getElementById("mensagem")

    questaoDiv.innerHTML = ""
    alternativasDiv.innerHTML = ""
    mensagemDiv.innerHTML = ""

    const questaoConteudo = document.createElement("p")
    questaoConteudo.textContent = questaoAtual.pergunta
    questaoDiv.appendChild(questaoConteudo)

    for (let i = 0; i < questaoAtual.opcoes.length; i++) {
        const botao = document.createElement("button")
        botao.textContent = questaoAtual.opcoes[i]
        botao.addEventListener("click", () => {
            const pontuacaoTexto = document.getElementById(`p${jogadorAtual}`);
            if (botao.textContent === questaoAtual.correta) {

                pontuacaoTexto.textContent = `P${jogadorAtual}: ${pontuacao[jogadorAtual] += 3} Pontos`
                botao.style.backgroundColor = "green"
                destacar(questaoAtual, botao, true)
                mensagemResposta(true)
            } else {
                pontuacaoTexto.textContent = `P${jogadorAtual}: ${pontuacao[jogadorAtual] -= 1} Pontos`
                botao.style.backgroundColor = "red"
                destacar(questaoAtual, botao, false)
                mensagemResposta(false)
            }
            setTimeout(() => {
                if (jogadorAtual === 1) {
                    gerarQuestaoMultiPlayer(pontuacao, 1, questoes)
                } else {
                    gerarQuestaoMultiPlayer(pontuacao, 2, questoes)
                }
            }, 1000);
        })
        alternativasDiv.appendChild(botao)
    }
}

function finalizarPartidaMultiplayer(pontuacao) {
    const container = document.getElementById("container");
    const dados = document.getElementById("dados");

    container.innerHTML = ""
    dados.innerHTML = ""


    const resultadoDiv = document.createElement("div");
    const resultado = document.createElement("h1");
    const pontuacoesDiv = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    let vencedor = ""

    if (pontuacao[1] > pontuacao[2]) {
        vencedor = "Jogador 1 venceu! 🏆"
        p1.style.color = "gold"
    } else if (pontuacao[2] > pontuacao[1]) {
        vencedor = "Jogador 2 venceu! 🏆"
        p2.style.color = "gold"
    } else {
        vencedor = "Empate! 🤝"
        p1.style.color = "gold"
        p2.style.color = "gold"
    }

    resultadoDiv.id = "resultado"

    resultado.textContent = vencedor

    pontuacoesDiv.id = "pontuacao-final"

    p1.textContent = `P1: ${pontuacao[1]} Pontos`
    p2.textContent = `P2: ${pontuacao[2]} Pontos`

    pontuacoesDiv.appendChild(p1);
    pontuacoesDiv.appendChild(p2);
    resultadoDiv.appendChild(resultado);
    resultadoDiv.appendChild(pontuacoesDiv)
    container.appendChild(resultadoDiv);
}