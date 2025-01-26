const formulario = document.getElementById("contateNosForm");

formulario.addEventListener("submit", manipuladorDeEnvio);

function manipuladorDeEnvio(event) {
  event.preventDefault();

  if (formulario.checkValidity()) {
    return;
  }

  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const email = document.getElementById("email").value;
  const sexo = document.querySelector("input[name='sexo']:checked")?.value;
  const mensagem = document.getElementById("mensagem").value;
  const consentimento = document.getElementById("consentimento")?.checked;

  console.log("Nome: ", nome);
  console.log("Sobrenome: ", sobrenome);
  console.log("Email: ", email);
  console.log("Sexo: ", sexo);
  console.log("Mensagem: ", mensagem);
  console.log("Consentimento: ", consentimento);
}
