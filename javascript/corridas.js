window.onload = init;

const monthIndexToName = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'ago',
  'set',
  'out',
  'nov',
  'dez'
]

let sorted = "id";
let method = "ascending";

function init(e) {
  renderTableContent();

  $("th.sortable")
    .click((ev) => {
      if (ev.target.id === sorted) {
        method = method === "ascending" ? "descending" : "ascending"
      } else {
        sorted = ev.target.id;
        method = "descending";
      }
      sort();
    });
}

function renderTableContent() {
  const tableBody = document.querySelector("#table-sort tbody");
  tableBody.innerHTML = "";
  corridas.forEach(corrida => {
    tableBody.appendChild(createTableRow(corrida));
  })
}

function createTableRow(corrida) {
  const tr = document.createElement("tr");
  Object.keys(corrida).forEach( h => {
    const td = document.createElement("td");
    if (h === "time") td.innerHTML = `${corrida[h]} min`;
    else if (h === "distance") td.innerHTML = `${corrida[h]} km`;
    else if (h === "date") {
      const date = new Date(corrida.date);
      td.innerHTML = `${date.getDate()}/${monthIndexToName[date.getMonth()]}/${date.getFullYear()}`
    } else td.innerHTML = `${corrida[h]}`;
    tr.appendChild(td);
  });

  const tdAcoes = document.createElement("td");
  const btnEditar = document.createElement("button");
  btnEditar.innerText = "Editar";
  const btnExcluir = document.createElement("button");
  btnExcluir.innerText = "Excluir";

  tdAcoes.appendChild(btnEditar);
  tdAcoes.appendChild(btnExcluir);

  tr.appendChild(tdAcoes);
  return tr;
}

function sort() {
  corridas.sort( (a,b) => {
    if (method === "ascending") {
      if (sorted === "date") {
        return new Date(a[sorted]).getTime() - new Date(b[sorted]).getTime()
      } else {
        return a[sorted] - b[sorted];
      }
    } else {
      if (sorted === "date") {
        return new Date(b[sorted]).getTime() - new Date(a[sorted]).getTime()
      } else {
        return b[sorted] - a[sorted];
      }
    }
  })
  renderTableContent();
}