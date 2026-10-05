const supabaseClient = window.supabaseClient;

// Tut Dessert — admin panel

const ADMIN_EMAIL = "makhuseev0103@gmail.com";

const IMAGE_BUCKET = "product-images";
const GALLERY_BUCKET = "gallery-images";
const GALLERY_SLOTS = 22;

const DEFAULTS = [
  {id:"bento",name:"Бенто-торт",category:"Торты",price:4000,price_label:"",unit:"₸/шт.",emoji:"🎂",desc:"Небольшой торт для маленького, но важного повода."},
  {id:"meringue",name:"Меренговый рулет",category:"Торты",price:5000,price_label:"",unit:"₸/шт.",emoji:"🍓",desc:"Воздушное безе с нежной начинкой."},
  {id:"milk",name:"Молочная девочка",category:"Торты",price:6000,price_label:"",unit:"₸/кг",emoji:"🍰",desc:"Тонкие коржи на сгущённом молоке, крем-чиз."},
  {id:"honey",name:"Медовый",category:"Торты",price:6000,price_label:"",unit:"₸/кг",emoji:"🍯",desc:"Классический торт с ароматным мёдом."},
  {id:"red",name:"Красный бархат",category:"Торты",price:6000,price_label:"",unit:"₸/кг",emoji:"🍒",desc:"Нежный бисквит и крем-чиз."},
  {id:"pistachio",name:"Фисташковый",category:"Торты",price:6000,price_label:"",unit:"₸/кг",emoji:"💚",desc:"Фисташковый бисквит, малиновый конфитюр, крем-чиз."},
  {id:"nutella",name:"Нутелла",category:"Торты",price:6000,price_label:"",unit:"₸/кг",emoji:"🍫",desc:"Шоколадный бисквит, крем-чиз с нутеллой."},
  {id:"whoopie",name:"Вуппи пай",category:"Торты",price:6000,price_label:"",unit:"₸/кг",emoji:"🧁",desc:"Шоколадный мини-бисквит с нежным крем-чизом."},
  {id:"snickers",name:"Сникерс",category:"Торты",price:6000,price_label:"",unit:"₸/кг",emoji:"🥜",desc:"Шоколадный бисквит, арахис и карамель."},
  {id:"caramel",name:"Шоко-карамель",category:"Торты",price:6000,price_label:"",unit:"₸/кг",emoji:"🍫",desc:"Шоколадный бисквит с карамельным кремом."},
  {id:"carrot",name:"Морковный",category:"Торты",price:6500,price_label:"",unit:"₸/кг",emoji:"🥕",desc:"Пряный бисквит с крем-чизом."},
  {id:"oreo",name:"Орео-кейк",category:"Торты",price:6500,price_label:"",unit:"₸/кг",emoji:"🍪",desc:"Шоколадный бисквит, крем-чиз и кусочки Oreo."},
  {id:"oriental",name:"Восточный пирог",category:"Пироги",price:null,price_label:"2800 / 4000",unit:"₸",emoji:"🥧",desc:"Домашний пирог. Доступны два размера."},
  {id:"curd-pie",name:"Творожный пирог",category:"Пироги",price:null,price_label:"2800 / 4000",unit:"₸",emoji:"🥧",desc:"Нежная творожная начинка."},
  {id:"banoffee",name:"Банофи пай",category:"Пироги",price:null,price_label:"2800 / 4000",unit:"₸",emoji:"🍌",desc:"Банан, карамель и нежный крем."},
  {id:"poppy",name:"Маковый пирог",category:"Пироги",price:5000,price_label:"",unit:"₸",emoji:"🥮",desc:"Ароматный пирог с маковой начинкой."},
  {id:"buns",name:"Булочки",category:"Пирожные",price:120,price_label:"",unit:"₸/шт.",emoji:"🥐",desc:"С творогом, сгущёнкой, повидлом или без начинки."},
  {id:"tubes",name:"Трубочки",category:"Пирожные",price:200,price_label:"",unit:"₸/шт.",emoji:"🥨",desc:"Хрустящие трубочки с нежной начинкой."},
  {id:"samsa",name:"Самса",category:"Пирожные",price:250,price_label:"",unit:"₸/шт.",emoji:"🥟",desc:"С курицей, мясом или сыром."},
  {id:"sochniki",name:"Сочники",category:"Пирожные",price:200,price_label:"",unit:"₸/шт.",emoji:"🍪",desc:"Нежная выпечка с творожной начинкой."},
  {id:"cupcakes",name:"Капкейки",category:"Пирожные",price:250,price_label:"",unit:"₸/шт.",emoji:"🧁",desc:"Шоколадный, ванильный или красный бархат; крем-чиз."},
  {id:"profiteroles",name:"Профитроли",category:"Пирожные",price:300,price_label:"",unit:"₸/шт.",emoji:"🍮",desc:"Заварное тесто и крем-пломбир."},
  {id:"pavlova",name:"Анна Павлова",category:"Пирожные",price:300,price_label:"",unit:"₸/шт.",emoji:"🍓",desc:"Воздушное безе с ягодным конфитюром и кремом-чиз."},
  {id:"buffet",name:"Фуршетные пирожные",category:"Пирожные",price:250,price_label:"",unit:"₸/шт.",emoji:"🍰",desc:"Ванильный, шоколадный или красный бархат."},
  {id:"thonmomo",name:"Тхонмомо",category:"Пирожные",price:300,price_label:"",unit:"₸/шт.",emoji:"🍬",desc:"Небольшое сладкое угощение."},
  {id:"tartlets",name:"Тарталетки",category:"Пирожные",price:400,price_label:"",unit:"₸/шт.",emoji:"🧁",desc:"Песочная основа, крем-пломбир и свежие ягоды."},
  {id:"curd-tartlets",name:"Творожные тарталетки",category:"Пирожные",price:400,price_label:"",unit:"₸/шт.",emoji:"🍓",desc:"Песочная основа, творожная начинка и безе."}
];

