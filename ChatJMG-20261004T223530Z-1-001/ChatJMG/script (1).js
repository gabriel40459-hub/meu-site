function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
        return false;

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    if (resto !== parseInt(cpf.charAt(9)))
        return false;

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    return resto === parseInt(cpf.charAt(10));
}

function verificarCPF() {
    const input = document.getElementById("cpf");
    const cpf = input.value.trim();

    if (cpf === "") return;

    const mensagens = document.getElementById("messages");

    mensagens.innerHTML += `
        <div class="user">${cpf}</div>
    `;

    const ehValido = validarCPF(cpf);
    const classe = ehValido ? "valido" : "invalido";
    const resposta = ehValido
        ? "Este CPF é Válido!"
        : "Este CPF é Inválido! Digite novamente.";

    mensagens.innerHTML += `
        <div class="bot ${classe}">${resposta}</div>
    `;

    input.value = "";
    mensagens.scrollTop = mensagens.scrollHeight;
}

document.getElementById("cpf").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        verificarCPF();
    }
});

//isso formata enquanto a pessoa digita exemplo:000.000.000-00
document.getElementById("cpf").addEventListener("input", function(event) {
    let valor = event.target.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    event.target.value = valor;
});