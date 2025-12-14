# Aurora Eternis - Контролен панел на космически кораб
![GitHub package.json version](https://img.shields.io/github/package-json/v/dido739/stellar-control-panel-design?style=plastic)
![GitHub License](https://img.shields.io/github/license/dido739/stellar-control-panel-design?style=plastic)
[![React 18.3.1](https://img.shields.io/badge/React-18.3.1-61DAFB?style=plastic&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript 5.8.3](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=plastic&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 7.2.7](https://img.shields.io/badge/Vite-7.2.7-646cff?style=plastic&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 3.4.17](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=plastic&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
## Описание на проекта

Адаптивен уебсайт, представящ контролен панел на космическия кораб **Aurora Eternis** в рамките на мисия **Stellar Dawn**. Проектът е изграден с модерен sci-fi дизайн, вдъхновен от филми като Interstellar и игри като Mass Effect.

### Функционалности

- **Начална страница** - Герой секция с кораба, мотото на мисията и преглед на основните системи
- **Страница "Екипаж"** - Списък на 6-те члена на екипажа с кратки описания
- **Детайлна страница за член на екипажа** - Пълно досие, умения и статистика
- **Страница "Статус на кораба"** - Интерактивен dashboard с визуални индикатори за всички системи
- **Страница "Комуникации"** - Център за управление на комуникации с входящи и изходящи съобщения
- **Страница "Диагностика"** - Разширена диагностика с графики и симулация на аварийни ситуации
- **Страница "Галактическа карта"** - Интерактивна карта на локалния сектор с текущо местоположение
- **Страница "Товарен отсек"** - Управление на инвентара с оборудване и консумативи

## Използвани технологии

- **React 18** - JavaScript библиотека за изграждане на потребителски интерфейси
- **TypeScript** - Типизиран JavaScript за по-надежден код
- **Vite** - Бърз build tool и dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Библиотека за анимации
- **React Router** - Навигация между страниците
- **shadcn/ui** - Компонентна библиотека
- **Lucide React** - Икони

## Дизайн

- **Цветова схема**: Тъмна космическа тема с циан акценти (RGB: 0, 255, 255) и кехлибарени предупредителни тонове
- **Шрифтове**: 
  - Orbitron (заглавия) - футуристичен геометричен шрифт
  - Share Tech Mono (основен текст) - моноширен технически шрифт
- **Ефекти**: Glowing текст, scanlines, прогрес барове, LED индикатори, glassmorphism панели

## Инсталация и стартиране

```bash
# Клониране на репозиторито
git clone https://github.com/dido739/stellar-control-panel-design.git

# Навигиране до папката
cd aurora-eternis

# Инсталиране на зависимостите
npm install

# Стартиране на development сървъра
npm run dev
```

Приложението ще бъде достъпно на `http://localhost:8080/stellar-control-panel-design/`

## Структура на проекта

```
src/
├── assets/           # Изображения (герой, екипаж)
├── components/       # React компоненти
│   ├── home/         # Компоненти за началната страница
│   ├── layout/       # Layout компоненти (Navbar, Layout)
│   └── ui/           # UI компоненти (Button, Panel, ProgressBar)
├── data/             # Данни за кораба и екипажа
├── pages/            # Страници на приложението
└── lib/              # Utility функции
```

## Използвани ресурси

### Изображения
- Всички изображения са генерирани с AI (Flux модели)
- Герой изображение на космическия кораб
- Портрети на 6-те члена на екипажа

### Шрифтове
- [Orbitron](https://fonts.google.com/specimen/Orbitron) - Google Fonts
- [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) - Google Fonts

### AI инструменти
- Генериране на изображения за екипажа и кораба
- Съдържанието е оригинално създадено за проекта

## Автор

Създадено за състезание CodeWars: Междузвезден код

---

*Per Aspera Ad Astra - Чрез трудностите към звездите*
