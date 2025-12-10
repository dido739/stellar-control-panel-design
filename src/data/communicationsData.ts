// Communications data
export const messagesData = [
  {
    id: "msg-001",
    type: "incoming",
    from: "Централно командване - Земя",
    timestamp: "2387-03-15 14:32:07 UTC",
    subject: "Статус на мисията - Одобрение за продължаване",
    content: "Aurora Eternis, потвърждаваме получаването на вашия доклад за статуса. Всички параметри са в норма. Одобряваме продължаване на курса към Sirius B. Очакваме следващия доклад след 72 часа. Успех на мисията. Край.",
    priority: "normal",
    read: true,
  },
  {
    id: "msg-002",
    type: "incoming",
    from: "Космическа станция Титан",
    timestamp: "2387-03-14 09:15:22 UTC",
    subject: "Метеоритна активност в сектор 7G",
    content: "Внимание на всички кораби в региона. Засечена е повишена метеоритна активност в сектор 7G. Препоръчваме заобиколен маршрут. Изпращаме актуализирани навигационни данни.",
    priority: "warning",
    read: true,
  },
  {
    id: "msg-003",
    type: "outgoing",
    to: "Централно командване - Земя",
    timestamp: "2387-03-15 08:00:00 UTC",
    subject: "Седмичен доклад - Седмица 47",
    content: "Централно командване, изпращаме седмичен доклад. Всички системи функционират в оптимални параметри. Екипажът е в добро здраве. Текущо разстояние от Земята: 8.6 светлинни години. ETA до Sirius B: 42 дни.",
    priority: "normal",
    read: true,
  },
  {
    id: "msg-004",
    type: "incoming",
    from: "Научен институт Марс",
    timestamp: "2387-03-12 18:45:33 UTC",
    subject: "Нови данни за атмосферата на Sirius B-IV",
    content: "Екипаж на Aurora Eternis, изпращаме актуализирани спектрографски данни за планетата Sirius B-IV. Открити са следи от водна пара в атмосферата. Препоръчваме приоритетно изследване при пристигане.",
    priority: "high",
    read: false,
  },
  {
    id: "msg-005",
    type: "incoming",
    from: "Централно командване - Земя",
    timestamp: "2387-03-10 06:22:15 UTC",
    subject: "Поздравления от Генералния секретар",
    content: "Екипаж на Aurora Eternis, Генералният секретар на ООН изпраща своите поздравления по случай успешното преминаване на половината от пътя към Sirius. Цялото човечество следи вашата мисия с надежда и гордост.",
    priority: "normal",
    read: true,
  },
];

// Diagnostics data
export const diagnosticsData = {
  powerHistory: [
    { time: "00:00", reactor: 94, reserves: 87, solar: 100 },
    { time: "04:00", reactor: 95, reserves: 88, solar: 98 },
    { time: "08:00", reactor: 94, reserves: 89, solar: 100 },
    { time: "12:00", reactor: 93, reserves: 87, solar: 100 },
    { time: "16:00", reactor: 94, reserves: 86, solar: 99 },
    { time: "20:00", reactor: 94, reserves: 87, solar: 100 },
    { time: "24:00", reactor: 94, reserves: 87, solar: 100 },
  ],
  temperatureZones: [
    { zone: "Мостик", temp: 22, optimal: 22 },
    { zone: "Инженерен", temp: 28, optimal: 25 },
    { zone: "Жилищен", temp: 21, optimal: 22 },
    { zone: "Медицински", temp: 20, optimal: 20 },
    { zone: "Товарен", temp: 15, optimal: 15 },
    { zone: "Реактор", temp: 45, optimal: 42 },
  ],
  systemLoads: [
    { system: "NAV", load: 45 },
    { system: "LIFE", load: 78 },
    { system: "COMM", load: 32 },
    { system: "WEAP", load: 5 },
    { system: "SHIELD", load: 12 },
    { system: "PROP", load: 65 },
  ],
  alerts: [
    { id: 1, level: "info", message: "Планирана поддръжка на филтрите след 48 часа", system: "LIFE-SYS" },
    { id: 2, level: "warning", message: "Леко повишена температура в инженерния отсек", system: "THERMAL" },
    { id: 3, level: "info", message: "Актуализация на навигационните карти завършена", system: "NAV-SYS" },
  ],
};

// Galaxy map data
export const galaxyMapData = {
  stars: [
    { id: "sol", name: "Слънце (Sol)", x: 20, y: 50, type: "G2V", inhabited: true },
    { id: "proxima", name: "Proxima Centauri", x: 28, y: 48, type: "M5.5Ve", inhabited: false },
    { id: "barnard", name: "Barnard's Star", x: 32, y: 55, type: "M4V", inhabited: false },
    { id: "sirius", name: "Sirius", x: 75, y: 35, type: "A1V", inhabited: false, destination: true },
    { id: "vega", name: "Вега", x: 60, y: 20, type: "A0V", inhabited: false },
    { id: "altair", name: "Алтаир", x: 45, y: 70, type: "A7V", inhabited: false },
    { id: "tau-ceti", name: "Tau Ceti", x: 35, y: 40, type: "G8.5V", inhabited: true },
    { id: "epsilon-eridani", name: "Epsilon Eridani", x: 42, y: 60, type: "K2V", inhabited: false },
  ],
  shipPosition: { x: 52, y: 42 }, // Current position of Aurora Eternis
  trajectory: [
    { x: 20, y: 50 }, // Start: Sol
    { x: 28, y: 48 }, // Waypoint 1
    { x: 35, y: 45 }, // Waypoint 2
    { x: 52, y: 42 }, // Current position
    { x: 65, y: 38 }, // Future waypoint
    { x: 75, y: 35 }, // Destination: Sirius
  ],
};

// Emergency scenarios
export const emergencyScenarios = [
  {
    id: "hull-breach",
    name: "Пробив в корпуса",
    description: "Симулира пробив в корпуса в сектор 4",
    severity: "critical",
    affectedSystems: ["LIFE-SYS", "SHIELD", "STRUCTURAL"],
  },
  {
    id: "power-failure",
    name: "Отказ на главния реактор",
    description: "Симулира частичен отказ на термоядрения реактор",
    severity: "critical",
    affectedSystems: ["POWER", "PROP", "NAV-SYS"],
  },
  {
    id: "comm-blackout",
    name: "Комуникационен блекаут",
    description: "Симулира загуба на връзка със Земята",
    severity: "warning",
    affectedSystems: ["COMM-ARR"],
  },
  {
    id: "nav-malfunction",
    name: "Навигационна грешка",
    description: "Симулира неизправност в квантовия навигационен компютър",
    severity: "warning",
    affectedSystems: ["NAV-SYS", "PROP"],
  },
];
