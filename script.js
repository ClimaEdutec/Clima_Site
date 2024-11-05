const chk = document.getElementById('chk'); 
const imgtema = document.getElementById('imgtema'); // Seleciona a imagem

// Função para aplicar o tema e atualizar a imagem
function applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'escuro') {
        document.body.classList.add('escuro');
        chk.checked = true; // Marca o checkbox se o tema escuro estiver ativado
        if (imgtema) {
            imgtema.src = './imgs/homeC.png'; // Imagem para o tema escuro
        }
    } else {
        document.body.classList.remove('escuro');
        chk.checked = false; // Desmarca o checkbox se o tema escuro não estiver ativado
        if (imgtema) {
            imgtema.src = './imgs/homeE.png'; // Imagem para o tema claro
        }
    }
}

// Adiciona um evento para alterar o tema e salvar a preferência
chk.addEventListener('change', () => {
    if (chk.checked) {
        document.body.classList.add('escuro');
        if (imgtema) {
            imgtema.src = './imgs/homeC.png'; // Imagem para o tema escuro
        }
        localStorage.setItem('theme', 'escuro');
    } else {
        document.body.classList.remove('escuro');
        if (imgtema) {
            imgtema.src = './imgs/homeE.png'; // Imagem para o tema claro
        }
        localStorage.setItem('theme', 'claro');
    }
});

// Aplica o tema e a imagem quando a página carrega
document.addEventListener('DOMContentLoaded', applyTheme);



