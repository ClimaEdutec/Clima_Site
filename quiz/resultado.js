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
    const pontos = localStorage.getItem("pontos")

    sectionPontuacao.innerHTML = `
                ${divAssunto.outerHTML}                

                <strong></strong>
                <p>${pontos} de 10</p>
    `
}
function jogarNovamente(){
    localStorage.removeItem("pontos")
    localStorage.removeItem("assunto")

    window.location.href = "../../index.html"
}

inserirResultado()



/*function mostrarResultado() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section>
            <h2>Resultado Final</h2>
            <p>Você acertou ${respostasCorretas} de ${quizData.quizzes[0].questions.length} perguntas.</p>
            <button id="reiniciar">Reiniciar Quiz</button>
            <button id="voltar">iívio</button>
        </section>
    `;

    document.getElementById('reiniciar').addEventListener('click', () => {
        perguntaAtual = 0;
        respostasCorretas = 0;
        questionsAnswered.value = 0; // Reinicia o número de perguntas respondidas
        carregarPergunta();
    });

    document.getElementById('voltar').addEventListener('click', openDialog);
}*/