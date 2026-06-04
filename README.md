 CulteRRa — Каталог выставок и экспонатов

Клиент-серверное веб-приложение для управления выставками и экспонатами. 
---

 Предметная область

Каталог выставок и экспонатов (на одной выставке— несколько экспонатов).
Студент: Савлучинский Александр (группа ИСП-1.31)

---

 Выбранная архитектура

Вариант А. Раздельные фронтенд и бэкенд

 Frontend | Next.js  + TypeScript + Tailwind CSS 
 Backend  | Node.js + Express + TypeScript

Вариант А приближен к реальной разработке, где фронтенд и бэкенд — два разных проекта(Разделены на 2 ).

---

 Стек технологий

Frontend
- Next.js 
- TypeScript 
- Tailwind CSS 
- fetch API для запросов

 Backend
- Node.js 
- Express 
- TypeScript
- Zod 
- cors

 Хранилище данных
- In-memory
- Seed-данные при запуске 

---

  Структура проекта
├── frontend/ # Next.js приложение (порт 3000)
│ ├── app/
│ │ ├── globals.css # Глобальные стили + подключение шрифтов
│ │ ├── layout.tsx #  layout с навигацией
│ │ ├── page.tsx # Главная страница 
│ │ ├── exhibitions/ # CRUD для выставок
│ │ │ ├── new/page.tsx
│ │ │ ├── [id]/page.tsx
│ │ │ └── [id]/edit/page.tsx
│ │ └── exhibits/ # CRUD для экспонатов
│ │ ├── page.tsx
│ │ ├── new/page.tsx
│ │ └── [id]/edit/page.tsx
│ ├── public/fonts/ # Локальные шрифты
│ └── package.json
│
├── backend/ # Express сервер (порт 4000)
│ ├── src/
│ │ ├── server.ts # Точка входа, CORS, middleware
│ │ ├── store/index.ts # In-memory хранилище + seed
│ │ ├── types/index.ts # TypeScript интерфейсы
│ │ ├── validators/ # Zod схемы валидации
│ │ ├── controllers/ # Обработчики запросов
│ │ └── routes/ # Express маршруты
│ └── package.json
---

Инструкция по локальному запуск

Клонирова репозиторий

git clone https://github.com/kkilonq/CulteRRa.git
cd CulteRRa

Запуск бэкенда
cd backend
npm install
npm run dev

Открыть новый терминал и выполните команды для запуска фронтэнд части:
cd frontend
npm install
npm run dev

Открыть приложение
Перейдите в браузере: http://localhost:3000

ВАЖНО!!
Фронтэнд и Бекэнд части должны работать одновременно ,не закрывайте терминалы !!
---

Сущности и структура данных
Выставка (Exhibition)

id	string  Уникальный идентификатор
title	string	Название выставки
ticketPrice	number	Стоимость билета (₽)
isInterregional	boolean	Всероссийский/Региональный масштаб
description	string	Аннотация 
createdAt	string	Дата создания
updatedAt	string	Дата обновления

Экспонат (Exhibit)

id	string	Уникальный идентификатор
title	string	Название экспоната
author	string	Автор/Мастер
creationYear  number  Год создания 
exhibitionId  string  Ссылка на родительскую выставку
createdAt	string	  Дата создания
updatedAt	string	  Дата обновления
---

Связь
Один-ко-многим: одна выставка → много экспонатов

Запросы(Ендпоинты)
curl "http://localhost:4000/api/exhibit?page=1&limit=5" - список выставок
curl "http://localhost:4000/api/exhibition/1" - экспанат по id 
curl -X POST "http://localhost:4000/api/exhibition" -H "Content-Type: application/json" -d "{\"title\":\"Импрессионизм\",\"ticketPrice\":450,\"isInterregional\":false,\"description\":\"Французские импрессионисты\"}" - создание выставки 
curl -X DELETE "http://localhost:4000/api/exhibition/6" - удаление выставки по id 
curl -X POST "http://localhost:4000/api/exhibit" -H "Content-Type: application/json" -d "{\"title\":\"Звездная ночь\",\"author\":\"Ван Гог\",\"creationYear\":1889,\"exhibitionId\":\"1\"}" - создание экспаната 
curl -X PATCH "http://localhost:4000/api/exhibit/1" -H "Content-Type: application/json" -d "{\"author\":\"Леонардо ди сер Пьеро да Винчи\"}" - обновление экспаната. 

Скриншоты
![Главная страница](screenchots/main.png)
![Выставки](screenchots/exhibitions)
![Редоктирование выставки](screenchots/exhibitionsedit)
![Новая выставка](screenchots/exbitionsnew)
![Экспанаты](screenchots/exhibits)
![Новый экспанат](screenchots/exhibitsnew)
![Редоктирование экспаната](screenchots/exhibitsedit)