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

  const deveMostrar = valorSelecionado === "outro";
  container.style.display = deveMostrar ? "block" : "none";

  mensagem.required = deveMostrar;
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
  let mensagemValor = mensagem.value.trim();

  if (!mensagemValor) {
    switch (desenvolvimento) {
      case "site":
        mensagemValor =
          "Gostaria de criar um site e entender como podemos começar.";
        break;
      case "sistema":
        mensagemValor =
          "Gostaria de criar um sistema personalizado para meu negócio.";
        break;
      case "mobile":
        mensagemValor =
          "Quero desenvolver um aplicativo mobile. Podemos conversar?";
        break;
      default:
        mensagemValor = "Vamos conversar melhor sobre meu projeto!";
        break;
    }
  }

  enviarMensagemDeWhatsapp(nome, whatsapp, mensagemValor, desenvolvimento);

  enviarEmailFetch(
    nome + " " + sobrenome,
    email,
    mensagemValor
  );
}

function enviarEmailFetch(nome, email, mensagem) {
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
        alert("Email enviado com sucesso!");
      } else {
        throw new Error("Erro ao enviar o email.");
      }
    })
    .catch((error) => {
      console.error("Erro ao enviar o email:", error);
      alert("Ocorreu um erro ao enviar o email. Tente novamente mais tarde.");
    });
}

function enviarMensagemDeWhatsapp(
  nome,
  whatsap,
  mensagemValor
) {
  try {
    if (!nome || !whatsap) {
      throw new Error(
        "Informações obrigatórias para o WhatsApp não preenchidas."
      );
    }

    const texto = `Olá, meu nome é ${nome}, sou o Wallace. Estou interessado em fazer um orçamento. ${
      mensagemValor || "Vamos conversar!"
    }`;
    const url = `https://api.whatsapp.com/send?phone=${whatsap}&text=${encodeURIComponent(
      texto
    )}`;

    window.open(url, "_blank");
    formulario.reset();
  } catch (error) {
    console.error("Erro ao enviar mensagem pelo WhatsApp:", error);
    alert("Erro ao abrir o WhatsApp. Verifique os dados e tente novamente.");
  }
}
