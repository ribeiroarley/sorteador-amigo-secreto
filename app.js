// Array para armazenar os nomes dos amigos
let amigos = [];
// Objeto para armazenar os resultados do sorteio ("quem tirou quem")
let resultadoSorteio = {};
// Array para acompanhar os nomes disponíveis para sorteio
let disponiveis = [];
// Variável para rastrear quem é o próximo a sortear
let proximoSorteador = null;
// Variável para controlar se o alerta inicial já foi exibido
let alertaParExibido = false;

// Adiciona evento de "Enter" ao campo de texto para adicionar amigos
document.getElementById('amigo').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarAmigo();
    }
});

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const nomeInput = document.getElementById('amigo');
    const nome = nomeInput.value.trim(); // Remove espaços extras

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    amigos.push(nome); // Adiciona o nome ao array
    nomeInput.value = ""; // Limpa o campo de input
    atualizarLista(); // Atualiza a lista na tela
    reiniciarSorteio(); // Reinicia o sorteio para refletir a nova lista

    // Exibe o alerta sobre números pares apenas na primeira adição
    if (!alertaParExibido && amigos.length === 1) {
        alert("Bem-vindo ao Amigo Secreto! Adicione um número par de participantes para sortear.");
        alertaParExibido = true;
    }
}

// Função para atualizar a lista de nomes disponíveis na interface
function atualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ""; // Limpa a lista atual
    disponiveis.forEach(nome => {
        const div = document.createElement('div');
        div.textContent = nome; // Adiciona o nome ao elemento
        listaAmigos.appendChild(div); // Adiciona o elemento à lista
    });
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    resultadoSorteio = {}; // Limpa os resultados anteriores
    disponiveis = [...amigos]; // Recarrega os nomes disponíveis
    proximoSorteador = amigos.length > 0 ? amigos[0] : null; // Define o primeiro como próximo sorteador
    atualizarLista(); // Atualiza a lista na tela
    // Define a regra fixa na caixa "Regras"
    document.getElementById('resultado').innerHTML = "O presente deve custar de R$ 100 a R$ 200 reais, tá bem? Vamos caprichar!";
}

// Função para realizar o sorteio de um amigo
function sortearAmigo() {
    // Verifica se o número de amigos é par
    if (amigos.length % 2 !== 0) {
        alert("O número de participantes deve ser par para sortear! Adicione ou remova nomes.");
        return;
    }

    if (amigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para sortear!");
        return;
    }

    // Inicializa no primeiro sorteio
    if (Object.keys(resultadoSorteio).length === 0 && disponiveis.length === 0) {
        disponiveis = [...amigos];
        proximoSorteador = amigos[0];
    }

    // Verifica se o sorteio terminou
    if (disponiveis.length === 0 || Object.keys(resultadoSorteio).length === amigos.length) {
        alert("Sorteio concluído! Todos já tiraram seus amigos secretos.");
        document.getElementById('resultado').innerHTML = "O presente deve custar de R$ 100 a R$ 200 reais, tá bem? Vamos caprichar!";
        return;
    }

    const sorteador = proximoSorteador; // Pega o sorteador atual
    let amigoSorteado;
    let tentativas = 0;
    const maxTentativas = 10;

    // Sorteia um amigo, evitando tirar a si mesmo ou criar ciclos diretos
    do {
        const indiceAleatorio = Math.floor(Math.random() * disponiveis.length);
        amigoSorteado = disponiveis[indiceAleatorio];
        tentativas++;
    } while (
        (amigoSorteado === sorteador || // Evita tirar a si mesmo
        (resultadoSorteio[amigoSorteado] === sorteador && disponiveis.length > 1)) && // Evita ciclo direto
        tentativas < maxTentativas
    );

    if (tentativas >= maxTentativas) {
        alert("Não foi possível sortear sem criar ciclos diretos. Tente reiniciar!");
        reiniciarSorteio();
        return;
    }

    // Registra o sorteio
    resultadoSorteio[sorteador] = amigoSorteado;
    // Remove o sorteado da lista de disponíveis
    disponiveis = disponiveis.filter(nome => nome !== amigoSorteado);
    atualizarLista();

    // Define o próximo sorteador como o amigo sorteado
    proximoSorteador = amigoSorteado;

    // Exibe o resultado apenas para o sorteador
    alert(`${sorteador}, você tirou: ${amigoSorteado} 🎉\nPróximo a sortear: ${proximoSorteador}`);

    // Mantém a regra fixa na caixa "Regras"
    document.getElementById('resultado').innerHTML = "O presente deve custar de R$ 100 a R$ 200 reais, tá bem? Vamos caprichar!";
}