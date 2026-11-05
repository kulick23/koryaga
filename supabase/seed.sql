begin;
delete from public.products;
delete from public.categories;

insert into public.categories (name, sort_order, is_active) values ('Букеты к 8-му марта', 0, true);
insert into public.categories (name, sort_order, is_active) values ('Букеты', 1, true);
insert into public.categories (name, sort_order, is_active) values ('Композиции для оформлений', 2, true);
insert into public.categories (name, sort_order, is_active) values ('Траурная флористика', 3, true);
insert into public.categories (name, sort_order, is_active) values ('Рутарий в коряжке', 4, true);
insert into public.categories (name, sort_order, is_active) values ('Корпаративные заказы', 5, true);
insert into public.categories (name, sort_order, is_active) values ('Весенние композиции с первоцветами', 6, true);

insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  1,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 5-ти тюльпанов',
  null,
  35,
  null,
  '/items/bouquet-1.PNG',
  array['/items/bouquet-1.PNG']::text[],
  null,
  '{}'::text[],
  'Хит',
  0,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  2,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 5-ти тюльпанов',
  null,
  35,
  null,
  '/items/bouquet-2.PNG',
  array['/items/bouquet-2.PNG']::text[],
  null,
  '{}'::text[],
  null,
  1,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  3,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 5-ти тюльпанов',
  null,
  35,
  null,
  '/items/bouquet-3.PNG',
  array['/items/bouquet-3.PNG']::text[],
  null,
  '{}'::text[],
  'Новинка',
  2,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  4,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 17-ти тюльпанов',
  null,
  85,
  null,
  '/items/bouquet-4.PNG',
  array['/items/bouquet-4.PNG']::text[],
  null,
  '{}'::text[],
  null,
  3,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  5,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 17-ти тюльпанов',
  null,
  85,
  null,
  '/items/bouquet-5.PNG',
  array['/items/bouquet-5.PNG']::text[],
  null,
  '{}'::text[],
  'Скидка',
  4,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  6,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 17-ти тюльпанов',
  null,
  85,
  null,
  '/items/bouquet-6.PNG',
  array['/items/bouquet-6.PNG']::text[],
  null,
  '{}'::text[],
  null,
  5,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  7,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 17-ти тюльпанов',
  null,
  85,
  null,
  '/items/bouquet-7.PNG',
  array['/items/bouquet-7.PNG']::text[],
  null,
  '{}'::text[],
  'Премиум',
  6,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  8,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 17-ти тюльпанов',
  null,
  85,
  null,
  '/items/bouquet-8.PNG',
  array['/items/bouquet-8.PNG']::text[],
  null,
  '{}'::text[],
  null,
  7,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  9,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 17-ти тюльпанов',
  null,
  85,
  null,
  '/items/bouquet-9.PNG',
  array['/items/bouquet-9.PNG']::text[],
  null,
  '{}'::text[],
  null,
  8,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  10,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 17-ти тюльпанов',
  null,
  85,
  null,
  '/items/bouquet-10.PNG',
  array['/items/bouquet-10.PNG']::text[],
  null,
  '{}'::text[],
  'Новинка',
  9,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  11,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 15-ти тюльпанов',
  null,
  70,
  null,
  '/items/bouquet-11.png',
  array['/items/bouquet-11.png']::text[],
  null,
  '{}'::text[],
  null,
  10,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  12,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 15-ти тюльпанов',
  null,
  70,
  null,
  '/items/bouquet-12.png',
  array['/items/bouquet-12.png']::text[],
  null,
  '{}'::text[],
  'Премиум',
  11,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  13,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 25-ти тюльпанов',
  null,
  125,
  null,
  '/items/bouquet-13.jpg',
  array['/items/bouquet-13.jpg']::text[],
  null,
  '{}'::text[],
  null,
  12,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  14,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 35-ти тюльпанов',
  null,
  150,
  null,
  '/items/bouquet-14.jpg',
  array['/items/bouquet-14.jpg']::text[],
  null,
  '{}'::text[],
  null,
  13,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  15,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из розовых тюльпанов 25 штук',
  null,
  110,
  null,
  '/items/bouquet-15.jpg',
  array['/items/bouquet-15.jpg']::text[],
  null,
  '{}'::text[],
  null,
  14,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  16,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет нежность 25-ти тюльпанов',
  null,
  125,
  null,
  '/items/bouquet-16.jpg',
  array['/items/bouquet-16.jpg']::text[],
  null,
  '{}'::text[],
  null,
  15,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  17,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из красных тюльпанов 11 штук',
  null,
  55,
  null,
  '/items/bouquet-17.jpg',
  array['/items/bouquet-17.jpg']::text[],
  null,
  '{}'::text[],
  null,
  16,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  18,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет весенний микс из 35-ти тюльпанов',
  null,
  150,
  null,
  '/items/bouquet-18.jpg',
  array['/items/bouquet-18.jpg']::text[],
  null,
  '{}'::text[],
  null,
  17,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  19,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из жёлтых тюльпанов 13 штук',
  null,
  70,
  null,
  '/items/bouquet-19.jpg',
  array['/items/bouquet-19.jpg']::text[],
  null,
  '{}'::text[],
  null,
  18,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  20,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 29-ти тюльпанов',
  null,
  130,
  null,
  '/items/bouquet-20.jpg',
  array['/items/bouquet-20.jpg']::text[],
  null,
  '{}'::text[],
  null,
  19,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  21,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 15-ти тюльпанов',
  null,
  70,
  null,
  '/items/bouquet-21.png',
  array['/items/bouquet-21.png']::text[],
  null,
  '{}'::text[],
  null,
  20,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  22,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 15-ти тюльпанов',
  null,
  70,
  null,
  '/items/bouquet-22.png',
  array['/items/bouquet-22.png']::text[],
  null,
  '{}'::text[],
  null,
  21,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  28,
  (select id from public.categories where name = 'Букеты к 8-му марта'),
  'Букет из 15-ти тюльпанов',
  null,
  70,
  null,
  '/items/bouquet-28.png',
  array['/items/bouquet-28.png']::text[],
  null,
  '{}'::text[],
  null,
  22,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  23,
  (select id from public.categories where name = 'Букеты'),
  'Букет из 15-ти цветов',
  null,
  70,
  null,
  '/items/bouquet-23.png',
  array['/items/bouquet-23.png']::text[],
  null,
  '{}'::text[],
  null,
  23,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  24,
  (select id from public.categories where name = 'Букеты'),
  'Букет из 15-ти цветов',
  null,
  70,
  null,
  '/items/bouquet-24.png',
  array['/items/bouquet-24.png']::text[],
  null,
  '{}'::text[],
  null,
  24,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  25,
  (select id from public.categories where name = 'Букеты'),
  'Букет из 15-ти цветов',
  null,
  70,
  null,
  '/items/bouquet-25.png',
  array['/items/bouquet-25.png']::text[],
  null,
  '{}'::text[],
  null,
  25,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  26,
  (select id from public.categories where name = 'Букеты'),
  'Букет из 15-ти цветов',
  null,
  70,
  null,
  '/items/bouquet-26.png',
  array['/items/bouquet-26.png']::text[],
  null,
  '{}'::text[],
  null,
  26,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  27,
  (select id from public.categories where name = 'Букеты'),
  'Букет из 15-ти цветов',
  null,
  70,
  null,
  '/items/bouquet-27.png',
  array['/items/bouquet-27.png']::text[],
  null,
  '{}'::text[],
  null,
  27,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  29,
  (select id from public.categories where name = 'Композиции для оформлений'),
  'Композиция 1',
  null,
  null,
  'Договорная',
  '/items/bouquet-29.png',
  array['/items/bouquet-29.png']::text[],
  null,
  '{}'::text[],
  null,
  28,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  30,
  (select id from public.categories where name = 'Композиции для оформлений'),
  'Композиция 2',
  null,
  null,
  'Договорная',
  '/items/bouquet-30.png',
  array['/items/bouquet-30.png']::text[],
  null,
  '{}'::text[],
  null,
  29,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  31,
  (select id from public.categories where name = 'Композиции для оформлений'),
  'Композиция 3',
  null,
  null,
  'Договорная',
  '/items/bouquet-31.png',
  array['/items/bouquet-31.png']::text[],
  null,
  '{}'::text[],
  null,
  30,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  63,
  (select id from public.categories where name = 'Траурная флористика'),
  'Дыхание природы',
  'Натуральная композиция с мхом, веточками и мягкими природными оттенками. Олицетворяет естественность, спокойствие и тихую связь с природой.',
  150,
  null,
  '/items/bouquet-63.jpg',
  array['/items/bouquet-63.jpg']::text[],
  'S, 30-35 см',
  array['Калла', 'Хризантема или георгин', 'Эвкалипт или листья', 'Хвоя или туя', 'Ягодки и мелкие элементы', 'Березовые ветки', 'Сухоцвет (пампас или трава)']::text[],
  null,
  31,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  64,
  (select id from public.categories where name = 'Траурная флористика'),
  'Светлая память',
  'Композиция в форме сердца с нежными белыми цветами и природным мхом. Символ любви, которая остается, и светлой памяти, живущей в сердце.',
  250,
  null,
  '/items/bouquet-64.jpg',
  array['/items/bouquet-64.jpg']::text[],
  'M, диаметр 40-45 см, высота 15-20 см, выступ композиции 15 см',
  array['Розы', 'Лилии', 'Гипсофила или гортензия', 'Бруния или скимия', 'Эвкалипт', 'Папоротник', 'Общая зелень', 'Березовые ветки', 'Сухоцвет или перья', 'Мох']::text[],
  null,
  32,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  65,
  (select id from public.categories where name = 'Траурная флористика'),
  'Нежность сквозь время',
  'Композиция с мягкими розовыми оттенками и природными элементами. О теплых воспоминаниях, которые не тускнеют с годами.',
  200,
  null,
  '/items/bouquet-65.jpg',
  array['/items/bouquet-65.jpg']::text[],
  'S-M, диаметр 35-40 см, высота 12-15 см',
  array['Пионовидные розы', 'Мелкие розы', 'Декоративные соцветия (пудровые, типа астильбы)', 'Туя', 'Эвкалипт', 'Микс зелени', 'Мох', 'Декор (береза, кора)']::text[],
  null,
  33,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  66,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с кольцом (белая с серебром)',
  'Светлая композиция с холодными оттенками и декоративным кольцом.',
  250,
  null,
  '/items/bouquet-66.jpg',
  array['/items/bouquet-66.jpg']::text[],
  'Длина 45-55 см, ширина 25-30 см, высота с кольцом 45-50 см',
  array['Белые каллы', 'Декоративные мелкие соцветия', 'Эвкалипт', 'Туя или кипарис', 'Папоротник', 'Микс зелени', 'Березная кора', 'Декоративные ветки', 'Перья или сухоцвет', 'Шарики (бруния)', 'Металлическое кольцо', 'Мох']::text[],
  null,
  34,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  67,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с красными розами',
  'Классический вариант в насыщенном красном цвете. Более выразительная и эмоциональная композиция.',
  250,
  null,
  '/items/bouquet-67.jpg',
  array['/items/bouquet-67.jpg']::text[],
  'Длина 50-60 см, ширина 25-30 см, высота с кольцом 40-45 см',
  array['Красные розы', 'Хризантема или гвоздика', 'Туя или кипарис', 'Эвкалипт', 'Широкий лист', 'Красные декоративные элементы (перец или ягоды)', 'Черное металлическое кольцо', 'Основа']::text[],
  null,
  35,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  68,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с хризантемами (природная)',
  'Композиция с добавлением веточек, ягод и натуральных элементов. Спокойная, немного лесная.',
  160,
  null,
  '/items/bouquet-68.jpg',
  array['/items/bouquet-68.jpg']::text[],
  'M, длина 45-50 см, ширина 30-35 см, высота 18-22 см',
  array['Крупная хризантема', 'Декоративные шарики (бруния или аллиум)', 'Мелкие соцветия', 'Туя или кипарис', 'Мелкая зелень', 'Эвкалипт', 'Извилистые ветки', 'Декоративные орехи или шишки', 'Лоза или корни', 'Декоративные шарики', 'Основа', 'Мох']::text[],
  null,
  36,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  69,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция со свечами (длинная)',
  'Вытянутая композиция со свечами и белыми цветами.',
  320,
  null,
  '/items/bouquet-69.jpg',
  array['/items/bouquet-69.jpg']::text[],
  'L, длина 55-80 см, ширина 20-25 см, высота 15-20 см',
  array['Каллы или белые лилии', 'Белая гортензия', 'Мелкие цветы', 'Папоротник', 'Длинная линейная зелень', 'Дополнительная зелень', 'Декоративные ветки', 'Свечи', 'Основа (пластик или дерево)']::text[],
  null,
  37,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  70,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с фонарем 1',
  'Нежная бело-зеленая гамма, наполненная спокойствием и светом. Ощущение чистоты, покоя и внутреннего умиротворения.',
  null,
  '340-400 Br',
  '/items/bouquet-70.jpg',
  array['/items/bouquet-70.jpg']::text[],
  'M / M+, длина 55-60 см, ширина 30-35 см, высота с фонарем 25-30 см',
  array['Крупная белая хризантема', 'Пион или ранункулюс', 'Мелкая хризантема', 'Мелкие белые цветы', 'Основная зелень (микс)', 'Ампельная зелень', 'Декоративная зелень', 'Легкие текстурные вставки', 'Деревянный фонарь со свечой']::text[],
  null,
  38,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  71,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с фонарем 2',
  'Глубокие фиолетовые оттенки, символизирующие уважение и вечную связь. Сдержанная, благородная композиция для особой памяти.',
  360,
  null,
  '/items/bouquet-71.jpg',
  array['/items/bouquet-71.jpg']::text[],
  'M+ / L, длина 55-70 см, ширина 35-40 см, высота с фонарем 25-30 см',
  array['Розы (фиолетовые или пыльная роза)', 'Гербера', 'Орхидея (ветка)', 'Мелкие розы или бутоны', 'Основная зелень', 'Ампельная зелень', 'Мелкая зелень', 'Деревянный фонарь со светодиодной свечой']::text[],
  null,
  39,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  72,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с фонарем 3',
  'Мягкие розово-лиловые оттенки, передающие тепло и любовь. Композиция о самых теплых и дорогих моментах.',
  300,
  null,
  '/items/bouquet-72.jpg',
  array['/items/bouquet-72.jpg']::text[],
  'M / M+, длина 50-65 см, ширина 35-40 см, высота с фонарем 25-30 см',
  array['Крупная розовая хризантема', 'Белая хризантема', 'Пудровые розы', 'Ранункулюс или лютик', 'Розовая калла', 'Основная зелень', 'Ампельная зелень', 'Мелкая зелень', 'Деревянный фонарь', 'Основа']::text[],
  null,
  40,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  73,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с фонарем 4',
  'Естественная зелено-кремовая палитра с акцентом на природность. Символ тихой, светлой памяти и гармонии.',
  270,
  null,
  '/items/bouquet-73.jpg',
  array['/items/bouquet-73.jpg']::text[],
  'M+, длина 50-60 см, ширина 30-35 см, высота с фонарем 25-30 см',
  array['Розы', 'Лилия', 'Артишок', 'Основная зелень (эвкалипт или микс)', 'Ампельная зелень', 'Мелкая зелень', 'Деревянный фонарь', 'Основа']::text[],
  null,
  41,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  74,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с фонарем 5',
  'Глубокие бордовые и пудровые оттенки. Выразительная композиция с чувством достоинства и уважения.',
  290,
  null,
  '/items/bouquet-74.jpg',
  array['/items/bouquet-74.jpg']::text[],
  'L, длина 60-75 см, ширина 35-40 см, высота с фонарем 25-30 см',
  array['Бордовые розы', 'Пудровые розы', 'Бордовый георгин', 'Крупная ветка орхидеи', 'Мелкая орхидея', 'Мелкие бутоны', 'Основная зелень', 'Ампельная зелень', 'Мелкая зелень', 'Деревянный фонарь']::text[],
  null,
  42,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  75,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с фонарем 6',
  'Светлая, воздушная композиция в бело-зеленой гамме. Олицетворяет светлую память и покой.',
  260,
  null,
  '/items/bouquet-75.jpg',
  array['/items/bouquet-75.jpg']::text[],
  'M / L, длина 55-65 см, ширина 30-35 см, высота с фонарем 25-30 см',
  array['Кремовые розы', 'Каллы или белые лилии', 'Бордовый георгин', 'Хризантема', 'Мелкие цветы и соцветия', 'Декоративные ягоды', 'Основная зелень (папоротник или микс)', 'Широколистная зелень', 'Ампельная зелень', 'Белый фонарь']::text[],
  null,
  43,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  76,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с фонарем 7',
  'Контраст белого и бордового как символ любви и утраты. Сильная, эмоциональная композиция.',
  380,
  null,
  '/items/bouquet-76.jpg',
  array['/items/bouquet-76.jpg']::text[],
  'L, длина 60-70 см, ширина 35-40 см, высота с фонарем 25-30 см',
  array['Бордовые розы', 'Кремовые розы', 'Каллы или белые лилии', 'Крупная хризантема', 'Зеленый ранункулюс', 'Бордовая орхидея', 'Мелкие цветы и соцветия', 'Основная зелень (папоротник или микс)', 'Декоративная игольчатая или фактурная зелень', 'Ампельная зелень', 'Белый фонарь']::text[],
  null,
  44,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  77,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с фонарем 8',
  'Светлая, воздушная композиция в бело-зеленой гамме. Олицетворяет светлую память и покой.',
  350,
  null,
  '/items/bouquet-77.jpg',
  array['/items/bouquet-77.jpg']::text[],
  'L, длина 60-70 см, ширина 35-40 см, высота с фонарем 25-30 см',
  array['Розы кремовые или айвори', 'Лилия или лилейник', 'Бутоны или мелкие розы', 'Белые мелкие цветы и соцветия', 'Папоротник', 'Широколистная зелень', 'Тонкая ампельная зелень', 'Белые декоративные ветки', 'Черный фонарь']::text[],
  null,
  45,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  78,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с фонарем 9',
  'Сочетание нежности и силы. О том, что память не подвластна времени.',
  360,
  null,
  '/items/bouquet-78.jpg',
  array['/items/bouquet-78.jpg']::text[],
  'L, длина 65-75 см, ширина 35-45 см, высота с фонарем 25-30 см',
  array['Розы кремовые или пудровые', 'Розовые розы', 'Розовая калла', 'Ярко-розовый георгин или пион', 'Розовая орхидея', 'Хризантема', 'Бутоны или мелкие цветы', 'Монстера или широколистная зелень', 'Основная зелень', 'Ампельная зелень', 'Золотые листья', 'Белый фонарь']::text[],
  null,
  46,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  79,
  (select id from public.categories where name = 'Траурная флористика'),
  'Композиция с каллами (белая)',
  'Строгая и чистая композиция в бело-зеленой гамме. Подходит для сдержанного и аккуратного оформления.',
  null,
  'Договорная',
  '/items/bouquet-79.jpg',
  array['/items/bouquet-79.jpg']::text[],
  'S, диаметр 30-35 см, высота 18-22 см',
  array['Белые каллы', 'Белые розы', 'Зеленые розы', 'Мелкие цветы', 'Основная зелень', 'Серебристая зелень', 'Широколистная зелень', 'Основа']::text[],
  null,
  47,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  80,
  (select id from public.categories where name = 'Траурная флористика'),
  'Круглая композиция с кольцом (нежная гамма)',
  'Легкая композиция в светло-розовых и темных акцентах с декоративным кольцом.',
  null,
  'Договорная',
  '/items/bouquet-80.jpg',
  array['/items/bouquet-80.jpg']::text[],
  'Длина 40-50 см, ширина 25-30 см, высота с кольцом 40-45 см, диаметр кольца 30-35 см',
  array['Крупный георгин', 'Одноголовые розы', 'Хризантема, пионовидные розы или пионы', 'Мелкие цветы', 'Зелень: эвкалипт и папоротник', 'Декор (перо или сухоцвет)', 'Основа (дерево, кора или пластик)', 'Металлическое кольцо черное или золотое']::text[],
  null,
  48,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  32,
  (select id from public.categories where name = 'Рутарий в коряжке'),
  'Рутарий в морёной коряжке с Фаленопсисом и суккулентами',
  null,
  null,
  'от 300 рублей под заказ',
  '/items/optimized/bouquet-32.png',
  array['/items/optimized/bouquet-32.png']::text[],
  null,
  '{}'::text[],
  null,
  49,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  33,
  (select id from public.categories where name = 'Рутарий в коряжке'),
  'Рутарий в морёной коряжке с Фаленопсисом и суккулентами',
  null,
  null,
  'от 300 рублей под заказ',
  '/items/optimized/bouquet-33.png',
  array['/items/optimized/bouquet-33.png']::text[],
  null,
  '{}'::text[],
  null,
  50,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  35,
  (select id from public.categories where name = 'Рутарий в коряжке'),
  'Рутарий в морёной коряжке с Фаленопсисом и суккулентами',
  null,
  null,
  'от 300 рублей под заказ',
  '/items/optimized/bouquet-35.png',
  array['/items/optimized/bouquet-35.png']::text[],
  null,
  '{}'::text[],
  null,
  51,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  36,
  (select id from public.categories where name = 'Рутарий в коряжке'),
  'Рутарий в морёной коряжке с Фаленопсисом и суккулентами',
  null,
  null,
  'от 300 рублей под заказ',
  '/items/optimized/bouquet-36.png',
  array['/items/optimized/bouquet-36.png']::text[],
  null,
  '{}'::text[],
  null,
  52,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  37,
  (select id from public.categories where name = 'Рутарий в коряжке'),
  'Рутарий в морёной коряжке с Фаленопсисом и суккулентами',
  null,
  null,
  'от 250 рублей под заказ',
  '/items/optimized/bouquet-37.png',
  array['/items/optimized/bouquet-37.png']::text[],
  null,
  '{}'::text[],
  null,
  53,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  38,
  (select id from public.categories where name = 'Рутарий в коряжке'),
  'Рутарий с фаленопсисом',
  null,
  null,
  'от 250 рублей под заказ',
  '/items/bouquet-38.png',
  array['/items/bouquet-38.png']::text[],
  null,
  '{}'::text[],
  null,
  54,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  39,
  (select id from public.categories where name = 'Корпаративные заказы'),
  'Кампанула',
  null,
  70,
  null,
  '/items/bouquet-39.png',
  array['/items/bouquet-39.png']::text[],
  null,
  '{}'::text[],
  null,
  55,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  40,
  (select id from public.categories where name = 'Корпаративные заказы'),
  'Лаванда в ящичке',
  null,
  75,
  null,
  '/items/bouquet-40.png',
  array['/items/bouquet-40.png']::text[],
  null,
  '{}'::text[],
  null,
  56,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  41,
  (select id from public.categories where name = 'Корпаративные заказы'),
  'Мускари в эко кашпо',
  null,
  20,
  null,
  '/items/bouquet-41.JPG',
  array['/items/bouquet-41.JPG']::text[],
  null,
  '{}'::text[],
  null,
  57,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  42,
  (select id from public.categories where name = 'Корпаративные заказы'),
  'Гортензия карликовая в эко кашпо',
  null,
  65,
  null,
  '/items/bouquet-42.jpg',
  array['/items/bouquet-42.jpg']::text[],
  null,
  '{}'::text[],
  null,
  58,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  43,
  (select id from public.categories where name = 'Корпаративные заказы'),
  'Гиацинты без полива',
  null,
  20,
  null,
  '/items/bouquet-43.JPG',
  array['/items/bouquet-43.JPG']::text[],
  null,
  '{}'::text[],
  null,
  59,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  44,
  (select id from public.categories where name = 'Корпаративные заказы'),
  'Кампанула с оформлением',
  null,
  65,
  null,
  '/items/bouquet-44.JPG',
  array['/items/bouquet-44.JPG']::text[],
  null,
  '{}'::text[],
  null,
  60,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  45,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Весенний ящичек с первоцветами',
  null,
  65,
  null,
  '/items/optimized/bouquet-45.png',
  array['/items/optimized/bouquet-45.png']::text[],
  null,
  '{}'::text[],
  null,
  61,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  46,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Мини садик с Лавандой и луковичными',
  null,
  120,
  null,
  '/items/bouquet-46.png',
  array['/items/bouquet-46.png']::text[],
  null,
  '{}'::text[],
  null,
  62,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  47,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Мини садик «Весна на подоконнике»',
  null,
  120,
  null,
  '/items/bouquet-47.png',
  array['/items/bouquet-47.png']::text[],
  null,
  '{}'::text[],
  null,
  63,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  48,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Мини садик «Весна на подоконнике»',
  null,
  120,
  null,
  '/items/bouquet-48.png',
  array['/items/bouquet-48.png']::text[],
  null,
  '{}'::text[],
  null,
  64,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  49,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Мини садик «Весна на подоконнике»',
  null,
  120,
  null,
  '/items/bouquet-49.png',
  array['/items/bouquet-49.png']::text[],
  null,
  '{}'::text[],
  null,
  65,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  50,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Мини садик «Весна на подоконнике»',
  null,
  120,
  null,
  '/items/bouquet-50.png',
  array['/items/bouquet-50.png']::text[],
  null,
  '{}'::text[],
  null,
  66,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  51,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая полянка в пеньке с гиацинтами / нарцисссами',
  null,
  60,
  null,
  '/items/bouquet-51.png',
  array['/items/bouquet-51.png']::text[],
  null,
  '{}'::text[],
  null,
  67,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  52,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая полянка в пеньке с гиацинтами / нарцисссами',
  null,
  60,
  null,
  '/items/bouquet-52.png',
  array['/items/bouquet-52.png']::text[],
  null,
  '{}'::text[],
  null,
  68,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  53,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая полянка в пеньке с гиацинтами / нарцисссами',
  null,
  60,
  null,
  '/items/bouquet-53.png',
  array['/items/bouquet-53.png']::text[],
  null,
  '{}'::text[],
  null,
  69,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  54,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая весенняя клумба в ящичке',
  null,
  170,
  null,
  '/items/optimized/bouquet-54.png',
  array['/items/optimized/bouquet-54.png']::text[],
  null,
  '{}'::text[],
  null,
  70,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  55,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая весенняя клумба в ящичке',
  null,
  170,
  null,
  '/items/bouquet-55.png',
  array['/items/bouquet-55.png']::text[],
  null,
  '{}'::text[],
  null,
  71,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  56,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая весенняя клумба в ящичке',
  null,
  170,
  null,
  '/items/optimized/bouquet-56.png',
  array['/items/optimized/bouquet-56.png']::text[],
  null,
  '{}'::text[],
  null,
  72,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  57,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая весенняя клумба в ящичке',
  null,
  170,
  null,
  '/items/bouquet-57.png',
  array['/items/bouquet-57.png']::text[],
  null,
  '{}'::text[],
  null,
  73,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  58,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая весенняя клумба в ящичке',
  null,
  170,
  null,
  '/items/bouquet-58.JPG',
  array['/items/bouquet-58.JPG']::text[],
  null,
  '{}'::text[],
  null,
  74,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  59,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая весенняя клумба в ящичке',
  null,
  170,
  null,
  '/items/bouquet-59.JPG',
  array['/items/bouquet-59.JPG']::text[],
  null,
  '{}'::text[],
  null,
  75,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  60,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая весенняя клумба в ящичке',
  null,
  170,
  null,
  '/items/optimized/bouquet-60.png',
  array['/items/optimized/bouquet-60.png']::text[],
  null,
  '{}'::text[],
  null,
  76,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  61,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Большая весенняя клумба в ящичке',
  null,
  170,
  null,
  '/items/optimized/bouquet-61.png',
  array['/items/optimized/bouquet-61.png']::text[],
  null,
  '{}'::text[],
  null,
  77,
  true
);
insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  62,
  (select id from public.categories where name = 'Весенние композиции с первоцветами'),
  'Лаванда французская в ящичке',
  null,
  80,
  null,
  '/items/optimized/bouquet-62.png',
  array['/items/optimized/bouquet-62.png']::text[],
  null,
  '{}'::text[],
  null,
  78,
  true
);

select setval(pg_get_serial_sequence('public.categories', 'id'), coalesce(max(id), 1)) from public.categories;
select setval(pg_get_serial_sequence('public.products', 'id'), coalesce(max(id), 1)) from public.products;
commit;
