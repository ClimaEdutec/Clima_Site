const questions = [
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
    }
]

let currentQuestionIndex = 0;
let score = 0;
let startTime = Date.now();
let interval;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// Função para atualizar o tempo
function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Tempo em segundos
    timerElement.textContent = `Tempo: ${elapsedTime}s`;
}

// Função para mudar o fundo conforme o progresso
function changeBackground() {
    const progress = (currentQuestionIndex / questions.length) * 100;

    if (progress < 10) {
        document.body.style.backgroundImage = "url('../imgs/quiz1.jpg')";
    } else if (progress < 20) {
        document.body.style.backgroundImage = "url('../imgs/quiz2.jpg')";
    } else if (progress < 30) {
        document.body.style.backgroundImage = "url('../imgs/quiz3.jpg')";
    } else if (progress < 40) {
        document.body.style.backgroundImage = "url('../imgs/quiz4.jpg')"; //falta essa img
    } else if (progress < 50) {
        document.body.style.backgroundImage = "url('../imgs/quiz5.jpg')";
    } else if (progress < 60) {
        document.body.style.backgroundImage = "url('../imgs/quiz6.jpg')";
    } else if (progress < 70) {
        document.body.style.backgroundImage = "url('../imgs/quiz7.jpg')";
    } else if (progress < 80) {
        document.body.style.backgroundImage = "url('../imgs/quiz8.jpg')";
    } else if (progress < 90) {
        document.body.style.backgroundImage = "url('../imgs/quiz9.jpg')";
    } else {
        document.body.style.backgroundImage = "url('../imgs/quiz10.jpg')";
    }
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
}


// Exibe a pergunta atual e as opções
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        // A função de verificação de resposta é chamada corretamente agora
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });

    changeBackground(); // Muda o fundo conforme o progresso
}

// Verifica a resposta e atualiza o score
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    // Verifica se a opção selecionada é a correta
    if (selectedOption === currentQuestion.answer) {
        score++;  // Incrementa o score caso a resposta esteja certa
    }

    // Atualiza o score na tela
    scoreElement.textContent = `Pontuação: ${score}`;

    currentQuestionIndex++;

    // Se ainda houver mais perguntas, exibe a próxima
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// Exibe o resultado final
function showResult() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    window.location.href = `resultado.html?score=${score}&time=${elapsedTime}`;
}

// Inicia o quiz e o timer
function startQuiz() {
    displayQuestion();
    interval = setInterval(updateTime, 1000); // Atualiza o tempo a cada segundo
}

startQuiz(); // Inicia o quiz
