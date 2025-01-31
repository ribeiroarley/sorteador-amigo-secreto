let amigos = [];

function adicionarAmigo() {
    const nomeInput = document.getElementById('amigo');
    const nome = nomeInput.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado.");
        return;
    }

    amigos.push(nome);
    nomeInput.value = "";
    atualizarLista();
}

function atualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = "";

    amigos.forEach((nome, index) => {
        const div = document.createElement('div');
        div.textContent = nome;

        const btnRemover = document.createElement('button');
        btnRemover.textContent = "❌";
        btnRemover.classList.add("btn-remove");
        btnRemover.onclick = () => removerAmigo(index);

        div.appendChild(btnRemover);
        listaAmigos.appendChild(div);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("A lista está vazia. Adicione nomes antes de sortear.");
        return;
    }

    const nomeSorteado = amigos[Math.floor(Math.random() * amigos.length)];
    document.getElementById('resultado').textContent = nomeSorteado;
}
