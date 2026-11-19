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
  if (hour >= 1 && hour <= 11) greetingPeriod.textContent = "Morning";
  else if (hour >= 12 && hour <= 16) greetingPeriod.textContent = "Afternoon";
  else greetingPeriod.textContent = "Evening"; // 17:00–00:59
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
  56: "drizzle", 57: "drizzle", 71: "snow", 73: "snow", 75: "snow", 77: "snow",
  66: "rain", 67: "heavy-rain", 80: "showers", 81: "showers", 82: "heavy-showers",
  85: "snow", 86: "snow", 95: "thunderstorm", 96: "thunderstorm", 99: "thunderstorm"
};

const weatherIcons = {
  clear: '<circle cx="32" cy="32" r="12" fill="#D5B878"/><g stroke="#D5B878" stroke-width="4" stroke-linecap="round"><path d="M32 5v8M32 51v8M5 32h8M51 32h8M13 13l6 6M45 45l6 6M51 13l-6 6M19 45l-6 6"/></g>',
  "mostly-clear": '<circle cx="27" cy="26" r="12" fill="#D5B878"/><g stroke="#D5B878" stroke-width="4" stroke-linecap="round"><path d="M27 5v7M27 40v7M5 26h7M42 26h7M12 12l5 5M37 37l5 5"/></g><path d="M22 47h29a10 10 0 0 0 0-20 14 14 0 0 0-24-3 11 11 0 0 0-5 23Z" fill="#E8E2D5"/>',
  "partly-cloudy": '<circle cx="27" cy="25" r="12" fill="#D5B878"/><g stroke="#D5B878" stroke-width="4" stroke-linecap="round"><path d="M27 5v7M27 40v7M5 25h7M42 25h7M12 12l5 5M37 37l5 5"/></g><path d="M18 48h30a10 10 0 0 0 0-20 14 14 0 0 0-24-3 11 11 0 0 0-6 23Z" fill="#E8E2D5"/>',
  cloudy: '<path d="M13 48h36a11 11 0 0 0 0-22 15 15 0 0 0-27-3 12 12 0 0 0-9 25Z" fill="#E8E2D5"/>',
  fog: '<path d="M14 27h36M9 36h46M15 45h34" stroke="#E8E2D5" stroke-width="5" stroke-linecap="round"/>',
  drizzle: '<path d="M13 32h36a11 11 0 0 0 0-22 15 15 0 0 0-27-3 12 12 0 0 0-9 25Z" fill="#E8E2D5"/><path d="m20 41-3 6m15-6-3 6m15-6-3 6" stroke="#9EC9E8" stroke-width="4" stroke-linecap="round"/>',
  rain: '<path d="M13 32h36a11 11 0 0 0 0-22 15 15 0 0 0-27-3 12 12 0 0 0-9 25Z" fill="#E8E2D5"/><path d="m20 41-4 9m17-9-4 9m15-9-4 9" stroke="#8FC8EE" stroke-width="4" stroke-linecap="round"/>',
  "heavy-rain": '<path d="M13 30h36a11 11 0 0 0 0-22 15 15 0 0 0-27-3 12 12 0 0 0-9 25Z" fill="#E8E2D5"/><path d="m17 39-5 10m17-10-5 10m17-10-5 10" stroke="#8FC8EE" stroke-width="4" stroke-linecap="round"/>',
  snow: '<path d="M13 30h36a11 11 0 0 0 0-22 15 15 0 0 0-27-3 12 12 0 0 0-9 25Z" fill="#E8E2D5"/><g fill="#BFE4F5"><circle cx="18" cy="43" r="3"/><circle cx="32" cy="47" r="3"/><circle cx="45" cy="41" r="3"/></g>',
  showers: '<path d="M13 30h36a11 11 0 0 0 0-22 15 15 0 0 0-27-3 12 12 0 0 0-9 25Z" fill="#E8E2D5"/><path d="m20 40-4 9m17-9-4 9" stroke="#8FC8EE" stroke-width="4" stroke-linecap="round"/>',
  "heavy-showers": '<path d="M13 30h36a11 11 0 0 0 0-22 15 15 0 0 0-27-3 12 12 0 0 0-9 25Z" fill="#E8E2D5"/><path d="m17 39-5 10m17-10-5 10m17-10-5 10" stroke="#8FC8EE" stroke-width="4" stroke-linecap="round"/>',
  thunderstorm: '<path d="M13 30h36a11 11 0 0 0 0-22 15 15 0 0 0-27-3 12 12 0 0 0-9 25Z" fill="#E8E2D5"/><path d="m33 34-9 13h9l-3 11 13-16h-9l3-7Z" fill="#D5B878"/>'
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
setInterval(refreshWeather, 30 * 60 * 1000); // Refresh weather every 30 minutes
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
  todoCount.hidden = false;
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
