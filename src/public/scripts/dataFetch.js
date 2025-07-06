const tempStatus = document.getElementById('temp-sensor-status');
const tempStatusText = document.getElementById('temp-sensor-status-text');

const movementStatus = document.getElementById('movement-sensor-status');
const movementStatusText = document.getElementById('movement-sensor-status-text');

const noiseStatus = document.getElementById('noise-sensor-status');
const noiseStatusText = document.getElementById('noise-sensor-status-text');

const tempValue = document.getElementById('temp-value');
const movementValue = document.getElementById('movement-value');
const noiseValue = document.getElementById('noise-value');

async function fetchData(route) {
  const response = await fetch(`/api/${route}`);
  return await response.json();
}

// === SENSOR STATUS UPDATE ===

async function updateSensorLabel(element, elementText, value) {
  if (value) {
    element.classList.remove("bg-failed-bg");
    element.classList.remove("text-failed");
    element.classList.add("bg-sucessful-bg");
    element.classList.add("text-sucessful");
    elementText.textContent = "Ativo";
  } else {
    element.classList.remove("bg-sucessful-bg");
    element.classList.remove("text-sucessful");
    element.classList.add("bg-failed-bg");
    element.classList.add("text-failed");
    elementText.textContent = "Inativo";
  }
}

async function updateSensorStatus() {
  try {
    const { data } = await fetchData('sensors');
    updateSensorLabel(tempStatus, tempStatusText, data.temperatureStatus);
    updateSensorLabel(movementStatus, movementStatusText, data.movementStatus);
    updateSensorLabel(noiseStatus, noiseStatusText, data.noiseStatus);
  } catch (error) {
    console.error('Erro ao buscar status dos sensores:', error);
  }
}

// === SENSOR VALUES UPDATE ===

async function updateTempValueLabel(temperature) {
  tempValue.textContent = `${temperature} °C`;

  if (temperature === 0) {
    tempValue.textContent = "-";
    tempValue.classList.add("text-failed");
  } else if (temperature <= 30) {
    tempValue.classList.add("text-safe");
  } else if (temperature <= 32) {
    tempValue.classList.add("text-caution");
  } else {
    tempValue.classList.add("text-failed");
  }
}

async function updateMovementValueLabel(movement) {
  movementValue.textContent = movement ? 'Sim' : 'Não';

  if (movement) {
    movementValue.classList.remove("text-failed");
    movementValue.classList.add("text-safe");
  } else {
    movementValue.classList.remove("text-safe");
    movementValue.classList.add("text-failed");
  }
}

async function updateNoiseValueLabel(noiseLevel) {
  if (noiseLevel <= 800) {
    noiseValue.textContent = "-";
    noiseValue.classList.add("text-failed");
  } else if (noiseLevel <= 1200) {
    noiseValue.textContent = "Suave";
    noiseValue.classList.add("text-safe");
  } else if (noiseLevel <= 1500) {
    noiseValue.textContent = "Moderado";
    noiseValue.classList.add("text-caution");
  } else {
    noiseValue.textContent = "Barulhento";
    noiseValue.classList.add("text-failed");
  }
}

async function updateSensorValues() {
  try {
    const { data } = await fetchData('data');
    updateTempValueLabel(data.temperatureReadings.temperature);
    updateMovementValueLabel(data.movementReadings.movement);
    updateNoiseValueLabel(data.noiseReadings.noiseLevel);
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
