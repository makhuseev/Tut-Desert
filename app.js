const PRODUCTS = [
{id:"bento",name:"Бенто-торт",category:"Торты",price:4000,unit:"₸/шт.",emoji:"🎂",desc:"Небольшой торт для маленького, но важного повода."},
{id:"meringue",name:"Меренговый рулет",category:"Торты",price:5000,unit:"₸/шт.",emoji:"🍓",desc:"Воздушное безе с нежной начинкой."},
{id:"milk",name:"Молочная девочка",category:"Торты",price:6000,unit:"₸/кг",emoji:"🍰",desc:"Тонкие коржи на сгущённом молоке, крем-чиз."},
{id:"honey",name:"Медовый",category:"Торты",price:6000,unit:"₸/кг",emoji:"🍯",desc:"Классический торт с ароматным мёдом."},
{id:"red",name:"Красный бархат",category:"Торты",price:6000,unit:"₸/кг",emoji:"🍒",desc:"Нежный бисквит и крем-чиз."},
{id:"pistachio",name:"Фисташковый",category:"Торты",price:6000,unit:"₸/кг",emoji:"💚",desc:"Фисташковый бисквит, малиновый конфитюр, крем-чиз."},
{id:"nutella",name:"Нутелла",category:"Торты",price:6000,unit:"₸/кг",emoji:"🍫",desc:"Шоколадный бисквит, крем-чиз с нутеллой."},
{id:"whoopie",name:"Вуппи пай",category:"Торты",price:6000,unit:"₸/кг",emoji:"🧁",desc:"Шоколадный мини-бисквит с нежным крем-чизом."},
{id:"snickers",name:"Сникерс",category:"Торты",price:6000,unit:"₸/кг",emoji:"🥜",desc:"Шоколадный бисквит, арахис и карамель."},
{id:"caramel",name:"Шоко-карамель",category:"Торты",price:6000,unit:"₸/кг",emoji:"🍫",desc:"Шоколадный бисквит с карамельным кремом."},
{id:"carrot",name:"Морковный",category:"Торты",price:6500,unit:"₸/кг",emoji:"🥕",desc:"Пряный бисквит с крем-чизом."},
{id:"oreo",name:"Орео-кейк",category:"Торты",price:6500,unit:"₸/кг",emoji:"🍪",desc:"Шоколадный бисквит, крем-чиз и кусочки Oreo."},
{id:"oriental",name:"Восточный пирог",category:"Пироги",price_label:"2800 / 4000",unit:"₸",emoji:"🥧",desc:"Домашний пирог. Доступны два размера."},
{id:"curd-pie",name:"Творожный пирог",category:"Пироги",price_label:"2800 / 4000",unit:"₸",emoji:"🥧",desc:"Нежная творожная начинка."},
{id:"banoffee",name:"Банофи пай",category:"Пироги",price_label:"2800 / 4000",unit:"₸",emoji:"🍌",desc:"Банан, карамель и нежный крем."},
{id:"poppy",name:"Маковый пирог",category:"Пироги",price:5000,unit:"₸",emoji:"🥮",desc:"Ароматный пирог с маковой начинкой."},
{id:"buns",name:"Булочки",category:"Пирожные",price:120,unit:"₸/шт.",emoji:"🥐",desc:"С творогом, сгущёнкой, повидлом или без начинки."},
{id:"tubes",name:"Трубочки",category:"Пирожные",price:200,unit:"₸/шт.",emoji:"🥨",desc:"Хрустящие трубочки с нежной начинкой."},
{id:"samsa",name:"Самса",category:"Пирожные",price:250,unit:"₸/шт.",emoji:"🥟",desc:"С курицей, мясом или сыром."},
{id:"sochniki",name:"Сочники",category:"Пирожные",price:200,unit:"₸/шт.",emoji:"🍪",desc:"Нежная выпечка с творожной начинкой."},
{id:"cupcakes",name:"Капкейки",category:"Пирожные",price:250,unit:"₸/шт.",emoji:"🧁",desc:"Шоколадный, ванильный или красный бархат; крем-чиз."},
{id:"profiteroles",name:"Профитроли",category:"Пирожные",price:300,unit:"₸/шт.",emoji:"🍮",desc:"Заварное тесто и крем-пломбир."},
{id:"pavlova",name:"Анна Павлова",category:"Пирожные",price:300,unit:"₸/шт.",emoji:"🍓",desc:"Воздушное безе с ягодным конфитюром и кремом-чиз."},
{id:"buffet",name:"Фуршетные пирожные",category:"Пирожные",price:250,unit:"₸/шт.",emoji:"🍰",desc:"Ванильный, шоколадный или красный бархат."},
{id:"thonmomo",name:"Тхонмомо",category:"Пирожные",price:300,unit:"₸/шт.",emoji:"🍬",desc:"Небольшое сладкое угощение."},
{id:"tartlets",name:"Тарталетки",category:"Пирожные",price:400,unit:"₸/шт.",emoji:"🧁",desc:"Песочная основа, крем-пломбир и свежие ягоды."},
{id:"curd-tartlets",name:"Творожные тарталетки",category:"Пирожные",price:400,unit:"₸/шт.",emoji:"🍓",desc:"Песочная основа, творожная начинка и безе."}
];

