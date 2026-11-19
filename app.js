const $ = id => document.getElementById(id);
const clock = $("clock");
const greetingPeriod = $("greetingPeriod");
const greetingSymbol = $("greetingSymbol");
const dateNumber = $("dateNumber");
const temperature = $("temperature");
const weatherSymbol = $("weatherSymbol");
const todoCount = $("todoCount");
const todoDialog = $("todoDialog");
const taskList = $("taskList");
const toast = $("toast");

function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  const hh = String(hour).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  clock.innerHTML = `<span class="hours">${hh}</span><span class="colon">:</span><span class="minutes">${mm}</span>`;
  if (hour >= 5 && hour < 12) {
    greetingPeriod.textContent = "Morning";
    greetingSymbol.innerHTML = '<svg viewBox="0 0 64 64"><path d="M12 39a20 20 0 0 1 40 0M32 5v7M11 16l5 5M53 16l-5 5M5 39h54M9 49h46M17 58h30"/></svg>';
  } else if (hour >= 12 && hour < 18) {
    greetingPeriod.textContent = "Afternoon";
    greetingSymbol.innerHTML = '<svg viewBox="0 0 64 64"><circle cx="32" cy="30" r="12"/><path d="M32 5v7M32 48v8M7 30h8M49 30h8M14 12l6 6M44 42l6 6M50 12l-6 6M20 42l-6 6"/></svg>';
  } else {
    greetingPeriod.textContent = "Evening";
    greetingSymbol.innerHTML = '<svg viewBox="0 0 64 64"><path d="M46 9a23 23 0 1 0 9 40A24 24 0 0 1 46 9Z"/></svg>';
  }
  dateNumber.textContent = String(now.getDate());
}
updateClock();
setInterval(updateClock, 1000);

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
$("dateButton").addEventListener("click", () => {
  notify(new Intl.DateTimeFormat(undefined, {weekday:"long",day:"numeric",month:"long"}).format(new Date()));
});

const weatherMap = {
  0: "clear", 1: "mostly-clear", 2: "partly-cloudy", 3: "cloudy",
  45: "fog", 48: "fog",
  51: "drizzle", 53: "drizzle", 55: "drizzle",
  61: "rain", 63: "rain", 65: "heavy-rain",
  71: "snow", 73: "snow", 75: "snow",
  80: "showers", 81: "showers", 82: "heavy-showers",
  95: "thunderstorm", 96: "thunderstorm", 99: "thunderstorm"
};

const weatherIcons = {
  clear: '<circle cx="32" cy="32" r="12"/><path d="M32 5v8M32 51v8M5 32h8M51 32h8M13 13l6 6M45 45l6 6M51 13l-6 6M19 45l-6 6"/>',
  "mostly-clear": '<circle cx="27" cy="27" r="11"/><path d="M27 5v6M27 43v6M5 27h6M43 27h6M12 12l5 5M37 37l5 5M42 12l-5 5"/><path d="M25 43h25a9 9 0 0 0 0-18 13 13 0 0 0-23-2"/>',
  "partly-cloudy": '<path d="M25 13a11 11 0 0 0 11 17A13 13 0 0 1 25 13Z"/><path d="M13 43h31a9 9 0 0 0 0-18 13 13 0 0 0-24-2 10 10 0 0 0-7 20Z"/>',
  cloudy: '<path d="M12 46h34a10 10 0 0 0 0-20 14 14 0 0 0-27-2 11 11 0 0 0-7 22Z"/>',
  fog: '<path d="M13 25h29M8 34h39M14 43h27"/>',
  drizzle: '<path d="M12 32h32a9 9 0 0 0 0-18 13 13 0 0 0-24-2 10 10 0 0 0-8 20Z"/><path d="m20 39-3 5m15-5-3 5m15-5-3 5"/>',
  rain: '<path d="M12 30h32a9 9 0 0 0 0-18 13 13 0 0 0-24-2 10 10 0 0 0-8 20Z"/><path d="m20 36-4 8m17-8-4 8m17-8-4 8"/>',
  "heavy-rain": '<path d="M12 28h32a9 9 0 0 0 0-18 13 13 0 0 0-24-2 10 10 0 0 0-8 20Z"/><path d="m17 34-5 10m17-10-5 10m17-10-5 10"/>',
  snow: '<path d="M12 28h32a9 9 0 0 0 0-18 13 13 0 0 0-24-2 10 10 0 0 0-8 20Z"/><path d="M18 38h.1M31 40h.1M43 36h.1"/>',
  showers: '<path d="M12 30h32a9 9 0 0 0 0-18 13 13 0 0 0-24-2 10 10 0 0 0-8 20Z"/><path d="m20 36-4 8m17-8-4 8"/>',
  "heavy-showers": '<path d="M12 28h32a9 9 0 0 0 0-18 13 13 0 0 0-24-2 10 10 0 0 0-8 20Z"/><path d="m17 34-5 10m17-10-5 10m17-10-5 10"/>',
  thunderstorm: '<path d="M12 29h32a9 9 0 0 0 0-18 13 13 0 0 0-24-2 10 10 0 0 0-8 20Z"/><path d="m29 32-7 11h8l-2 9 11-14h-8l3-6"/>'
};

