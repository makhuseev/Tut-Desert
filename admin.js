const supabaseClient = window.supabaseClient;

// Tut Dessert — admin panel
const ADMIN_EMAIL = "makhuseev0103@gmail.com";
const IMAGE_BUCKET = "product-images";
const GALLERY_BUCKET = "gallery-images";

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
  } else {
    status(message, type);
  }
}

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
          ${p.image_url
            ? `<img src="${esc(p.image_url)}" alt="${esc(p.name)}">`
            : `<span>${esc(p.emoji || "🍰")}</span>`}
        </div>
        <label class="upload-btn">
          📷 Загрузить
          <input type="file" data-image="${i}" accept="image/*">
        </label>
        ${p.image_url
          ? `<button type="button" class="remove-image" data-remove="${i}">Удалить</button>`
          : ""}
      </div>
      <div class="small">${esc(p.id)}</div>
      <input data-name="${i}" value="${esc(p.name)}">
      <div>${esc(p.category)}</div>
      <input data-price="${i}" value="${p.price == null ? "" : p.price}" placeholder="6000">
      <input data-label="${i}" value="${esc(p.price_label || "")}" placeholder="2800 / 4000">
      <label class="switch">
        <input type="checkbox" data-active="${i}" ${p.is_active !== false ? "checked" : ""}>
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
    .update({image_url:url})
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
    const path = decodeURIComponent(p.image_url.split(marker)[1]);

    await supabaseClient
      .storage
      .from(IMAGE_BUCKET)
      .remove([path]);
  }

  const r = await supabaseClient
    .from("products")
    .update({image_url:null})
    .eq("id",p.id);

  if (r.error) {
    status(r.error.message, "error");
    return;
  }

  data[i].image_url = null;
  render();
  status("Фото удалено.", "success");
}

async function seed() {
  if (!confirm("Загрузить исходный каталог из 27 товаров?")) return;

  const old = {};
  data.forEach(p => old[p.id] = p.image_url);

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

async function save() {
  try {
    if (!data.length) {
      status("Каталог пуст.","error");
      return;
    }

    status("Сохраняем изменения…");

    for (let i = 0; i < data.length; i++) {
      const p = data[i];

      const nameEl = document.querySelector(`[data-name="${i}"]`);
      const priceEl = document.querySelector(`[data-price="${i}"]`);
      const labelEl = document.querySelector(`[data-label="${i}"]`);
      const activeEl = document.querySelector(`[data-active="${i}"]`);

      if (!priceEl) continue;

      const priceText = priceEl.value.trim();
      const price = priceText === "" ? null : Number(priceText);

      if (priceText !== "" && !Number.isFinite(price)) {
        status(`Неверная цена у товара «${p.name}».`,"error");
        return;
      }

      const update = {
        name: nameEl ? nameEl.value.trim() : p.name,
        price: price,
        price_label: labelEl ? labelEl.value.trim() : (p.price_label || ""),
        is_active: activeEl ? activeEl.checked : true
      };

      const r = await supabaseClient
        .from("products")
        .update(update)
        .eq("id",p.id);

      if (r.error) {
        status(`Ошибка у товара «${p.name}»: ${r.error.message}`,"error");
        console.error(r.error);
        return;
      }
    }

    await loadData();
    status("Изменения сохранены.","success");

  } catch (e) {
    console.error(e);
    status("Ошибка сохранения: " + (e.message || e),"error");
  }
}

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
    if ($(k)) $(k).value = s[k] || "";
  });
}

async function saveSettings() {
  const payload = {
    id:1,
    address:$("address").value.trim(),
    phone:$("phone").value.trim(),
    whatsapp:$("whatsapp").value.replace(/\D/g,""),
    hours:$("hours").value.trim(),
    map_url:$("map_url").value.trim(),
    logo_url:$("logo_url").value.trim(),
    instagram_url:$("instagram_url").value.trim()
  };

  const r = await supabaseClient
    .from("site_settings")
    .upsert(payload,{onConflict:"id"});

  if (r.error) {
    status(r.error.message,"error");
    return;
  }

  status("Настройки сохранены.","success");
}


/* =========================================================
   НАШИ РАБОТЫ — 22 ФОТО
   ========================================================= */

