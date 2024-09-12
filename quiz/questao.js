document.addEventListener("DOMContentLoaded", () => {
    const botaoTema = document.querySelector(".theme-button");
    const dialog = document.querySelector(".dialogo");
    const overlay = document.querySelector(".sobreposicao");
    const botaoCancelar = document.querySelector(".cancelar");
    const botaoConfirmar = document.querySelector(".confirma");
    const buttonFechar = document.querySelector(".button");
    const body = document.querySelector('body');
    let perguntaAtual = 0;
    let respostasCorretas = 0;

    // JSON de exemplo com as perguntas e respostas
    const quizData = {
        "quizzes": [
            {
                "title": "FatoresClimaticos",
                "questions": [
                    {
                        "question": "Quais são os três principais fatores que influenciam o clima de uma região?",
                        "options": [
                            "Latitude, altitude e proximidade do mar",
                            "Temperatura, umidade e vento",
                            "Pressão atmosférica, radiação solar e precipitação",
                            "Velocidade do vento, pressão do ar e cobertura do solo"
                        ],
                        "answer": "Latitude, altitude e proximidade do mar"
                    },
                    {
                        "question": "Como a latitude afeta a temperatura e a precipitação?",
                        "options": [
                            "Aumenta a temperatura e a precipitação",
                            "Diminui a temperatura e a precipitação",
                            "Aumenta a temperatura e diminui a precipitação",
                            "Diminui a temperatura e aumenta a precipitação"
                        ],
                        "answer": "Diminui a temperatura e aumenta a precipitação"
                    },
                    {
                        "question": "Qual instrumento de medição está associado às seguintes unidades?",
                        "options": [
                            "Termômetro; graus Celsius e Fahrenheit",
                            "Barômetro; milibares e polegadas de mercúrio",
                            "Anemômetro; quilômetros por hora e nós",
                            "Higrômetro; porcentagem e gramas por metro cúbico"
                        ],
                        "answer": "Termômetro; graus Celsius e Fahrenheit"
                    },
                    {
                        "question": "Qual zona climática é caracterizada por temperaturas quentes o ano todo e chuvas?",
                        "options": [
                            "Equatorial",
                            "Tropical",
                            "Temperada",
                            "Polar"
                        ],
                        "answer": "Equatorial"
                    },
                    {
                        "question": "Em qual zona climática os verões são quentes e secos, enquanto os invernos são frios e úmidos?",
                        "options": [
                            "Mediterrânea",
                            "Continental",
                            "Subpolar"
                        ],
                        "answer": "Continental"
                    },
                    {
                        "question": "Qual zona climática tem invernos longos e frios e verões curtos e amenos?",
                        "options": [
                            "Temperada",
                            "Subpolar",
                            "Polar",
                            "Tropical"
                        ],
                        "answer": "Polar"
                    },
                    {
                        "question": "Qual elemento do clima é a quantidade de vapor de água no ar?",
                        "options": [
                            "Umidade",
                            "Temperatura",
                            "Precipitação"
                        ],
                        "answer": "Umidade"
                    },
                    {
                        "question": "Qual elemento do clima mede a velocidade do movimento do ar?",
                        "options": [
                            "Vento",
                            "Precipitação",
                            "Temperatura",
                            "Umidade"
                        ],
                        "answer": "Vento"
                    },
                    {
                        "question": "Qual elemento do clima se refere à forma como a luz solar atinge a superfície da Terra?",
                        "options": [
                            "Radiação solar",
                            "Temperatura",
                            "Umidade",
                            "Vento"
                        ],
                        "answer": "Radiação solar"
                    },
                    {
                        "question": "Qual é a principal causa das estações do ano na Terra?",
                        "options": [
                            "Inclinação do eixo da Terra",
                            "Proximidade ao Sol",
                            "Movimento de rotação da Terra",
                            "Rotação da Lua"
                        ],
                        "answer": "Inclinação do eixo da Terra"
                    }
                ]
            }
        ]
    };

    // Configura o tema ao carregar a página
    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("escuro");
    });

    // Funções do diálogo de confirmação
    buttonFechar.addEventListener("click", () => {
        overlay.classList.add("active");
        dialog.classList.add("active");
    });

    botaoCancelar.addEventListener("click", () => {
        overlay.classList.remove("active");
        dialog.classList.remove("active");
    });

    botaoConfirmar.addEventListener("click", () => {
        window.location.href = "../index.html"; // Redireciona ao confirmar saída
    });

    // Carregar pergunta inicial
    carregarPergunta();

    function carregarPergunta() {
        const quiz = quizData.quizzes[0];
        const pergunta = quiz.questions[perguntaAtual];

        const main = document.querySelector('main');
        main.innerHTML = `
            <section class="pergunta">
                <h2>${pergunta.question}</h2>
            </section>
            <section class="alternativas">
                <form action="">
                    ${pergunta.options.map((option, index) => `
                        <label for="alternativa_${index}">
                            <input type="radio" id="alternativa_${index}" name="alternativa" value="${option}">
                            <div>
                                <span>${String.fromCharCode(65 + index)}</span>
                                ${option}
                            </div>
                        </label>
                    `).join('')}
                </form>
                <button id="enviar" onclick="verificarResposta()">enviar</button>
                <p>${perguntaAtual + 1}/${quiz.questions.length}</p>
                <button id="voltar">voltar</button>
            </section>
        `;

        document.getElementById('enviar').addEventListener('click', verificarResposta);
        document.getElementById('voltar').addEventListener('click', () => {
            window.location.href = "../index.html";
        });

        // Alterar imagem de fundo de acordo com a pergunta
        alterarImagemDeFundo();
    }

    

    function verificarResposta() {
        const quiz = quizData.quizzes[0];
        const pergunta = quiz.questions[perguntaAtual];
        const selectedOption = document.querySelector('input[name="alternativa"]:checked');

        if (selectedOption) {
            const respostaSelecionada = selectedOption.value;
            if (respostaSelecionada === pergunta.answer) {
                respostasCorretas++;
            }

            perguntaAtual++;
            if (perguntaAtual < quiz.questions.length) {
                carregarPergunta();
            } else {
                mostrarResultado();
            }
        } else {
            alert("Selecione uma resposta!");
        }
    }

    function guardaResposta(evento){
        resposta = evento.target.value
        idInputResposta = evento.target.id
    
        const botaoEnviar = document.querySelector(".alternativas button")
        botaoEnviar.addEventListener("click",validarResposta)
    }
    
    
        function validarResposta(){
            const botaoEnviar = document.querySelector(".alternativas button")
            botaoEnviar.innerText = "Próxima"
            botaoEnviar.removeEventListener("click", validarResposta)
    
            if(pergunta === 10){
                botaoEnviar.innerText = "Finalizar"
                botaoEnviar.addEventListener("click", finalizar)
                window.location.href = "../resultado.html";
            }else{
                botaoEnviar.addEventListener("click", proximaPergunta)
            }
    
        
            if(resposta === quiz.questions[pergunta-1].answer){
                document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta")
                pontos = pontos + 1
            }else{
                document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id","errada")
                document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id","correta")
            }
            pergunta = pergunta + 1
        }

    function alterarImagemDeFundo() {
        const imagens = [
            'url(../imgs/quiz1.jpg)', // Imagem de fundo para a primeira pergunta
            'url(../imgs/quiz2.jpg)', // Imagem de fundo para a segunda pergunta
            'url(../imgs/quiz3.jpg)',
            'url(../imgs/quiz4.jpg)',
            'url(../imgs/quiz5.jpg)',
            'url(../imgs/quiz6.jpg)',
            'url(../imgs/quiz7.jpg)',
            'url(../imgs/quiz8.jpg)',
            'url(../imgs/quiz9.jpg)', 
            'url(../imgs/quiz10.jpg)'
            // Adicione mais URLs de imagens conforme necessário
        ];

        const imagemAtual = imagens[Math.min(perguntaAtual, imagens.length - 1)];
        body.style.backgroundImage = `url(${imagemAtual})`;
    }

    function finalizar(){
        localStorage.setItem("pontos", pontos)
    
        window.location.href = "../resultado/resultado.html"
    }
    
    function proximaPergunta(){
        montarPerguntas()
        adicionarEventoInputs()
    }
    
    function adicionarEventoInputs(){
        const inputsResposta  = document.querySelectorAll(".alternativas input")
        inputsResposta.forEach(input => {
            input.addEventListener("click", guardaResposta)
    
            if (input.value === quiz.questions[pergunta-1].answer) {
                respostasCorretas = input.id
            }
        })
    }

    

});
