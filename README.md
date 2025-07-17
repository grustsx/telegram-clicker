# Подготовка к запуску

Для локального запуска создать `.env.local` в корне, скопипастить туда `.env.production`, только поменять на VITE_IS_DEV=true

# Запуск

`npm run dev`

# Версии

Версия изменяется сама с коммитом x.x.1 -> x.x.2

Другой апгрейд только с командой (все изменения должны быть закоммичены):
Для точного изменения команда:
`npm version 2.2.8 -m "chore(release): %s"`

x.1.x -> x.2.x:
`npm version minor -m "chore(release): %s"`

1.x.x -> 2.x.x:
`npm version major -m "chore(release): %s"`

# Структура проекта

src/
├── app/
│ ├── store.ts # Redux store
│ └── hooks.ts # useAppSelector/useAppDispatch

├── components/ # Переиспользуемые UI-компоненты
│ ├── Loader.tsx
│ └── Button.tsx

├── state/ # Один слайс со всем состоянием
│ └── gameSlice.ts # Хранит всё: пользователь, здания и т.д.

├── pages/ # Страницы (SPA или Next.js)
│ └── Home.tsx

├── styles/ # Tailwind config & глобальные стили
│ ├── index.css # Импорт Tailwind layers: base, components, utilities
│ └── tailwind.config.ts # При кастомизации (если нужен ts)

├── types/ # Общие типы
│ └── index.ts

├── utils/ # Утилиты (форматирование, расчёты и пр.)
│ └── calcIncome.ts

├── assets/ # Картинки, иконки, SVG
│ └── cake.svg

├── App.tsx
└── main.tsx or index.tsx
