# Tut Dessert

Статический сайт кондитерской Tut Dessert для GitHub Pages + Supabase.

## Подключение Supabase

1. В Supabase откройте **Connect** или **Settings → API Keys**.
2. Возьмите **Project URL** и **Publishable key** (`sb_publishable_...`). Старый `anon` key также работает, но Supabase рекомендует новый publishable key.
3. Откройте `supabase-config.js` и вставьте значения:

```js
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_...";
```

Никогда не вставляйте сюда `secret` или `service_role` key.

4. В SQL Editor выполните `supabase-schema.sql`, если ещё не выполняли финальную версию политик.
5. Откройте `/admin.html`, войдите администратором и нажмите **Загрузить исходный каталог** один раз.
6. После этого цены редактируются в админке и сохраняются для всех посетителей.

## GitHub Pages

Сайт рассчитан на публикацию из ветки `main`, корень `/(root)`.


### Настройки сайта
Адрес, телефон, WhatsApp, часы работы, ссылка 2ГИС и ссылки на логотип/Instagram теперь редактируются в админ-панели. Для этого один раз выполните обновлённый `supabase-schema.sql` в Supabase SQL Editor.
