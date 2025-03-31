const formulario = document.getElementById("contateNosForm");
const mensagem = document.getElementById("mensagem");
const desenvolvimentoInputs = "input[name='desenvolvimento']:checked";
document.getElementById("whatsapp").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});


document
  .querySelector(".desenvolvimento")
  .addEventListener("click", mostrarCampoDeMensagem);

formulario.addEventListener("submit", manipuladorDeEnvio);

function mostrarCampoDeMensagem() {
  const inputSelecionado = document.querySelector(desenvolvimentoInputs);
  const valorSelecionado = inputSelecionado?.value;
  const container = document.querySelector(".mensagem__container");

  container.style.display = valorSelecionado === "outro" ? "block" : "none";
  console.log(container.style.display);
}

function manipuladorDeEnvio(event) {
  event.preventDefault();

  if (!formulario.checkValidity()) {
    return;
  }

  const nome = document.getElementById("nome").value.trim();
  const sobrenome = document.getElementById("sobrenome").value.trim();
  const email = document.getElementById("email").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const desenvolvimento = document.querySelector(desenvolvimentoInputs)?.value;
  const mensagemValor = mensagem.value.trim();

  const servico = {
    nome,
    sobrenome,
    email,
    whatsapp,
    desenvolvimento,
    mensagemValor
  };

  console.log(servico);
}
