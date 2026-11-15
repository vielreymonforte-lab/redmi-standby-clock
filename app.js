const el = id => document.getElementById(id);
const pad = n => String(n).padStart(2, "0");
let is24 = localStorage.getItem("is24") !== "false";
let showWeather = localStorage.getItem("showWeather") !== "false";
let alarm = localStorage.getItem("alarm") || "07:00";

function updateClock() {
  const now = new Date();
  el("clock").textContent = is24
    ? `${pad(now.getHours())}:${pad(now.getMinutes())}`
    : now.toLocaleTimeString([], {hour: "numeric", minute: "2-digit"});
  el("weekday").textContent = now.toLocaleDateString("en-GB", {weekday: "long"}).toUpperCase();
  el("date").textContent = now.toLocaleDateString("en-GB", {day: "2-digit"});
  el("alarm-time").textContent = alarm || "Not set";
}

function updateSettingsUI() {
  document.body.classList.toggle("hide-weather", !showWeather);
  el("format-24").checked = is24;
  el("show-weather").checked = showWeather;
  el("alarm-input").value = alarm;
}

async function updateWeather() {
  if (!showWeather) return;
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=40.4168&longitude=-3.7038&current=temperature_2m,weather_code&timezone=Europe%2FMadrid";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather request failed");
    const data = await response.json();
    const code = data.current.weather_code;
    const descriptions = [
      [[0], "☀️", "Clear"],
      [[1,2,3], "⛅", "Partly cloudy"],
      [[45,48], "🌫️", "Fog"],
      [[51,53,55,56,57], "🌦️", "Drizzle"],
      [[61,63,65,66,67,80,81,82], "🌧️", "Rain"],
      [[71,73,75,77,85,86], "❄️", "Snow"],
      [[95,96,99], "⛈️", "Thunderstorm"]
    ];
    const match = descriptions.find(([codes]) => codes.includes(code)) || [[], "☁️", "Cloudy"];
    el("weather-icon").textContent = match[1];
    el("temperature").textContent = `${Math.round(data.current.temperature_2m)}°`;
    el("condition").textContent = match[2];
  } catch {
    el("condition").textContent = "Weather unavailable";
  }
}

el("settings-open").addEventListener("click", () => el("settings-dialog").showModal());
el("settings-form").addEventListener("submit", () => {
  is24 = el("format-24").checked;
  showWeather = el("show-weather").checked;
  alarm = el("alarm-input").value;
  localStorage.setItem("is24", is24);
  localStorage.setItem("showWeather", showWeather);
  localStorage.setItem("alarm", alarm);
  updateSettingsUI(); updateClock(); updateWeather();
});

updateSettingsUI();
updateClock();
updateWeather();
setInterval(updateClock, 1000);
setInterval(updateWeather, 15 * 60 * 1000);

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(console.error));
}