let data = [];
let galleryData = [];

const $ = id => document.getElementById(id);

const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({
  "&":"&amp;",
  "<":"&lt;",
  ">":"&gt;",
  '"':"&quot;",
  "'":"&#039;"
}[m]));

function show(id, value = true) {
  const e = $(id);
  if (e) e.classList.toggle("hidden", !value);
}

function status(message, type = "info") {
  const e = $("status");

  if (e) {
    e.textContent = message;
    e.className = "status " + type;
  }
}

function galleryStatus(message, type = "info") {
  const e = $("galleryStatus");

  if (e) {
    e.textContent = message;
    e.className = "status " + type;
  }
}


/* =========================================================
   ТОВАРЫ
   ========================================================= */

async function loadData() {
  const r = await supabaseClient
    .from("products")
    .select("*")
    .order("created_at", {ascending:true});

  if (r.error) throw r.error;

  data = r.data || [];

  render();
}

function render() {
  const rows = $("rows");

  if (!rows) return;

  rows.innerHTML = data.map((p, i) => `
    <div class="admin-row">

      <div class="product-image-cell">

        <div class="product-preview">
          ${
            p.image_url
              ? `<img src="${esc(p.image_url)}" alt="${esc(p.name)}">`
              : `<span>${esc(p.emoji || "🍰")}</span>`
          }
        </div>

        <label class="upload-btn">
          📷 Загрузить
          <input
            type="file"
            data-image="${i}"
            accept="image/*"
          >
        </label>

        ${
          p.image_url
            ? `<button type="button" class="remove-image" data-remove="${i}">Удалить</button>`
            : ""
        }

      </div>

      <div class="small">${esc(p.id)}</div>

      <input
        data-name="${i}"
        value="${esc(p.name)}"
      >

      <div>${esc(p.category)}</div>

      <input
        data-price="${i}"
        value="${p.price == null ? "" : p.price}"
        placeholder="6000"
      >

      <input
        data-label="${i}"
        value="${esc(p.price_label || "")}"
        placeholder="2800 / 4000"
      >

      <label class="switch">
        <input
          type="checkbox"
          data-active="${i}"
          ${p.is_active !== false ? "checked" : ""}
        >
        Активен
      </label>

    </div>
  `).join("");

  document.querySelectorAll("[data-image]").forEach(e => {
    e.onchange = () => uploadImage(+e.dataset.image, e.files[0]);
  });

  document.querySelectorAll("[data-remove]").forEach(e => {
    e.onclick = () => removeImage(+e.dataset.remove);
  });
}


