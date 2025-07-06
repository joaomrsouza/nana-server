const autoModeSwitch = document.getElementById('autoModeSwitch');
const speedButtons = document.querySelectorAll('.speed-btn');

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

  speedButtons.forEach(btn => {
    btn.disabled = isAutoMode;
  });

  updateFan(currentSpeed, isAutoMode);
});

speedButtons.forEach((btn, index) => {
  btn.addEventListener('click', function () {
    if (!autoModeSwitch.checked) {
      currentSpeed = index + 1;
      updateSpeedButtonState(currentSpeed);
    }
    updateFan(currentSpeed, autoModeSwitch.checked);
  });
});

function updateSpeedButtonState(activeSpeed) {
  speedButtons.forEach((btn, index) => {
    if (index + 1 === activeSpeed) {
      btn.classList.remove('bg-third');
      btn.classList.add('bg-primary');
    } else {
      btn.classList.remove('bg-primary');
      btn.classList.add('bg-third');
    }
  });
}

updateSpeedButtonState(1);