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

const ADMIN_EMAIL = "makhuseev0103@gmail.com";
const DEFAULT_SETTINGS = {
  address: "Tut Dessert, г. Тараз",
  phone: "+7 747 226 09 76",
  whatsapp: "77472260976",
  hours: "Уточняется",
  map_url: "https://go.2gis.com/4yEZN",
  logo_url: "",
  instagram_url: ""
};
let data=[];
let settings={...DEFAULT_SETTINGS};
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
const priceValue=p=>p.price===null||p.price===undefined?"":p.price;
function show(id,visible=true){$(id).classList.toggle("hidden",!visible)}
function setStatus(message,type="info"){$("status").textContent=message;$("status").className=`status ${type}`}
async function getSession(){
  if(!supabaseClient){show("configWarning",true);show("loginCard",false);return null;}
  const {data,error}=await supabaseClient.auth.getSession();
  if(error){setStatus(error.message,"error");return null;}
  return data.session;
}
async function login(){
  const email=$("email").value.trim(); const password=$("password").value;
  if(!email||!password){setStatus("Введите email и пароль.","error");return;}
  setStatus("Выполняем вход…");
  const {error}=await supabaseClient.auth.signInWithPassword({email,password});
  if(error){setStatus(error.message,"error");return;}
  await boot();
}
async function logout(){await supabaseClient.auth.signOut();location.reload()}
async function loadData(){
  const {data:rows,error}=await supabaseClient.from("products").select("*").order("created_at",{ascending:true});
  if(error)throw error; data=rows||[]; render();
}
async function loadSettings(){
  const {data:row,error}=await supabaseClient.from("site_settings").select("*").eq("id",1).maybeSingle();
  if(error) throw error;
  settings={...DEFAULT_SETTINGS,...(row||{})};
  $("address").value=settings.address||"";
  $("phone").value=settings.phone||"";
  $("whatsapp").value=settings.whatsapp||"";
  $("hours").value=settings.hours||"";
  $("map_url").value=settings.map_url||"";
  $("logo_url").value=settings.logo_url||"";
  $("instagram_url").value=settings.instagram_url||"";
}
async function seed(){
  if(!confirm("Загрузить в Supabase исходный каталог из сайта? Существующие товары с теми же ID будут обновлены."))return;
  setStatus("Загружаем каталог…");
  const payload=DEFAULTS.map(p=>({id:p.id,name:p.name,category:p.category,price:p.price,price_label:p.price_label,unit:p.unit,description:p.desc,emoji:p.emoji,image_url:null,is_active:true}));
  const {error}=await supabaseClient.from("products").upsert(payload,{onConflict:"id"});
  if(error){setStatus(error.message,"error");return;}
  await loadData(); setStatus("Каталог загружен. Теперь цены и настройки можно менять.","success");
}
function render(){
  $("rows").innerHTML=data.map((p,i)=>`<div class="admin-row">
    <input data-field="name" data-i="${i}" value="${esc(p.name)}">
    <div class="category">${esc(p.category)}</div>
    <input data-field="price" data-i="${i}" inputmode="decimal" value="${esc(priceValue(p))}" placeholder="например 6000">
    <input data-field="price_label" data-i="${i}" value="${esc(p.price_label||"")}" placeholder="например 2800 / 4000">
    <label class="switch"><input type="checkbox" data-field="active" data-i="${i}" ${p.is_active?"checked":""}><span>Активен</span></label>
  </div>`).join("");
}
function readSettings(){
  return {
    id:1,
    address:$("address").value.trim(),
    phone:$("phone").value.trim(),
    whatsapp:$("whatsapp").value.trim().replace(/[^0-9]/g,""),
    hours:$("hours").value.trim(),
    map_url:$("map_url").value.trim(),
    logo_url:$("logo_url").value.trim(),
    instagram_url:$("instagram_url").value.trim()
  };
}
async function save(){
  setStatus("Сохраняем изменения…");
  const updates=data.map((p,i)=>{
    const rawPrice=$("rows").querySelector(`[data-field="price"][data-i="${i}"]`).value.trim();
    const label=$("rows").querySelector(`[data-field="price_label"][data-i="${i}"]`).value.trim();
    const active=$("rows").querySelector(`[data-field="active"][data-i="${i}"]`).checked;
    return {id:p.id,name:$("rows").querySelector(`[data-field="name"][data-i="${i}"]`).value.trim(),price:rawPrice===""?null:Number(rawPrice.replace(/\s/g,"")),price_label:label,unit:p.unit,category:p.category,description:p.description,emoji:p.emoji,image_url:p.image_url||null,is_active:active};
  });
  const bad=updates.find(p=>!p.name || (p.price!==null && !Number.isFinite(p.price)));
  if(bad){setStatus("Проверь название и цену товара.","error");return;}
  const newSettings=readSettings();
  if(!newSettings.address || !newSettings.phone || !newSettings.whatsapp || !newSettings.map_url){setStatus("Заполни адрес, телефон, WhatsApp и ссылку на карту.","error");return;}
  const {error:productsError}=await supabaseClient.from("products").upsert(updates,{onConflict:"id"});
  if(productsError){setStatus(productsError.message,"error");return;}
  const {error:settingsError}=await supabaseClient.from("site_settings").upsert(newSettings,{onConflict:"id"});
  if(settingsError){setStatus(settingsError.message,"error");return;}
  settings={...DEFAULT_SETTINGS,...newSettings};
  await loadData(); setStatus("Изменения сохранены. Цены и настройки уже доступны посетителям сайта.","success");
}
async function boot(){
  show("loginCard",false); show("adminCard",false); show("configWarning",false);
  const session=await getSession();
  if(!session){show("loginCard",true);return;}
  if(session.user.email?.toLowerCase()!==ADMIN_EMAIL.toLowerCase()){
    await supabaseClient.auth.signOut(); show("loginCard",true); setStatus("Этот аккаунт не является администратором Tut Dessert.","error"); return;
  }
  $("adminEmail").textContent=session.user.email; show("adminCard",true);
  try{
    await loadSettings();
    await loadData();
    if(!data.length)setStatus("Таблица товаров пуста. Нажми «Загрузить исходный каталог». ");
  }catch(e){setStatus(e.message||"Не удалось загрузить данные.","error")}
}
$("login").onclick=login; $("password").addEventListener("keydown",e=>{if(e.key==="Enter")login()}); $("logout").onclick=logout; $("seed").onclick=seed; $("save").onclick=save;
if(supabaseClient) supabaseClient.auth.onAuthStateChange(()=>{});
boot();
