// Simulando um pequeno banco de dados para as corridas
const corridas = [
  {
    id: 1,
    date: "2021-01-03",
    time: 5,
    distance: 1.0
  },
  {
    id: 2,
    date: "2021-01-06",
    time: 7.8,
    distance: 1.5
  },
  {
    id: 3,
    date: "2021-01-09",
    time: 13.2,
    distance: 2.5
  },
  {
    id: 4,
    date: "2021-01-12",
    time: 13.4,
    distance: 2.5
  },
  {
    id: 5,
    date: "2021-01-15",
    time: 14.3,
    distance: 2.75
  },
  {
    id: 6,
    date: "2021-01-18",
    time: 15.2,
    distance: 3.0
  }
];

function getAll() {
  return corridas;
}

function getById(id) {
  const cIndex = corridas.findIndex((corrida) => corrida.id === id);
  if (cIndex > -1) {
    return corridas[cIndex];
  } else {
    return null;
  }
}

function update(corrida) {
  const currentCorridaIndex = corridas.findIndex((c) => c.id === corrida.id);
  if (currentCorridaIndex > -1) {
    corridas[currentCorridaIndex] = corrida;
    renderTableContent();
    return corridas[currentCorridaIndex];
  } else {
    return null;
  }
}

function deleteById(id) {
  const cIndex = corridas.findIndex((corrida) => corrida.id === id);
  if (cIndex > -1) {
    corridas.splice(cIndex, 1);
    corridas.forEach((corrida, i) => corrida.id = i + 1 );
    renderTableContent();
    return corridas;
  } else {
    return null;
  }
} 

function create(corrida) {
  if (corrida.date && Number(corrida.time) >= 0 && Number(corrida.distance) >= 0) {
    const lastId = corridas[corridas.length - 1]?.id; 
    corrida.id = lastId === undefined ? 1 : lastId + 1;
    corridas.push(proxId);
    renderTableContent();
    return corrida;
  } else {
    return null;
  }
}