async function uploadImage(i, file) {

  if (!file) return;

  if (file.size > 8 * 1024 * 1024) {
    status("Максимальный размер фото — 8 МБ.", "error");
    return;
  }

  const p = data[i];

  const ext = (file.name.split(".").pop() || "jpg")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") || "jpg";

  status("Загрузка фото…");

  const path = `products/${p.id}.${ext}`;

  const u = await supabaseClient.storage
    .from(IMAGE_BUCKET)
    .upload(path, file, {
      upsert:true,
      contentType:file.type,
      cacheControl:"3600"
    });

  if (u.error) {
    status(u.error.message, "error");
    return;
  }

  const url = supabaseClient.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(path).data.publicUrl;

  const r = await supabaseClient
    .from("products")
    .update({
      image_url:url
    })
    .eq("id",p.id);

  if (r.error) {
    status(r.error.message, "error");
    return;
  }

  data[i].image_url = url;

  render();

  status("Фото сохранено.", "success");
}


async function removeImage(i) {

  const p = data[i];

  if (!confirm("Удалить фото?")) return;

  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;

  if (p.image_url?.includes(marker)) {

    const path = decodeURIComponent(
      p.image_url
        .split(marker)[1]
        .split("?")[0]
    );

    await supabaseClient.storage
      .from(IMAGE_BUCKET)
      .remove([path]);
  }

  const r = await supabaseClient
    .from("products")
    .update({
      image_url:null
    })
    .eq("id",p.id);

  if (r.error) {
    status(r.error.message, "error");
    return;
  }

  data[i].image_url = null;

  render();

  status("Фото удалено.", "success");
}


/* =========================================================
   ЗАГРУЗКА ИСХОДНОГО КАТАЛОГА
   ========================================================= */

async function seed() {

  if (!confirm("Загрузить исходный каталог из 27 товаров?")) {
    return;
  }

  const old = {};

  data.forEach(p => {
    old[p.id] = p.image_url;
  });

  const payload = DEFAULTS.map(p => ({
    id:p.id,
    name:p.name,
    category:p.category,
    price:p.price,
    price_label:p.price_label,
    unit:p.unit,
    description:p.desc,
    emoji:p.emoji,
    image_url:old[p.id] || null,
    is_active:true
  }));

  const r = await supabaseClient
    .from("products")
    .upsert(payload,{onConflict:"id"});

  if (r.error) {
    status(r.error.message,"error");
    return;
  }

  await loadData();

  status("Каталог загружен.","success");
}


/* =========================================================
   СОХРАНЕНИЕ ТОВАРОВ
   ========================================================= */

