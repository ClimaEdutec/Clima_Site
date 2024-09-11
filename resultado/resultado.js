import { trocarTema, verificarTema } from "../../helpers/tema-helper.js"

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const botaoJogarNovamente = document.querySelector("main button")


botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema)
})

botaoJogarNovamente.addEventListener("click", jogarNovamente)

verificarTema(body, botaoTema)

function inserirResultado(){
    const sectionPontuacao = document.querySelector(".pontuacao")
    const divAssunto = document.querySelector(".assunto")
    const pontos = localStorage.getItem("pontos")

    sectionPontuacao.innerHTML = `
                ${divAssunto.outerHTML}

                <strong>${pontos}</strong>
                <p>de 10</p>
    `
}
function jogarNovamente(){
    localStorage.removeItem("pontos")
    localStorage.removeItem("assunto")

    window.location.href = "../../index.html"
}

inserirResultado()