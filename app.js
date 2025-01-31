let amigos = [];

document.getElementById('amigo').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarAmigo();
    }
});

function adicionarAmigo() {
    const nomeInput = document.getElementById('amigo');
    const nome = nomeInput.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    nomeInput.value = "";
    atualizarLista();
}

function atualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = "";

    amigos.forEach(nome => {
        const div = document.createElement('div');
        div.textContent = nome;
        listaAmigos.appendChild(div);
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("A lista está vazia. Adicione nomes antes de sortear.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const nomeSorteado = amigos[indiceAleatorio];

    document.getElementById('resultado').innerHTML = `<strong>${nomeSorteado} 🎉</strong>`;

    amigos.splice(indiceAleatorio, 1); // Remove o nome sorteado
    atualizarLista();
}
