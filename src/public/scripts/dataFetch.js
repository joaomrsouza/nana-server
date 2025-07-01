const tempStatus = document.getElementById('temp-sensor-status');
const movementStatus = document.getElementById('movement-sensor-status');
const noiseStatus = document.getElementById('noise-sensor-status');

const tempValue = document.getElementById('temp-value');
const movementValue = document.getElementById('movement-value');
const noiseValue = document.getElementById('noise-value');

async function fetchData(route) {
  const response = await fetch(`/api/${route}`);
  return await response.json();
}

// === SENSOR STATUS UPDATE ===

async function updateSensorLabel(element, value) {
  if (value) {
    element.classList.remove("bg-red-500");
    element.classList.add("bg-green-500");
  } else {
    element.classList.remove("bg-green-500");
    element.classList.add("bg-red-500");
  }

}

async function updateSensorStatus() {
  try {
    const { data } = await fetchData('sensors');
    updateSensorLabel(tempStatus, data.temperatureStatus);
    updateSensorLabel(movementStatus, data.movementStatus);
    updateSensorLabel(noiseStatus, data.noiseStatus);
  } catch (error) {
    console.error('Erro ao buscar status dos sensores:', error);
  }
}

// === SENSOR VALUES UPDATE ===

async function updateSensorValues() {
  try {
    const { data } = await fetchData('data');
    tempValue.textContent = `${data.temperatureReadings.temperature} C`;
    movementValue.textContent = data.movementReadings.movement ? 'Sim' : 'Não';
    noiseValue.textContent = data.noiseReadings.noiseLevel;
  } catch (error) {
    console.error('Erro ao buscar valores dos sensores:', error);
  }
}

function updateUI() {
  updateSensorStatus();
  updateSensorValues();
}

setInterval(updateUI, 1000);
document.addEventListener('DOMContentLoaded', updateUI); // Atualiza ao carregar a página
