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

  enviarMensagemDeWhatsapp(nome, desenvolvimento, mensagemValor);

  enviarEmailFetch(
    nome + " " + sobrenome,
    email,
    mensagemValor,
    desenvolvimento
  );
}

function enviarEmailFetch(nome, email, mensagem, desenvolvimento) {
  const url = "https://contact-me-api-ten.vercel.app/send-email";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: nome,
      email: email,
      message: mensagem ? mensagem : "Não foi preenchido"
    })
  })
    .then((response) => {
      if (response.ok) {
        console.log("Email enviado com sucesso!");
      } else {
        console.error("Erro ao enviar o email.");
      }
    })
    .catch((error) => {
      console.error("Error ao enviar o email:", error);
    });
}

function enviarMensagemDeWhatsapp(nome, desenvolvimento, mensagemValor) {
  const texto = `Olá, meu nome é ${nome}, sou o Wallace. Estou interessado em ${desenvolvimento}. Mensagem: ${mensagemValor}`;

  const url = `https://api.whatsapp.com/send?phone=5583999999999&text=${texto}`;

  window.open(url, "_blank");
  formulario.reset();
}
