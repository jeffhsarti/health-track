window.onload = (e) => {
  console.log('page is fully loaded');
  init();
};

function init() {
  const localStorageEmail = localStorage.getItem("healthtrack-credentials-email");
  const localStoragePass = localStorage.getItem("healthtrack-credentials-password");
  if (localStorageEmail && localStoragePass) {
    document.getElementById("form-input-email").value = atob(localStorage.getItem("healthtrack-credentials-email"));
    document.getElementById("form-input-senha").value = atob(localStorage.getItem("healthtrack-credentials-password"));
    document.getElementById("form-input-lembrar").checked = true;
  }

  document.getElementById("form-input-email").onchange = (e) => {
    validateEmail(e.target.value);
  }

  document.getElementById("form-input-senha").onchange = (e) => {
    validatePassword(e.target.value);
  }
  
  document.getElementById("form-login").onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("form-input-email").value;
    const senha = document.getElementById("form-input-senha").value;
    const lembrar = document.getElementById("form-input-lembrar").checked;
    if (validateEmail(email) && validatePassword(senha)) {
      if (lembrar) {
        localStorage.setItem("healthtrack-credentials-email", btoa(email));
        localStorage.setItem("healthtrack-credentials-password", btoa(senha));
      } else {
        localStorage.removeItem("healthtrack-credentials-email");
        localStorage.removeItem("healthtrack-credentials-password");
      }
      history.pushState({auth: true}, "", "dashboard/");
      history.go();
    }
  }
}

function validateEmail(value) {
  const inputEmail = document.getElementById("form-input-email");
  const rgxEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (rgxEmail.test(value)) {
    if (inputEmail.classList.contains("invalid")) {
      inputEmail.classList.remove("invalid");
      document.getElementById("form-input-email-help").innerHTML = "";
    }
    return true;
  } else {
    if (!inputEmail.classList.contains("invalid")) {
      inputEmail.classList.add("invalid");
      document.getElementById("form-input-email-help").innerHTML = "Email inválido.";
    }
    return false;
  }
}

function validatePassword(value) {
  const inputSenha = document.getElementById("form-input-senha");
  const rgxSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (rgxSenha.test(value) && value !== "") {
    if (inputSenha.classList.contains("invalid")) {
      inputSenha.classList.remove("invalid");
      document.getElementById("form-input-senha-help").innerHTML = "";
    }
    return true;
  } else {
    if (!inputSenha.classList.contains("invalid")) {
      inputSenha.classList.add("invalid");
      document.getElementById("form-input-senha-help").innerHTML = "Senha inválida. Sua senha deve conter no mínimo oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial";
    }
    return false;
  }
}