async function save() {

  try {

    if (!data.length) {
      status("Каталог пуст.","error");
      return;
    }

    status("Сохраняем изменения…");

    for (let i = 0; i < data.length; i++) {

      const p = data[i];

      const nameEl =
        document.querySelector(`[data-name="${i}"]`);

      const priceEl =
        document.querySelector(`[data-price="${i}"]`);

      const labelEl =
        document.querySelector(`[data-label="${i}"]`);

      const activeEl =
        document.querySelector(`[data-active="${i}"]`);

      if (!priceEl) continue;

      const priceText = priceEl.value.trim();

      const price =
        priceText === ""
          ? null
          : Number(priceText);

      if (
        priceText !== "" &&
        !Number.isFinite(price)
      ) {
        status(
          `Неверная цена у товара «${p.name}».`,
          "error"
        );
        return;
      }

      const update = {

        name:
          nameEl
            ? nameEl.value.trim()
            : p.name,

        price:price,

        price_label:
          labelEl
            ? labelEl.value.trim()
            : (p.price_label || ""),

        is_active:
          activeEl
            ? activeEl.checked
            : true
      };

      const r = await supabaseClient
        .from("products")
        .update(update)
        .eq("id",p.id);

      if (r.error) {

        status(
          `Ошибка у товара «${p.name}»: ${r.error.message}`,
          "error"
        );

        console.error(r.error);

        return;
      }
    }

    await loadData();

    status(
      "Изменения сохранены.",
      "success"
    );

  } catch (e) {

    console.error(e);

    status(
      "Ошибка сохранения: " + (e.message || e),
      "error"
    );
  }
}


/* =========================================================
   НАСТРОЙКИ САЙТА
   ========================================================= */

async function loadSettings() {

  const r = await supabaseClient
    .from("site_settings")
    .select("*")
    .eq("id",1)
    .maybeSingle();

  if (r.error) return;

  const s = r.data || {};

  [
    "address",
    "phone",
    "whatsapp",
    "hours",
    "map_url",
    "logo_url",
    "instagram_url"
  ].forEach(k => {

    if ($(k)) {
      $(k).value = s[k] || "";
    }

  });
}


async function saveSettings() {

  const payload = {

    id:1,

    address:
      $("address").value.trim(),

    phone:
      $("phone").value.trim(),

    whatsapp:
      $("whatsapp").value.replace(/\D/g,""),

    hours:
      $("hours").value.trim(),

    map_url:
      $("map_url").value.trim(),

    logo_url:
      $("logo_url").value.trim(),

    instagram_url:
      $("instagram_url").value.trim()
  };

  const r = await supabaseClient
    .from("site_settings")
    .upsert(
      payload,
      {onConflict:"id"}
    );

  if (r.error) {

    status(
      r.error.message,
      "error"
    );

    return;
  }

  status(
    "Настройки сохранены.",
    "success"
  );
}


/* =========================================================
   НАШИ РАБОТЫ — 22 ФОТО
   ========================================================= */

async function loadGallery() {

  const r = await supabaseClient
    .from("gallery_images")
    .select("*")
    .order("sort_order", {ascending:true});

  if (r.error) {
    throw r.error;
  }

  const rows = r.data || [];

  galleryData = [];

  for (let i = 1; i <= GALLERY_SLOTS; i++) {

    const existing = rows.find(
      x => Number(x.sort_order) === i
    );

    galleryData.push(
      existing || {
        id:`gallery-${String(i).padStart(2,"0")}`,
        sort_order:i,
        image_url:null,
        is_active:true
      }
    );
  }

  renderGallery();
}


function renderGallery() {

  const grid = $("galleryGrid");

  if (!grid) return;

  grid.innerHTML = galleryData.map((item, index) => {

    const number =
      String(item.sort_order).padStart(2,"0");

    const image = item.image_url;

    return `
      <div class="gallery-admin-card">

        <div class="gallery-admin-preview">

          ${
            image
              ? `
                <img
                  src="${esc(image)}"
                  alt="Работа ${number}"
                >
              `
              : `
                <span>
                  Фото ${number}
                </span>
              `
          }

        </div>

        <div class="small" style="margin-bottom:8px;">
          Работа №${number}
        </div>

        <div class="gallery-admin-actions">

          <label class="upload-btn">

            📷 ${
              image
                ? "Заменить"
                : "Загрузить"
            }

            <input
              type="file"
              accept="image/*"
              data-gallery-upload="${index}"
              style="display:none"
            >

          </label>

          ${
            image
              ? `
                <button
                  type="button"
                  class="remove-image"
                  data-gallery-remove="${index}"
                >
                  Удалить
                </button>
              `
              : ""
          }

        </div>

      </div>
    `;

  }).join("");


  document
    .querySelectorAll("[data-gallery-upload]")
    .forEach(input => {

      input.onchange = () => {

        const index =
          Number(input.dataset.galleryUpload);

        const file =
          input.files && input.files[0];

        uploadGalleryImage(index,file);
      };

    });


  document
    .querySelectorAll("[data-gallery-remove]")
    .forEach(button => {

      button.onclick = () => {

        const index =
          Number(button.dataset.galleryRemove);

        removeGalleryImage(index);
      };

    });
}