let activeCategory="Все";
let cart=JSON.parse(localStorage.getItem("tutCart")||"[]");
let PRODUCT_SOURCE = PRODUCTS;

const money=v=>typeof v==="number"?v.toLocaleString("ru-RU")+" ₸":String(v||"").replace(/\B(?=(\d{3})+(?!\d))/g," ")+" ₸";
const products=()=>PRODUCT_SOURCE;
const DEFAULT_SITE_SETTINGS = {address:"Tut Dessert, г. Тараз",phone:"+7 747 226 09 76",whatsapp:"77472260976",hours:"Уточняется",map_url:"https://go.2gis.com/4yEZN",logo_url:"",instagram_url:""};
let SITE_SETTINGS = {...DEFAULT_SITE_SETTINGS};
const escHtml=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
function applySiteSettings(){
  const s=SITE_SETTINGS;
  const addressEl=document.getElementById("siteAddress"); if(addressEl) addressEl.textContent=s.address||DEFAULT_SITE_SETTINGS.address;
  const phoneEl=document.getElementById("sitePhone"); if(phoneEl){phoneEl.textContent=s.phone||DEFAULT_SITE_SETTINGS.phone; phoneEl.href="https://wa.me/"+(s.whatsapp||DEFAULT_SITE_SETTINGS.whatsapp);}
  const mapEl=document.getElementById("siteMap"); if(mapEl){mapEl.href=s.map_url||DEFAULT_SITE_SETTINGS.map_url;}
  const hoursEl=document.getElementById("siteHours"); if(hoursEl) hoursEl.textContent=s.hours||DEFAULT_SITE_SETTINGS.hours;
  const waButtons=document.querySelectorAll("[data-whatsapp]"); waButtons.forEach(a=>{const num=s.whatsapp||DEFAULT_SITE_SETTINGS.whatsapp; const msg=a.dataset.whatsappMessage||"Здравствуйте! Хочу сделать заказ в Tut Dessert."; a.href="https://wa.me/"+num+"?text="+encodeURIComponent(msg);});
  const instagramEl=document.getElementById("siteInstagram");
if(instagramEl){
  if(s.instagram_url){
    instagramEl.href=s.instagram_url;
    instagramEl.style.display="inline";
  }else{
    instagramEl.style.display="none";
  }
}const logoLinks=document.querySelectorAll(".logo"); if(s.logo_url){logoLinks.forEach(a=>{a.innerHTML=`<img src="${escHtml(s.logo_url)}" alt="Tut Dessert" style="max-height:42px;width:auto;object-fit:contain;">`;});}
}
async function loadSiteSettings(){
  if(!supabaseClient){applySiteSettings();return;}
  const {data,error}=await supabaseClient.from("site_settings").select("*").eq("id",1).maybeSingle();
  if(!error && data) SITE_SETTINGS={...DEFAULT_SITE_SETTINGS,...data};
  applySiteSettings();
}


