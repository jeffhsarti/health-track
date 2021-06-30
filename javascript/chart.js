window.onload = init;
window.onresize = onResizeRedraw;

// Aqui armazenamos as referências das instancias de Chart montadas
const charts = [];

//
function init(e) {
  generateCharts();
}

function onResizeRedraw(e) {
  charts.forEach((chart) => {
    // como o chartjs possui um ciclo de renderização, precisamos forçar
    // o desenho do gráfico em tela toda vez que esta é redimensionada.
    // é pesado e pouco performático, mas ajuda nas transições de tela,
    // principalmente quando o usuário inverte a tela do celular/tablet
    chart.draw();
  });
}

function generateCharts() {
  generateChartPesoXTempo();
  generateChartKMPercorridos();
}

function generateChartPesoXTempo() {
  const datasets = [
    {
      label: "Peso (kg)",
      data: [75.23, 74.89, 74.2, 74.73, 74.65, 74.26],
      borderWidth: 1,
      borderColor: "#00c2cb",
    },
  ];
  const labels = ["01/jan", "08/jan", "08/jan", "15/jan", "22/jan", "29/jan"];
  const config = {
    scales: {
      y: {
        min: Math.min.apply(Math, datasets[0].data),
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value) {
              return value + 'kg';
          },
          color: "white",
        }
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "white"
        },
      },
      datalabels: {
        color: function (context) {
          let index = context.dataIndex;
          let value = context.dataset.data[index];
          if (context.dataset.data[index - 1]) {
            return value <= context.dataset.data[index - 1]
              ? "#0ee6b7"
              : "#fa2828";
          } else {
            return "#0ee6b7";
          }
        },
        anchor: "end",
        align: "top",
        formatter: function (value) {
          return value.toFixed(2) + " kg";
        },
        font: {
          weight: "bold"
        },
        padding: 2,
      },
    },
  };

  const ctx = document.getElementById("pesoXtempo").getContext("2d");
  const pesoXtempo = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: "line",
    data: {
      labels,
      datasets,
    },
    options: config,
  });
  charts.push(pesoXtempo);
}

function generateChartKMPercorridos() {
  const distancias = getAll().map(corrida => corrida.distance);
  const tempos = getAll().map(corrida => corrida.time);
  const datasets = [
    {
      label: "Distância (km)",
      data: distancias,
      borderWidth: 1,
      fill: true,
      backgroundColor: "#597ef00f",
      borderColor: "#597ef0",
    },
    {
      label: "Tempo (min)",
      data: tempos,
      borderWidth: 1,
      fill: true,
      backgroundColor: "#00c2cb0f",
      borderColor: "#00c2cb",
    },
  ];
  const labels = ["03/jan", "06/jan", "09/jan", "12/jan", "15/jan", "18/jan"];
  const config = {
    scales: {
      y: {
        min: Math.min.apply(Math, [...datasets[0].data, ...datasets[1].data]),
        ticks: {
          color: "white",
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "white"
        },
      },
      datalabels: {
        anchor: "end",
        align: "top",
        color: "white",
        font: {
          weight: "bold"
        },
        formatter: function (value, context) {
          return context.datasetIndex === 0 ? value.toFixed(2) + " km" : value + " min"
        },
      },
    },
  };

  const ctx = document.getElementById("kmPercorridos").getContext("2d");
  const kmPercorridos = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: "line",
    data: {
      labels,
      datasets,
    },
    options: config,
  });
  charts.push(kmPercorridos);
}
