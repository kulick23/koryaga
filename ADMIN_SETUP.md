# KORYAGA: Supabase + Telegram Mini App

## Что уже реализовано

- Публичный каталог читает категории и товары из Supabase.
- Если Supabase ещё не настроен или временно недоступен, сайт использует прежний JSON-каталог.
- `/admin` работает как Telegram Mini App.
- Telegram подписывает данные пользователя, Vercel Function проверяет подпись и Telegram ID администратора.
- Администратор может создавать, переименовывать и удалять пустые категории.
- Администратор может добавлять, редактировать, скрывать и удалять товары, менять цену, описание, состав, размер, плашку и фото.
- Изображения загружаются в публичный Supabase Storage bucket `product-images`.
- Заказ отправляется через существующий EmailJS и дополнительно в Telegram.

## 1. Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com).
2. Откройте `SQL Editor` → `New query`.
3. Выполните файл `supabase/schema.sql`.
4. Создайте ещё один запрос и выполните `supabase/seed.sql`. Он импортирует текущий каталог.
5. Откройте `Project Settings` → `API`.
6. Скопируйте `Project URL`, `Publishable key` (или legacy `anon`) и серверный `service_role` key.

`service_role` нельзя добавлять в переменную с префиксом `VITE_`, коммитить или отправлять клиенту.

## 2. Создание Telegram-бота

1. Напишите `@BotFather` и выполните `/newbot`.
2. Сохраните выданный bot token.
3. После первого деплоя выполните в BotFather `/setmenubutton`.
4. Выберите бота, укажите текст кнопки `Управление каталогом` и URL:

   `https://koryaga.vercel.app/admin`

5. Узнайте Telegram ID администратора: напишите созданному боту любое сообщение и откройте:

   `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`

   Нужное число находится в `result[].message.from.id`.

6. Для личных уведомлений о заказах используйте это же число как `TELEGRAM_ORDER_CHAT_ID`.
7. Для группы добавьте бота в группу, отправьте сообщение и возьмите отрицательный `message.chat.id` из `getUpdates`.

Webhook для этой схемы не нужен: бот отправляет сообщения через Bot API, а Mini App открывается кнопкой меню.

## 3. Переменные Vercel

В Vercel откройте `Project` → `Settings` → `Environment Variables` и добавьте:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
TELEGRAM_BOT_TOKEN=123456:ABCDEF
TELEGRAM_ORDER_CHAT_ID=123456789
TELEGRAM_ADMIN_IDS=123456789
```

Для нескольких администраторов укажите ID через запятую:

```env
TELEGRAM_ADMIN_IDS=123456789,987654321
```

Существующие `VITE_EMAILJS_*` оставьте без изменений. После добавления env выполните новый deploy.

## 4. Локальная проверка

Обычный `npm run dev` запускает только Vite и не поднимает функции из `/api`. Для полной проверки установите Vercel CLI и используйте:

```bash
npm i -g vercel
vercel dev
```

Для локального входа без Telegram создайте `.env.local` и добавьте одинаковое случайное значение:

```env
ADMIN_DEV_KEY=local-random-secret
VITE_ADMIN_DEV_KEY=local-random-secret
```

Этот режим отключён в production. Откройте `http://localhost:3000/admin`.

## 5. Проверка после деплоя

1. Откройте сайт и убедитесь, что товары загрузились.
2. Откройте бота → `Управление каталогом`.
3. Создайте тестовую категорию и товар с фотографией.
4. Обновите публичный сайт и проверьте изменения.
5. Оформите тестовый заказ: письмо должно прийти через EmailJS, а сообщение — в Telegram.

## Безопасность

- Публичный браузер получает только publishable/anon key и может читать только активные записи по RLS.
- Создание, изменение, удаление и загрузка изображений выполняются только серверной функцией.
- Сервер проверяет HMAC-подпись Telegram и разрешает доступ только ID из `TELEGRAM_ADMIN_IDS`.
- `SUPABASE_SERVICE_ROLE_KEY` и `TELEGRAM_BOT_TOKEN` доступны только Vercel Functions.
