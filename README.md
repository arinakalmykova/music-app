# MusicApp 🎵

**MusicApp** — это SPA-приложение для поиска музыки, просмотра информации об артистах, топ-треков, альбомов и похожих исполнителей.  

---

## 🛠 Технологии

- **React** + TypeScript  
- **Redux Toolkit & RTK Query** для управления состоянием и работы с API  
- **React Router** для маршрутизации  
- **Last.fm API** — данные об артистах, топ-треках и альбомах  
- **iTunes API** — для предпрослушивания треков  
- **Phosphor Icons** — иконки  
- Vitest + React Testing Library для тестов
- CSS-модули / SCSS для стилизации  

---

## ⚡ Особенности

- Поиск артистов по имени  
- Просмотр информации об артисте: жанры, слушатели  
- Топ-треки и топ-альбомы артиста  
- Похожие артисты  
- Возможность ставить лайки трекам и сохранять их в localStorage  
- Превью треков через iTunes  
- Чарты

---

## 🚀 Запуск проекта

1. Клонируйте репозиторий:

```bash
git clone https://github.com/arinakalmykova/music-app.git
````

2. Установите зависимости:

```bash
npm install
```

3. Запустите проект:

```bash
npm run dev
```

4. Откройте [http://localhost:5173](http://localhost:5173) в браузере

---

## 🔑 API

* **Last.fm API** — для информации об артистах, альбомах и топ-треках
* **iTunes API** — для предпрослушивания треков

> Для работы приложения нужен `LASTFM_API_KEY`. Добавьте его в `.env`:

```env
VITE_LASTFM_API_KEY=ваш_ключ
```

---

## 📂 Структура проекта

* `src/app` — настройка Redux, кастомные хуки
* `src/entities` — сущности: Artist, Album, Track, API
* `src/features` — логика и хуки для работы с API
* `src/widgets` — UI-компоненты (TrackCard, AlbumCard, ArtistCard)
* `src/shared` — утилиты и константы
* `src/test` - Unit тесты

---
## Тесты

В проекте реализованы базовые тесты компонентов и RTK Query:
Unit-тесты компонентов – проверяют корректный рендер карточек трека и страницы артиста.
Mock RTK Query – для проверки компонентов или хуков, использующих данные из API, без реальных запросов.

Примеры тестов:

```bash
// TrackCard.test.tsx
render(<TrackCard track={track} />);
expect(screen.getByText('Track 1')).toBeInTheDocument();
expect(screen.getByText('Artist 1')).toBeInTheDocument();
```

Запуск тестов

```bash
npm run test
```

Тесты написаны с использованием Vitest и React Testing Library.
Включают проверку рендера компонентов и работу хуков с моками RTK Query.

## ⚡ Планируемые улучшения

* Улучшенный предпросмотр треков
* Стилизация

---

## 💻 Автор Калмыкова Арина

Разработано с ❤️ для изучения React, Redux Toolkit и работы с музыкальными API.
