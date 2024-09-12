const chk = document.getElementById('chk'); 

// aplicar o tema
function applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'escuro') {
        document.body.classList.add('escuro');
        chk.checked = true; // ativa o checkbox se o tema escuro estiver ativado
    } else {
        document.body.classList.remove('escuro');
        chk.checked = false; // desativa o checkbox se o tema escuro n estiver ativado
    }
}

// adciona um evento para alterar o tema e salvar 
chk.addEventListener('change', () => {
    if (chk.checked) {
        document.body.classList.add('escuro');
        localStorage.setItem('theme', 'escuro');
    } else {
        document.body.classList.remove('escuro');
        localStorage.setItem('theme', 'claro');
    }
});

// aplica o tema quando a pagina carrega
document.addEventListener('DOMContentLoaded', applyTheme);
