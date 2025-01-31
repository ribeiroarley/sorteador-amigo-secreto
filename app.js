// Array para armazenar os nomes dos amigos
let amigos = [];

// Adiciona um evento ao campo de texto, escutando a tecla "Enter" para adicionar um amigo
document.getElementById('amigo').addEventListener("keypress", function(event) {
    // Se a tecla pressionada for "Enter", chama a função para adicionar um amigo
    if (event.key === "Enter") {
        adicionarAmigo();
    }
});

// Função que adiciona um novo amigo à lista
function adicionarAmigo() {
    // Recupera o valor digitado no campo de input
    const nomeInput = document.getElementById('amigo');
    const nome = nomeInput.value.trim(); // Remove espaços extras

    // Verifica se o nome está vazio
    if (nome === "") {
        alert("Por favor, insira um nome válido."); // Exibe alerta se o campo estiver vazio
        return;
    }

    // Verifica se o nome já foi adicionado à lista de amigos
    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado!"); // Exibe alerta se o nome já estiver na lista
        return;
    }

    // Adiciona o nome à lista de amigos
    amigos.push(nome);
    nomeInput.value = ""; // Limpa o campo de input após adicionar o nome
    atualizarLista(); // Atualiza a lista exibida na tela
}

// Função que atualiza a lista de amigos na interface
function atualizarLista() {
    // Recupera o elemento que vai conter a lista de amigos
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ""; // Limpa a lista antes de atualizá-la

    // Itera sobre o array de amigos e cria um novo item na lista para cada nome
    amigos.forEach(nome => {
        const div = document.createElement('div'); // Cria um novo elemento de div
        div.textContent = nome; // Define o nome do amigo como o texto da div
        listaAmigos.appendChild(div); // Adiciona a div na lista
    });
}

// Função que sorteia um amigo secreto
function sortearAmigo() {
    // Verifica se a lista de amigos está vazia
    if (amigos.length === 0) {
        alert("A lista está vazia. Adicione nomes antes de sortear."); // Exibe alerta caso não haja amigos
        return;
    }

    // Gera um índice aleatório baseado no tamanho da lista de amigos
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);

    // Recupera o nome do amigo sorteado
    const nomeSorteado = amigos[indiceAleatorio];

    // Exibe o nome sorteado com um emoji de festa
    document.getElementById('resultado').innerHTML = `<strong>${nomeSorteado} 🎉</strong>`;

    // Remove o nome sorteado da lista para não sorteá-lo novamente
    amigos.splice(indiceAleatorio, 1);
    atualizarLista(); // Atualiza a lista de amigos na tela
}
