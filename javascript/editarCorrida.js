window.onload = init;

function init(e) {
  document.getElementById("date").max = new Date().toJSON().split('T')[0];
  
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { id } = params;
  const corrida = getById(id);
  console.log(corrida);
  document.getElementById("date").value = corrida.date;
  document.getElementById("time").value = corrida.time;
  document.getElementById("dist").value = corrida.distance;
  $("#btn-update-corrida")
    .click((ev) => {
      const date = document.getElementById("date");
      const time = document.getElementById("time");
      const dist = document.getElementById("dist");
      try {
        const result = update({id: Number(id), date: date.value, time: Number(time.value), distance: Number(dist.value)});
        if (result) {
          createAlert("success");
          setTimeout(() => {
            document.getElementById("link-voltar").click();
          }, 2000)
        } else {
          createAlert("warning");
        }
      } catch (error) {
        console.log(error);
        createAlert("danger");
      }
    });
}

function createAlert(type) {
  const alertDiv = document.createElement("div");
  alertDiv.role = "alert";
  alertDiv.classList.add("alert","alert-success","alert-dismissible","fade", "show");

  if (type === "success") {
    alertDiv.classList.add("alert-success");
    alertDiv.innerHTML = "A corrida foi atualizada com sucesso!";
  } else if (type === "danger") {
    alertDiv.classList.add("alert-danger");
    alertDiv.innerHTML = "Ops! Tivemos uma falha interna e não pudemos adicionar sua corrida...";
  } else {
    alertDiv.classList.add("alert-warning");
    alertDiv.innerHTML = "Os dados da corrida são inválidos... Verifique-os e tente novamente!";
  }

  const alertCloseBtn = document.createElement("button");
  alertCloseBtn.type = "button";
  alertCloseBtn.classList.add("btn-close");
  alertCloseBtn.setAttribute("data-bs-dismiss", "alert");
  alertCloseBtn.ariaLabel = "Close";
  
  alertDiv.appendChild(alertCloseBtn);
  document.querySelector("section").insertBefore(alertDiv, document.querySelector(".table-responsive"));
  
}