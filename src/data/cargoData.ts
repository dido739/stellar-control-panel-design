// Cargo Bay Data

export const cargoStats = {
  totalCapacity: 2500, // tons
  usedCapacity: 1847, // tons
  availableCapacity: 653, // tons
  temperatureZones: {
    cold: -18, // °C
    standard: 22, // °C
    controlled: 4, // °C
  },
};

export const consumables = [
  {
    id: "water",
    name: "Вода",
    category: "consumable",
    quantity: 45000, // liters
    maxCapacity: 50000,
    unit: "л",
    status: "operational",
    restockDate: "2387-04-20",
    priority: "critical",
    location: "Танк A-1",
  },
  {
    id: "oxygen",
    name: "Кислород",
    category: "consumable",
    quantity: 8500, // kg
    maxCapacity: 10000,
    unit: "кг",
    status: "operational",
    restockDate: "2387-04-15",
    priority: "critical",
    location: "Танк B-2",
  },
  {
    id: "food",
    name: "Хранителни запаси",
    category: "consumable",
    quantity: 18500, // kg
    maxCapacity: 25000,
    unit: "кг",
    status: "operational",
    restockDate: "2387-05-10",
    priority: "high",
    location: "Хладилен отсек C",
  },
  {
    id: "medical",
    name: "Медицински материали",
    category: "consumable",
    quantity: 750, // kg
    maxCapacity: 1000,
    unit: "кг",
    status: "operational",
    restockDate: "2387-06-01",
    priority: "high",
    location: "Медицински склад D",
  },
  {
    id: "spare-parts",
    name: "Резервни части",
    category: "equipment",
    quantity: 2340, // pieces
    maxCapacity: 3000,
    unit: "бр",
    status: "operational",
    restockDate: "2387-07-15",
    priority: "medium",
    location: "Инженерен склад E",
  },
];

export const equipment = [
  {
    id: "eva-suits",
    name: "EVA скафандри",
    category: "safety",
    quantity: 15,
    condition: "excellent",
    lastMaintenance: "2387-03-10",
    nextMaintenance: "2387-04-10",
    status: "operational",
    location: "Шлюз 1",
  },
  {
    id: "repair-drones",
    name: "Ремонтни дронове",
    category: "maintenance",
    quantity: 8,
    condition: "good",
    lastMaintenance: "2387-03-05",
    nextMaintenance: "2387-04-05",
    status: "operational",
    location: "Ангар A",
  },
  {
    id: "shuttle-craft",
    name: "Транспортна совалка",
    category: "transport",
    quantity: 2,
    condition: "excellent",
    lastMaintenance: "2387-03-01",
    nextMaintenance: "2387-05-01",
    status: "operational",
    location: "Ангар B",
  },
  {
    id: "mining-equipment",
    name: "Минно оборудване",
    category: "industrial",
    quantity: 12,
    condition: "good",
    lastMaintenance: "2387-02-20",
    nextMaintenance: "2387-04-20",
    status: "operational",
    location: "Индустриален склад F",
  },
  {
    id: "scientific-probes",
    name: "Научни сонди",
    category: "research",
    quantity: 24,
    condition: "excellent",
    lastMaintenance: "2387-03-08",
    nextMaintenance: "2387-06-08",
    status: "operational",
    location: "Научен модул G",
  },
  {
    id: "emergency-pods",
    name: "Аварийни капсули",
    category: "safety",
    quantity: 20,
    condition: "excellent",
    lastMaintenance: "2387-03-12",
    nextMaintenance: "2387-04-12",
    status: "operational",
    location: "Разпределени по кораба",
  },
];

export const cargoOperations = [
  {
    id: "op-001",
    type: "loading",
    item: "Хранителни запаси",
    quantity: "500 кг",
    date: "2387-03-14",
    status: "completed",
    operator: "Инж. Марек Ковалски",
  },
  {
    id: "op-002",
    type: "unloading",
    item: "Научни проби",
    quantity: "120 кг",
    date: "2387-03-13",
    status: "completed",
    operator: "Д-р Юки Танака",
  },
  {
    id: "op-003",
    type: "maintenance",
    item: "EVA скафандри",
    quantity: "15 бр",
    date: "2387-03-10",
    status: "completed",
    operator: "Сержант Дмитрий Волков",
  },
  {
    id: "op-004",
    type: "inspection",
    item: "Аварийни капсули",
    quantity: "20 бр",
    date: "2387-03-12",
    status: "completed",
    operator: "Лейт. Мария Родригес",
  },
];

export const storageZones = [
  {
    id: "zone-a",
    name: "Зона A - Течности",
    type: "liquid-storage",
    capacity: 500, // tons
    used: 450,
    temperature: 22,
    pressure: 1.0,
    status: "operational",
  },
  {
    id: "zone-b",
    name: "Зона B - Газове",
    type: "gas-storage",
    capacity: 300,
    used: 255,
    temperature: -180,
    pressure: 150,
    status: "operational",
  },
  {
    id: "zone-c",
    name: "Зона C - Хранителни",
    type: "food-storage",
    capacity: 400,
    used: 296,
    temperature: 4,
    pressure: 1.0,
    status: "operational",
  },
  {
    id: "zone-d",
    name: "Зона D - Оборудване",
    type: "equipment-storage",
    capacity: 600,
    used: 468,
    temperature: 22,
    pressure: 1.0,
    status: "operational",
  },
  {
    id: "zone-e",
    name: "Зона E - Резервни части",
    type: "parts-storage",
    capacity: 400,
    used: 234,
    temperature: 22,
    pressure: 1.0,
    status: "operational",
  },
  {
    id: "zone-f",
    name: "Зона F - Индустриална",
    type: "industrial-storage",
    capacity: 300,
    used: 144,
    temperature: 22,
    pressure: 1.0,
    status: "operational",
  },
];
