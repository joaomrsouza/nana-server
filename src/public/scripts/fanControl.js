const autoModeSwitch = document.getElementById('autoModeSwitch');
const autoModeStatus = document.getElementById('autoModeStatus');
const speedButtons = document.querySelectorAll('.speed-btn');
const fanStatus = document.getElementById('fanStatus');

let currentSpeed = 1;

async function updateFan(speed, autoMode) {
  try {
    const speedMap = {
      1: 0,
      2: 120,
      3: 255,
    };

    await fetch('/api/fan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fanSpeed: speedMap[speed], autoMode })
    });
    console.log(`Ventilador atualizado: Velocidade ${speed}, Modo Automático ${autoMode ? 'Ativo' : 'Desligado'}`);
  } catch (error) {
    console.error('Erro ao atualizar o ventilador:', error);
  }
}

autoModeSwitch.addEventListener('change', function () {
  const isAutoMode = this.checked;

  autoModeStatus.textContent = isAutoMode ? 'Ligado' : 'Desligado';

  speedButtons.forEach(btn => {
    btn.disabled = isAutoMode;
  });

  if (isAutoMode) {
    fanStatus.textContent = 'Modo Automático Ativo';
  } else {
    fanStatus.textContent = `Velocidade ${currentSpeed}`;
  }

  updateFan(currentSpeed, isAutoMode);
});

speedButtons.forEach((btn, index) => {
  btn.addEventListener('click', function () {
    if (!autoModeSwitch.checked) {
      currentSpeed = index + 1;
      fanStatus.textContent = `Velocidade ${currentSpeed}`;
      updateSpeedButtonState(currentSpeed);
    }
    updateFan(currentSpeed, autoModeSwitch.checked);
  });
});

function updateSpeedButtonState(activeSpeed) {
  speedButtons.forEach((btn, index) => {
    if (index + 1 === activeSpeed) {
      btn.classList.remove('bg-gray-600');
      btn.classList.add('bg-blue-600');
    } else {
      btn.classList.remove('bg-blue-600');
      btn.classList.add('bg-gray-600');
    }
  });
}

updateSpeedButtonState(1);