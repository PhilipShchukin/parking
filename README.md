# Система бронирования парковочных мест

Fullstack приложение для бронирования парковочных мест. Проект состоит из frontend (React) и backend (NestJS) частей.

## 🚀 Технологии

### Frontend

- React + TypeScript
- React Router для навигации
- Shadcn/ui для UI компонентов
- Axios для HTTP запросов
- React Query для управления состоянием
- Tailwind CSS для стилизации

### Backend

- NestJS + TypeScript
- Prisma ORM
- JWT для аутентификации
- MariaDB/MySQL
- Docker для контейнеризации

## 📋 Функциональность

- 🔐 Регистрация и авторизация пользователей
- 🅿️ Просмотр доступных парковочных мест
- 📅 Бронирование мест с выбором даты и времени
- 📊 История бронирований
- ❌ Отмена бронирований

## 🏗 Структура проекта

```
parking/
├── frontend/          # React приложение
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── hooks/        # Кастомные хуки
│   │   ├── pages/        # Страницы приложения
│   │   ├── services/     # API сервисы
│   │   └── types/        # TypeScript типы
│   └── ...
├── backend/           # NestJS приложение
│   ├── src/
│   │   ├── auth/         # Модуль аутентификации
│   │   ├── parking-spot/ # Модуль парковочных мест
│   │   ├── reservation/  # Модуль бронирований
│   │   └── user/         # Модуль пользователей
│   └── ...
└── README.md
```

## 🚀 Установка и запуск

### Предварительные требования

- Node.js (v18+)
- Docker и Docker Compose
- MySQL/MariaDB

### Backend

```bash
cd backend
npm install
cp .env.example .env  # Настройте переменные окружения
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env  # Настройте переменные окружения
npm run dev
```

## 📚 API Endpoints

### Аутентификация

- `POST /api/auth/register` - Регистрация пользователя
- `POST /api/auth/login` - Авторизация пользователя

### Парковочные места

- `GET /api/parking-spots` - Получение списка парковочных мест
- `GET /api/parking-spots/{id}/available-times` - Получение доступных временных слотов

### Бронирования

- `POST /api/reservations` - Создание бронирования
- `GET /api/reservations/{userId}` - История бронирований пользователя
- `DELETE /api/reservations/{id}` - Отмена бронирования

## 🔒 Безопасность

- JWT аутентификация
- Хеширование паролей
- Защита от CSRF
- Валидация входных данных

## 📱 Адаптивность

Приложение полностью адаптивно и корректно отображается на:

- Десктопных устройствах
- Планшетах
- Мобильных устройствах