/* =========================================================
   ЗАГРУЗКА ФОТО В НАШИ РАБОТЫ
   ========================================================= */

async function uploadGalleryImage(index,file) {

  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {

    galleryStatus(
      "Максимальный размер фото — 10 МБ.",
      "error"
    );

    return;
  }

  const item = galleryData[index];

  if (!item) return;

  galleryStatus(
    `Загружаем фото №${item.sort_order}…`
  );

  try {

    const oldUrl = item.image_url;

    const ext =
      (
        file.name
          .split(".")
          .pop() || "jpg"
      )
      .toLowerCase()
      .replace(/[^a-z0-9]/g,"") || "jpg";


    /*
      Для каждой фотографии создаём уникальный файл.
      Поэтому новое фото точно не попадёт в кэш старого.
    */

    const fileName =
      `gallery-${String(item.sort_order).padStart(2,"0")}-${Date.now()}.${ext}`;

    const path =
      `gallery/${fileName}`;


    const upload =
      await supabaseClient.storage
        .from(GALLERY_BUCKET)
        .upload(
          path,
          file,
          {
            upsert:true,
            contentType:file.type,
            cacheControl:"31536000"
          }
        );


    if (upload.error) {
      throw upload.error;
    }


    const publicUrl =
      supabaseClient.storage
        .from(GALLERY_BUCKET)
        .getPublicUrl(path)
        .data
        .publicUrl;


    const update =
      await supabaseClient
        .from("gallery_images")
        .update({
          image_url:publicUrl,
          is_active:true,
          updated_at:new Date().toISOString()
        })
        .eq("id",item.id);


    if (update.error) {
      throw update.error;
    }


    /*
      Если у слота уже было старое фото —
      удаляем старый файл из Storage.
    */

    if (oldUrl) {

      await deleteGalleryStorageFile(oldUrl);
    }


    item.image_url = publicUrl;

    renderGallery();

    galleryStatus(
      `Фото №${item.sort_order} сохранено.`,
      "success"
    );

  } catch (e) {

    console.error(e);

    galleryStatus(
      "Ошибка загрузки: " +
      (e.message || e),
      "error"
    );
  }
}


/* =========================================================
   УДАЛЕНИЕ ФОТО ИЗ STORAGE
   ========================================================= */

async function deleteGalleryStorageFile(url) {

  try {

    const marker =
      `/storage/v1/object/public/${GALLERY_BUCKET}/`;

    if (!url || !url.includes(marker)) {
      return;
    }

    let path =
      url.split(marker)[1];

    path =
      decodeURIComponent(
        path.split("?")[0]
      );

    if (!path) return;

    const result =
      await supabaseClient.storage
        .from(GALLERY_BUCKET)
        .remove([path]);

    if (result.error) {
      console.warn(
        "Не удалось удалить старое фото:",
        result.error
      );
    }

  } catch (e) {

    console.warn(
      "Ошибка удаления файла:",
      e
    );
  }
}


/* =========================================================
   УДАЛЕНИЕ ФОТО ИЗ СЛОТА
   ========================================================= */