function ensureGalleryUI() {
  let card = $("galleryCard");

  if (!card) {
    const adminCard = $("adminCard");
    if (!adminCard) return false;

    card = document.createElement("div");
    card.id = "galleryCard";
    card.className = "admin-card";

    card.innerHTML = `
      <h2>Наши работы</h2>

      <div class="small" style="margin-bottom:14px">
        22 слота. Загружайте, заменяйте или удаляйте фотографии.
      </div>

      <div id="galleryStatus" class="status">
        Загрузка галереи…
      </div>

      <div id="galleryGrid"
        style="
          display:grid;
          grid-template-columns:repeat(4,minmax(0,1fr));
          gap:16px;
        ">
      </div>

      <style>
        #galleryGrid .gallery-admin-card{
          border:1px solid #eadfd4;
          border-radius:14px;
          padding:10px;
          background:#fffaf4;
        }

        #galleryGrid .gallery-admin-preview{
          width:100%;
          aspect-ratio:4/3;
          border-radius:10px;
          overflow:hidden;
          background:#f4eee8;
          display:grid;
          place-items:center;
          color:#8b7669;
          text-align:center;
          margin-bottom:9px;
        }

        #galleryGrid .gallery-admin-preview img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        }

        #galleryGrid .gallery-admin-actions{
          display:flex;
          gap:6px;
          flex-wrap:wrap;
        }

        #galleryGrid .gallery-admin-actions button,
        #galleryGrid .gallery-admin-actions label{
          font-size:11px;
          padding:7px 8px;
          border:1px solid #dfcbb8;
          border-radius:8px;
          background:#fff;
          color:#76563d;
          cursor:pointer;
        }

        @media(max-width:900px){
          #galleryGrid{
            grid-template-columns:repeat(3,minmax(0,1fr))!important;
          }
        }

        @media(max-width:600px){
          #galleryGrid{
            grid-template-columns:repeat(2,minmax(0,1fr))!important;
          }
        }
      </style>
    `;

    adminCard.appendChild(card);
  }

  return true;
}


async function loadGallery() {
  if (!ensureGalleryUI()) return;

  const r = await supabaseClient
    .from("gallery_images")
    .select("*")
    .order("sort_order", {ascending:true});

  if (r.error) {
    galleryStatus(r.error.message, "error");
    return;
  }

  galleryData = r.data || [];

  /*
    Если по какой-то причине слоты не вернулись,
    показываем 22 заглушки.
  */

  if (galleryData.length < 22) {
    const existing = new Map(
      galleryData.map(x => [x.sort_order, x])
    );

    galleryData = Array.from({length:22}, (_,i) => {
      const order = i + 1;

      return existing.get(order) || {
        id:`gallery-${String(order).padStart(2,"0")}`,
        sort_order:order,
        image_url:null,
        is_active:true
      };
    });
  }

  renderGallery();

  galleryStatus("Готово.", "success");
}


function renderGallery() {
  const grid = $("galleryGrid");

  if (!grid) return;

  grid.innerHTML = galleryData.map((slot, i) => `
    <div class="gallery-admin-card">

      <div
        class="small"
        style="font-weight:700;margin-bottom:7px"
      >
        Фото №${String(slot.sort_order).padStart(2,"0")}
      </div>

      <div class="gallery-admin-preview">

        ${
          slot.image_url

            ? `<img
                src="${esc(slot.image_url)}"
                alt="Работа ${slot.sort_order}"
              >`

            : `<div>
                📷
                <br>
                <small>Нет фото</small>
              </div>`
        }

      </div>

      <div class="gallery-admin-actions">

        <label>

          📷 ${slot.image_url ? "Заменить" : "Загрузить"}

          <input
            type="file"
            data-gallery-upload="${i}"
            accept="image/*"
            style="display:none"
          >

        </label>

        ${
          slot.image_url

            ? `<button
                type="button"
                data-gallery-remove="${i}"
              >
                🗑 Удалить
              </button>`

            : ""
        }

      </div>

    </div>
  `).join("");


  document
    .querySelectorAll("[data-gallery-upload]")
    .forEach(input => {

      input.onchange = () => {

        uploadGalleryImage(
          Number(input.dataset.galleryUpload),
          input.files[0]
        );

      };

    });


  document
    .querySelectorAll("[data-gallery-remove]")
    .forEach(button => {

      button.onclick = () => {

        removeGalleryImage(
          Number(button.dataset.galleryRemove)
        );

      };

    });
}


