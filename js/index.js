window.addEventListener("load", main);

function main() {
    const botaoMatematica = document.getElementById("botaoMatematica");
    botaoMatematica.addEventListener("click", selecionarDificuldade);
}

function selecionarDificuldade() {
    const principal = document.getElementById("principal");

    principal.innerHTML = ""
    principal.style.display = "flex"
    principal.style.flexDirection = "column"
    principal.style.alignItems = "center"

    const dificuldadesDiv = document.createElement("div")
    dificuldadesDiv.id = "opcoes";

    const titulo = document.createElement("h2")
    titulo.style.fontSize = "35px"
    titulo.textContent = "Selecione a Dificuldade:"
    dificuldadesDiv.appendChild(titulo)

    const facilBtn = document.createElement("button")
    facilBtn.textContent = "Fácil"
    facilBtn.addEventListener("click", () => selecionarModo("facil"))
    dificuldadesDiv.appendChild(facilBtn)

    const medioBtn = document.createElement("button")
    medioBtn.textContent = "Médio"
    medioBtn.addEventListener("click", () => selecionarModo("medio"))
    dificuldadesDiv.appendChild(medioBtn)

    const dificilBtn = document.createElement("button")
    dificilBtn.textContent = "Difícil"
    dificilBtn.addEventListener("click", () => selecionarModo("dificil"))
    dificuldadesDiv.appendChild(dificilBtn)

    const muitoDificilBtn = document.createElement("button")
    muitoDificilBtn.textContent = "Muito Difícil"
    muitoDificilBtn.addEventListener("click", () => selecionarModo("muitoDificil"))
    dificuldadesDiv.appendChild(muitoDificilBtn)

    principal.appendChild(dificuldadesDiv)

}

function selecionarModo(dificuldade) {
    const principal = document.getElementById("principal");

    principal.innerHTML = ""

    modosDiv = document.createElement("div")
    modosDiv.id = "opcoes"

    const titulo = document.createElement("h2")
    titulo.style.fontSize = "35px"
    titulo.textContent = "Selecione o modo:"
    modosDiv.appendChild(titulo)

    const botao1Jogador = document.createElement("button")
    botao1Jogador.textContent = "1 Jogador"
    botao1Jogador.addEventListener("click", () => iniciarJogo(dificuldade, "1"))
    modosDiv.appendChild(botao1Jogador)

    const botao2Jogadores = document.createElement("button")
    botao2Jogadores.textContent = "2 Jogadores"
    botao2Jogadores.addEventListener("click", () => iniciarJogo(dificuldade, "2"))
    modosDiv.appendChild(botao2Jogadores)

    principal.appendChild(modosDiv)
}

function iniciarJogo(dificuldade, modo) {
    window.location.href = `jogoMatematico.html?dificuldade=${dificuldade}&modo=${modo}`;
}