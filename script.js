const formulario = document.getElementById("contateNosForm");

document.getElementById("whatsapp").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

formulario.addEventListener("submit", manipuladorDeEnvio);

function manipuladorDeEnvio(event) {
  event.preventDefault();

  if (!formulario.checkValidity()) {
    return;
  }

  const nome = document.getElementById("nome").value.trim();
  const sobrenome = document.getElementById("sobrenome").value.trim();
  const email = document.getElementById("email").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const desenvolvimento = document.querySelector("input[name='desenvolvimento']:checked")?.value;
  const mensagem = document.getElementById("mensagem").value.trim();

  const servico = {
    nome,
    sobrenome,
    email,
    whatsapp,
    desenvolvimento,
    mensagem,
  };

  console.log(servico);
}
