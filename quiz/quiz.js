document.addEventListener("DOMContentLoaded", () => {
    const botaoTema = document.querySelector(".theme-button");
    const dialog = document.querySelector(".dialogo");
    const overlay = document.querySelector(".sobreposicao");
    const botaoCancelar = document.querySelector(".cancelar");
    const botaoConfirmar = document.querySelector(".confirma");
    const buttonFechar = document.querySelector(".button");
    const body = document.querySelector('body');
    const questionsAnswered = document.getElementById("questionsAnswered");
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
    function openDialog() {
        overlay.classList.add("active");
        dialog.classList.add("active");
        document.getElementById('dialogMessage').innerText = `Você tem certeza que deseja sair e voltar para a página anterior? Você já respondeu ${perguntaAtual} de ${quizData.quizzes[0].questions.length} perguntas.`;
    }

    function closeDialog() {
        overlay.classList.remove("active");
        dialog.classList.remove("active");
    }

    function confirmExit() {
        window.location.href = "../index.html"; // Redireciona ao confirmar saída
    }

    buttonFechar.addEventListener("click", openDialog);
    botaoCancelar.addEventListener("click", closeDialog);
    botaoConfirmar.addEventListener("click", confirmExit);

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
                <button id="enviar">Enviar</button>
                <p>${perguntaAtual + 1}/${quiz.questions.length}</p>
                <button id="voltar">Voltar para Página Inicial</button>
            </section>
        `;

        document.getElementById('enviar').addEventListener('click', verificarResposta);
        document.getElementById('voltar').addEventListener('click', openDialog);

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
            questionsAnswered.value = perguntaAtual; // Atualiza o número de perguntas respondidas

            if (perguntaAtual < quiz.questions.length) {
                carregarPergunta();
            } else {
                mostrarResultado();
            }
        } else {
            alert("Selecione uma resposta!");
        }
    }


    function alterarImagemDeFundo() {
        const imagens = [
            '../imgs/quiz1.jpg', // Imagem de fundo para a primeira pergunta
            '../imgs/quiz2.jpg', // Imagem de fundo para a segunda pergunta
            // Adicione mais URLs de imagens conforme necessário
        ];

        const imagemAtual = imagens[Math.min(perguntaAtual, imagens.length - 1)];
        body.style.backgroundImage = `url(${imagemAtual})`;
    }
});