function setGreetingWeatherIcon(condition) {
  const markup = weatherIcons[condition] || weatherIcons.cloudy;
  greetingSymbol.innerHTML = `<svg viewBox="0 0 64 64" aria-hidden="true">${markup}</svg>`;
  greetingSymbol.setAttribute("aria-label", `Current weather: ${condition.replaceAll("-", " ")}`);
  greetingSymbol.title = `Current weather: ${condition.replaceAll("-", " ")}`;
}

async function refreshWeather() {
  const latitude = 40.4168, longitude = -3.7038; // Madrid default
  try {
    const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Weather request failed");
    const result = await response.json();
    const current = result.current;
    const condition = weatherMap[current.weather_code] || "cloudy";
    temperature.textContent = `${Math.round(current.temperature_2m)}°`;
    weatherSymbol.innerHTML = `<svg viewBox="0 0 64 56" aria-hidden="true">${weatherIcons[condition]}</svg>`;
    weatherSymbol.title = condition.replaceAll("-", " ");
    setGreetingWeatherIcon(condition);
  } catch {
    temperature.textContent = "--°";
    notify("Weather needs an internet connection");
    // Keep the last known greeting icon if a refresh fails.
  }
}
refreshWeather();
$("weatherButton").addEventListener("click", refreshWeather);

let tasks = [];
try { tasks = JSON.parse(localStorage.getItem("redmiStandbyTasks") || "[]"); } catch {}
function saveTasks() {
  localStorage.setItem("redmiStandbyTasks", JSON.stringify(tasks));
  renderTasks();
}
function renderTasks() {
  taskList.replaceChildren();
  tasks.forEach((task, index) => {
    const row = document.createElement("label");
    row.className = `task-row${task.done ? " done" : ""}`;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!task.done;
    checkbox.addEventListener("change", () => { tasks[index].done = checkbox.checked; saveTasks(); });
    const label = document.createElement("span");
    label.textContent = task.text;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-task";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Delete ${task.text}`);
    remove.addEventListener("click", () => { tasks.splice(index,1); saveTasks(); });
    row.append(checkbox,label,remove);
    taskList.append(row);
  });
  const remaining = tasks.filter(task => !task.done).length;
  todoCount.textContent = remaining > 9 ? "9+" : String(remaining);
  todoCount.hidden = remaining === 0;
  $("todoButton").setAttribute("aria-label", `${remaining} tasks remaining. Open to-do list`);
}
renderTasks();
$("todoButton").addEventListener("click", () => todoDialog.showModal());
$("addTaskForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("newTask");
  const text = input.value.trim();
  if (!text) return;
  tasks.push({text,done:false});
  input.value = "";
  saveTasks();
  input.focus();
});

if ("serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
async function keepScreenAwake() {
  if (!("wakeLock" in navigator) || document.visibilityState !== "visible") return;
  try { await navigator.wakeLock.request("screen"); } catch {}
}
keepScreenAwake();
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") keepScreenAwake(); });