async function uploadGalleryImage(index, file) {

  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {

    galleryStatus(
      "Максимальный размер фотографии — 10 МБ.",
      "error"
    );

    return;
  }

  const slot = galleryData[index];

  if (!slot) return;

  galleryStatus(
    `Загружаю фотографию №${String(slot.sort_order).padStart(2,"0")}…`
  );


  const ext = (
    file.name.split(".").pop() || "jpg"
  )
    .toLowerCase()
    .replace(/[^a-z0-9]/g,"") || "jpg";


  const path =
    `gallery/${slot.id}-${Date.now()}.${ext}`;


  const upload = await supabaseClient
    .storage
    .from(GALLERY_BUCKET)
    .upload(
      path,
      file,
      {
        upsert:false,
        contentType:file.type,
        cacheControl:"3600"
      }
    );


  if (upload.error) {

    galleryStatus(
      upload.error.message,
      "error"
    );

    return;
  }


  const url = supabaseClient
    .storage
    .from(GALLERY_BUCKET)
    .getPublicUrl(path)
    .data
    .publicUrl;


  const oldUrl = slot.image_url;


  const update = await supabaseClient
    .from("gallery_images")
    .update({
      image_url:url,
      updated_at:new Date().toISOString()
    })
    .eq("id",slot.id);


  if (update.error) {

    await supabaseClient
      .storage
      .from(GALLERY_BUCKET)
      .remove([path]);

    galleryStatus(
      update.error.message,
      "error"
    );

    return;
  }


  /*
    После успешной загрузки удаляем старое фото,
    если оно существовало.
  */

  if (
    oldUrl &&
    oldUrl.includes(
      `/storage/v1/object/public/${GALLERY_BUCKET}/`
    )
  ) {

    const marker =
      `/storage/v1/object/public/${GALLERY_BUCKET}/`;

    const oldPath =
      decodeURIComponent(
        oldUrl.split(marker)[1]
      );


    await supabaseClient
      .storage
      .from(GALLERY_BUCKET)
      .remove([oldPath]);
  }


  galleryData[index].image_url = url;

  renderGallery();


  galleryStatus(
    `Фото №${String(slot.sort_order).padStart(2,"0")} сохранено.`,
    "success"
  );
}


async function removeGalleryImage(index) {

  const slot = galleryData[index];

  if (!slot || !slot.image_url) return;


  if (
    !confirm(
      `Удалить фотографию №${String(slot.sort_order).padStart(2,"0")}?`
    )
  ) {
    return;
  }


  galleryStatus("Удаляю фотографию…");


  const marker =
    `/storage/v1/object/public/${GALLERY_BUCKET}/`;


  if (slot.image_url.includes(marker)) {

    const path =
      decodeURIComponent(
        slot.image_url.split(marker)[1]
      );


    await supabaseClient
      .storage
      .from(GALLERY_BUCKET)
      .remove([path]);
  }


  const r = await supabaseClient
    .from("gallery_images")
    .update({
      image_url:null,
      updated_at:new Date().toISOString()
    })
    .eq("id",slot.id);


  if (r.error) {

    galleryStatus(
      r.error.message,
      "error"
    );

    return;
  }


  galleryData[index].image_url = null;

  renderGallery();

  galleryStatus(
    "Фотография удалена.",
    "success"
  );
}


/* =========================================================
   ВХОД / ВЫХОД
   ========================================================= */

async function login() {

  const email = $("email").value.trim();
  const password = $("password").value;


  if (!email || !password) {

    status(
      "Введите email и пароль.",
      "error"
    );

    return;
  }


  status("Выполняем вход…");


  const r =
    await supabaseClient.auth.signInWithPassword({
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


async function boot() {

  show("loginCard",false);
  show("adminCard",false);
  show("configWarning",false);


  const r =
    await supabaseClient.auth.getSession();


  if (r.error) {

    show("loginCard",true);

    status(
      r.error.message,
      "error"
    );

    return;
  }


  const session = r.data.session;


  if (!session) {

    show("loginCard",true);

    return;
  }


  if (
    (session.user.email || "").toLowerCase()
    !==
    ADMIN_EMAIL.toLowerCase()
  ) {

    await logout();

    return;
  }


  if ($("adminEmail")) {

    $("adminEmail").textContent =
      session.user.email;
  }


  show("adminCard",true);


  try {

    await loadData();

    await loadSettings();

    await loadGallery();


    if (!data.length) {

      status(
        "Таблица пуста. Нажми «Загрузить исходный каталог»."
      );
    }

  } catch (e) {

    console.error(e);

    status(
      e.message || "Ошибка загрузки.",
      "error"
    );
  }
}


document.addEventListener(
  "DOMContentLoaded",
  () => {

    if ($("login")) {
      $("login").onclick = login;
    }


    if ($("password")) {

      $("password")
        .addEventListener(
          "keydown",
          e => {

            if (e.key === "Enter") {
              login();
            }

          }
        );

    }


    if ($("logout")) {
      $("logout").onclick = logout;
    }


    if ($("seed")) {
      $("seed").onclick = seed;
    }


    if ($("save")) {
      $("save").onclick = save;
    }


    if ($("saveSettings")) {
      $("saveSettings").onclick = saveSettings;
    }


    boot();

  }
);