async function loadProducts(){
  if(!supabaseClient){ PRODUCT_SOURCE=PRODUCTS; return; }
  const {data,error}=await supabaseClient.from("products").select("id,name,category,price,price_label,unit,description,emoji,image_url,is_active").eq("is_active",true).order("created_at",{ascending:true});
  if(!error && Array.isArray(data) && data.length){
    PRODUCT_SOURCE=data.map(p=>({id:p.id,name:p.name,category:p.category,price:p.price===null?undefined:Number(p.price),price_label:p.price_label||"",unit:p.unit||"",emoji:p.emoji||"🍰",desc:p.description||"",image_url:p.image_url||""}));
  } else PRODUCT_SOURCE=PRODUCTS;
}

function displayPrice(p){ return p.price_label ? p.price_label : (typeof p.price==="number" ? p.price.toLocaleString("ru-RU") : p.price); }
function renderFilters(){const cats=["Все",...new Set(products().map(p=>p.category))];document.getElementById("filters").innerHTML=cats.map(c=>`<button class="filter ${c===activeCategory?"active":""}" data-cat="${c}">${c}</button>`).join("");document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;renderFilters();renderProducts()})}
function renderProducts(){const list=products().filter(p=>activeCategory==="Все"||p.category===activeCategory);document.getElementById("productGrid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-art">${p.image_url?`<img src="${p.image_url}" alt="${p.name}">`:(p.emoji||"🍰")}</div><div class="product-info"><h3>${p.name}</h3><p class="product-desc">${p.desc||""}</p><div class="product-bottom"><div class="price">${displayPrice(p)} <small>${p.unit||""}</small></div><button class="add-button" data-add="${p.id}" aria-label="Добавить ${p.name} в корзину">+</button></div></div></article>`).join("");document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>addToCart(b.dataset.add))}
function saveCart(){localStorage.setItem("tutCart",JSON.stringify(cart));renderCartCount()}
function addToCart(id){const p=products().find(x=>x.id===id);if(!p)return;const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();renderCart();openCart()}
function renderCartCount(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderCart(){const all=products();const rows=cart.map(item=>{const p=all.find(x=>x.id===item.id);return p?{...p,qty:item.qty}:null}).filter(Boolean);document.getElementById("cartItems").innerHTML=rows.length?rows.map(p=>`<div class="cart-row"><div><h4>${p.name}</h4><small>${displayPrice(p)} ${p.unit||""}</small></div><div class="qty"><button data-minus="${p.id}">−</button><b>${p.qty}</b><button data-plus="${p.id}">+</button></div></div>`).join(""):'<div class="empty">Корзина пока пуста</div>';document.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>changeQty(b.dataset.minus,-1));document.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>changeQty(b.dataset.plus,1));const total=rows.reduce((s,p)=>s+(typeof p.price==="number"?p.price*p.qty:0),0);document.getElementById("cartTotal").textContent=money(total)+(rows.some(p=>typeof p.price!=="number")?" + товары с ценой по размеру":"")}
function changeQty(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);saveCart();renderCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");renderCart()}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","true")}
document.getElementById("openCart").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("closeCartButton").onclick=closeCart;
document.getElementById("clearCart").onclick=()=>{cart=[];saveCart();renderCart()};
document.getElementById("orderCart").onclick=()=>{const all=products();const text=cart.map(i=>{const p=all.find(x=>x.id===i.id);return `${p.name} — ${i.qty} шт.`}).join("\n");if(!text)return alert("Добавьте товары в корзину.");const num=SITE_SETTINGS.whatsapp||DEFAULT_SITE_SETTINGS.whatsapp;window.open("https://wa.me/"+num+"?text="+encodeURIComponent("Здравствуйте! Хочу сделать заказ в Tut Dessert:\n"+text+"\n\nПодскажите, пожалуйста, итоговую стоимость."),"_blank")};

(async()=>{await Promise.all([loadProducts(),loadSiteSettings()]);renderFilters();renderProducts();renderCartCount();})();
