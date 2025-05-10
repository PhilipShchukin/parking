## 📋 Описание проекта

Система позволяет пользователям бронировать парковочные места на различных локациях, просматривать доступные слоты, управлять бронированиями и отслеживать историю.

---

## 🔧 Технологии

### Frontend:
- Vite + React + TypeScript
- React Router
- shadcn/ui (на базе Radix UI + TailwindCSS)
- Tanstack Query
- Axios

### Backend:
- NestJS + TypeScript
- REST API
- JWT авторизация
- Prisma ORM
- MariaDB (через Docker)

---

## 📁 Структура проекта

parking/
├── frontend/          # Клиентская часть (Vite + React)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/           # Серверная часть (NestJS)
│   ├── src/
|   ├── docker-compose.yml # Запуск базы данных
│   ├── package.json
│   └── tsconfig.json
└── README.md          # Описание проекта


---

## 🧱 Docker: запуск базы данных

MariaDB развёртывается через Docker:

```yaml
# docker-compose.yml
version: '3.9'

services:
  db:
    image: mariadb:11
    container_name: mariadb-parking
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: parking
    ports:
      - '3306:3306'
    volumes:
      - mariadb_data:/var/lib/mysql

volumes:
  mariadb_data:
```

🔧 Команда запуска: docker-compose up -d

Убедитесь, что .env backend указывает:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=parking

DATABASE_URL="mysql://root:root@localhost:3306/parking"
JWT_SECRET="supersecretkey"


🚀 Функциональность

✅ Авторизация:
	•	Регистрация и вход
	•	JWT (в куках)

✅ Работа с парковками:
	•	Просмотр всех парковок
	•	Отображение занятых / свободных слотов
	•	Календарь и почасовой выбор времени
	•	Создание и отмена бронирования

✅ История:
	•	Страница “Мои бронирования”
	•	Отображение статуса и времени
	•	Возможность отменить, если время ещё не наступило

📦 Установка
    Backend:
      cd backend
      npm install
      npx prisma migrate dev
      npm run start:dev
    Frontend:
      cd frontend
      npm install
      npm run dev

🗃️ Структура БД
	•	users — пользователи
	•	parking_spots — парковочные места
	•	reservations — бронирования

🔌 API-эндпоинты

POST   /api/auth/register                            # Регистрация
POST   /api/auth/login                               # Авторизация
GET    /api/parking-spots                            # Получение всех парковок
GET    /api/parking-spots/:id/available-times        # Временные слоты по парковке
POST   /api/reservations                             # Создание бронирования
GET    /api/reservations/:user_id                    # История пользователя
DELETE /api/reservations/:reservation_id             # Отмена бронирования



