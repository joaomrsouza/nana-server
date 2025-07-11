const eventsContainer = document.getElementById("events-container");

const svgIconMap = {
  temp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thermometer-icon lucide-thermometer"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>`,
  "high-temp": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thermometer-sun-icon lucide-thermometer-sun"><path d="M12 9a4 4 0 0 0-2 7.5"/><path d="M12 3v2"/><path d="m6.6 18.4-1.4 1.4"/><path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M4 13H2"/><path d="M6.34 7.34 4.93 5.93"/></svg>`,
  "low-temp": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thermometer-snowflake-icon lucide-thermometer-snowflake"><path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="M10.585 15H10"/><path d="M2 12h6.5L10 9"/><path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h2"/></svg>`,
  "servo-swing": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity-icon lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>`,
  noise: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`,
  "high-noise": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>`,
};

function getEventIcon(event) {
  const { name, extra } = event;

  if (svgIconMap[name]) return svgIconMap[name];

  if (name === "mid-temp") return svgIconMap.temp;

  if (name.includes("sensor")) {
    if (extra === "temperature-sensor") return svgIconMap.temp;
    if (extra === "movement-sensor") return svgIconMap["servo-swing"];
    if (extra === "noise-sensor") return svgIconMap.noise;
  }
}

const eventTextMap = {
  "high-temp": "Temperatura Alta!",
  "low-temp": "Temperatura Baixa!",
  "mid-temp": "Temperatura Média.",
  "servo-swing": "O berço está oscilando.",
  "high-noise": "Ruído Alto!",
  "sensor-working": "Sensor de $sensor está funcionando.",
  "sensor-stop": "Sensor de $sensor parou de funcionar.",
};

const sensorMap = {
  "temperature-sensor": "Temperatura",
  "movement-sensor": "Movimento",
  "noise-sensor": "Ruído",
};

function getEventText(event) {
  const { name, extra } = event;

  if (eventTextMap[name]) {
    return eventTextMap[name].replace("$sensor", sensorMap[extra]);
  }

  return event.name;
}

const eventColorMap = {
  "high-temp": ["bg-failed-bg", "text-failed"],
  "low-temp": ["bg-sucessful-bg", "text-sucessful"],
  "high-noise": ["bg-failed-bg", "text-failed"],
  "sensor-working": ["bg-sucessful-bg", "text-sucessful"],
  "sensor-stop": ["bg-failed-bg", "text-failed"],
};

async function fetchEvents() {
  const response = await fetch("/api/event");
  return await response.json();
}

async function updateEvents() {
  const { data } = await fetchEvents();

  eventsContainer.innerHTML = "";
  data.forEach(event => {
    const icon = getEventIcon(event);

    eventsContainer.innerHTML += `
      <div class="flex items-center gap-5 ${eventColorMap[event.name]?.[1] ?? "text-third"} text-sm sm:text-base">
        <div class="p-2 rounded-full ${eventColorMap[event.name]?.[0] ?? "bg-primary"}" >
            ${icon}
        </div>
        <span class="font-medium">${getEventText(event)}</span>
        <span class="ml-auto text-center">${new Date(event.timestamp)
          .toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", "<br />")}</span>
      </div>
      <hr class="last:hidden border-secondary" />
    `;
  });
}

setInterval(updateEvents, 1000);
document.addEventListener("DOMContentLoaded", updateEvents); // Atualiza ao carregar a página