async function removeGalleryImage(index) {

  const item =
    galleryData[index];

  if (!item || !item.image_url) {
    return;
  }

  if (
    !confirm(
      `Удалить фотографию №${item.sort_order}?`
    )
  ) {
    return;
  }

  galleryStatus(
    `Удаляем фото №${item.sort_order}…`
  );

  try {

    await deleteGalleryStorageFile(
      item.image_url
    );


    const r =
      await supabaseClient
        .from("gallery_images")
        .update({
          image_url:null,
          updated_at:new Date().toISOString()
        })
        .eq("id",item.id);


    if (r.error) {
      throw r.error;
    }


    item.image_url = null;

    renderGallery();

    galleryStatus(
      `Фото №${item.sort_order} удалено.`,
      "success"
    );

  } catch (e) {

    console.error(e);

    galleryStatus(
      "Ошибка удаления: " +
      (e.message || e),
      "error"
    );
  }
}


/* =========================================================
   АВТОМАТИЧЕСКОЕ СОЗДАНИЕ 22 СЛОТОВ
   ========================================================= */

async function ensureGallerySlots() {

  try {

    const rows = [];

    for (
      let i = 1;
      i <= GALLERY_SLOTS;
      i++
    ) {

      rows.push({
        id:
          `gallery-${String(i).padStart(2,"0")}`,

        sort_order:i,

        image_url:null,

        is_active:true
      });
    }


    const r =
      await supabaseClient
        .from("gallery_images")
        .upsert(
          rows,
          {
            onConflict:"id",
            ignoreDuplicates:true
          }
        );


    if (r.error) {
      console.warn(
        "Не удалось проверить слоты галереи:",
        r.error
      );
    }

  } catch (e) {

    console.warn(
      "Ошибка проверки слотов:",
      e
    );
  }
}


/* =========================================================
   АВТОРИЗАЦИЯ
   ========================================================= */

async function login() {

  const email =
    $("email").value.trim();

  const password =
    $("password").value;

  if (!email || !password) {

    status(
      "Введите email и пароль.",
      "error"
    );

    return;
  }

  status(
    "Выполняем вход…"
  );

  const r =
    await supabaseClient.auth
      .signInWithPassword({
        email,
        password
      });


  if (r.error) {

    status(
      r.error.message,
      "error"
    );

    return;
  }

  await boot();
}


async function logout() {

  await supabaseClient.auth.signOut();

  location.reload();
}


/* =========================================================
   ЗАПУСК АДМИНКИ
   ========================================================= */

async function boot() {

  show(
    "loginCard",
    false
  );

  show(
    "adminCard",
    false
  );

  show(
    "configWarning",
    false
  );


  const r =
    await supabaseClient.auth.getSession();


  if (r.error) {

    show(
      "loginCard",
      true
    );

    status(
      r.error.message,
      "error"
    );

    return;
  }


  const session =
    r.data.session;


  if (!session) {

    show(
      "loginCard",
      true
    );

    return;
  }


  if (
    (session.user.email || "")
      .toLowerCase()
      !==
    ADMIN_EMAIL.toLowerCase()
  ) {

    await logout();

    return;
  }


  $("adminEmail").textContent =
    session.user.email;

  show(
    "adminCard",
    true
  );


  try {

    await loadData();

    await loadSettings();

    /*
      Сначала проверяем 22 слота.
    */

    await ensureGallerySlots();

    /*
      Затем загружаем фотографии.
    */

    await loadGallery();


    if (!data.length) {

      status(
        "Таблица пуста. Нажми «Загрузить исходный каталог»."
      );
    }

  } catch (e) {

    console.error(e);

    status(
      e.message ||
      "Ошибка загрузки.",
      "error"
    );
  }
}


/* =========================================================
   СОБЫТИЯ
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    $("login").onclick =
      login;


    $("password")
      .addEventListener(
        "keydown",
        e => {

          if (e.key === "Enter") {
            login();
          }

        }
      );


    $("logout").onclick =
      logout;


    $("seed").onclick =
      seed;


    $("save").onclick =
      save;


    $("saveSettings").onclick =
      saveSettings;


    boot();

  }
);
