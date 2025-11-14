// Scripts da Calculadora Científica

const display = document.getElementById("display");

/**
 * Adiciona um valor ao display
 * @param {string} input - Valor a ser adicionado
 */
function operar(input) {
    if (display.value === "Erro") {
        display.value = input;
    } else {
        display.value += input;
    }
}

/**
 * Limpa o display
 */
function limpaTela() {
    display.value = "";
}

/**
 * Deleta o último caractere do display
 */
function deletarUltimo() {
    display.value = display.value.slice(0, -1);
}

/**
 * Aplica funções matemáticas científicas
 * @param {string} funcao - Nome da função (sin, cos, tan, sqrt, quadrado, cubo)
 */
function aplicarFuncao(funcao) {
    const valor = display.value.trim();
    
    if (valor === "" || valor === "Erro") {
        display.value = "Erro";
        return;
    }

    try {
        let resultado;
        
        switch (funcao) {
            case 'sin':
                // Converte para radianos e calcula seno
                resultado = Math.sin(eval(valor) * Math.PI / 180);
                display.value = resultado.toFixed(6);
                break;
            
            case 'cos':
                // Converte para radianos e calcula cosseno
                resultado = Math.cos(eval(valor) * Math.PI / 180);
                display.value = resultado.toFixed(6);
                break;
            
            case 'tan':
                // Converte para radianos e calcula tangente
                resultado = Math.tan(eval(valor) * Math.PI / 180);
                display.value = resultado.toFixed(6);
                break;
            
            case 'sqrt':
                // Calcula raiz quadrada
                resultado = Math.sqrt(eval(valor));
                if (isNaN(resultado)) {
                    display.value = "Erro";
                } else {
                    display.value = resultado.toFixed(6);
                }
                break;
            
            case 'quadrado':
                // Eleva ao quadrado
                resultado = Math.pow(eval(valor), 2);
                display.value = resultado.toFixed(6);
                break;
            
            case 'cubo':
                // Eleva ao cubo
                resultado = Math.pow(eval(valor), 3);
                display.value = resultado.toFixed(6);
                break;
            
            default:
                display.value = "Erro";
        }
    } catch (error) {
        display.value = "Erro";
    }
}

/**
 * Calcula a expressão no display usando eval()
 */
function calcular() {
    try {
        // Substitui símbolos especiais pelos operadores padrão
        let expressao = display.value
            .replace(/×/g, '*')
            .replace(/−/g, '-')
            .replace(/÷/g, '/');
        
        // Avalia a expressão
        const resultado = eval(expressao);
        
        // Verifica se o resultado é válido
        if (isNaN(resultado) || !isFinite(resultado)) {
            display.value = "Erro";
        } else {
            // Formata o resultado com até 10 casas decimais
            display.value = parseFloat(resultado.toFixed(10));
        }
    } catch (error) {
        display.value = "Erro";
    }
}

/**
 * Suporte a teclado
 */
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Números
    if (key >= '0' && key <= '9') {
        operar(key);
    }
    // Operadores
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        operar(key);
    }
    // Ponto decimal
    else if (key === '.') {
        operar('.');
    }
    // Enter para calcular
    else if (key === 'Enter') {
        event.preventDefault();
        calcular();
    }
    // Backspace para deletar
    else if (key === 'Backspace') {
        event.preventDefault();
        deletarUltimo();
    }
    // Escape para limpar
    else if (key === 'Escape') {
        limpaTela();
    }
});
