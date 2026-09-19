// Tut Dessert — self-contained admin Supabase connection
// This uses the browser-safe Publishable key. Never put a service_role/secret key here.
const SUPABASE_URL = "https://tsemlertlvhgnfvtdnjq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_I8XmDXRwwcQHhLKXCr25iw_jWbaOS8l";
const supabaseClient = (window.supabase && window.supabase.createClient)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession:true, autoRefreshToken:true, detectSessionInUrl:true }
    })
  : null;

const DEFAULTS = [
const ADMIN_EMAIL="makhuseev0103@gmail.com";
const IMAGE_BUCKET="product-images";
let data=[];
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
const priceValue=p=>p.price===null||p.price===undefined?"":p.price;

function show(id,visible=true){const el=$(id);if(el)el.classList.toggle("hidden",!visible)}
function setStatus(message,type="info"){const el=$("status");if(el){el.textContent=message;el.className=`status ${type}`}}

async function getSession(){
  if(!supabaseClient){
    show("configWarning",true); show("loginCard",false); return null;
  }
  const {data,error}=await supabaseClient.auth.getSession();
  if(error){show("loginCard",true);setStatus(error.message,"error");return null}
  return data.session;
}

async function login(){
  const email=$("email")?.value.trim(), password=$("password")?.value;
  if(!email||!password){setStatus("Введите email и пароль.","error");return}
  setStatus("Выполняем вход…");
  const {error}=await supabaseClient.auth.signInWithPassword({email,password});
  if(error){setStatus(error.message,"error");return}
  await boot();
}

async function logout(){await supabaseClient.auth.signOut();location.reload()}

async function loadData(){
  const {data:rows,error}=await supabaseClient.from("products").select("*").order("created_at",{ascending:true});
  if(error)throw error;
  data=rows||[];
  render();
}

async function seed(){
  if(!confirm("Загрузить исходный каталог из 27 товаров? Существующие товары с теми же ID будут обновлены."))return;
  setStatus("Загружаем каталог…");
  const payload=DEFAULTS.map(p=>({
    id:p.id,name:p.name,category:p.category,price:p.price,price_label:p.price_label,
    unit:p.unit,description:p.desc,emoji:p.emoji,is_active:true
  }));
  const {error}=await supabaseClient.from("products").upsert(payload,{onConflict:"id"});
  if(error){setStatus(error.message,"error");return}
  await loadData();
  setStatus("Каталог загружен. Фото существующих товаров сохранены.","success");
}

function render(){
  const rows=$("rows"); if(!rows)return;
  rows.innerHTML=data.map((p,i)=>`<div class="admin-row">
    <div class="product-image-cell">
      <div class="product-preview">${p.image_url?`<img src="${esc(p.image_url)}" alt="${esc(p.name)}">`:`<span>${esc(p.emoji||"🍰")}</span>`}</div>
      <label class="upload-btn">📷 Загрузить<input type="file" data-image="${i}" accept="image/jpeg,image/png,image/webp,image/avif"></label>
      ${p.image_url?`<button type="button" class="remove-image" data-remove-image="${i}">Удалить</button>`:""}
    </div>
    <div class="small">${esc(p.id)}</div>
    <input data-field="name" data-i="${i}" value="${esc(p.name)}">
    <div>${esc(p.category)}</div>
    <input data-field="price" data-i="${i}" inputmode="decimal" value="${esc(priceValue(p))}" placeholder="например 6000">
    <input data-field="price_label" data-i="${i}" value="${esc(p.price_label||"")}" placeholder="например 2800 / 4000">
    <label class="switch"><input type="checkbox" data-field="active" data-i="${i}" ${p.is_active!==false?"checked":""}><span>Активен</span></label>
  </div>`).join("");
  document.querySelectorAll("[data-image]").forEach(el=>el.onchange=()=>uploadImage(Number(el.dataset.image),el.files?.[0]));
  document.querySelectorAll("[data-remove-image]").forEach(el=>el.onclick=()=>removeImage(Number(el.dataset.removeImage)));
}

async function uploadImage(i,file){
  if(!file)return;
  if(!file.type.startsWith("image/")){setStatus("Можно загружать только изображения.","error");return}
  if(file.size>8*1024*1024){setStatus("Фото слишком большое. Максимум 8 МБ.","error");return}
  const p=data[i]; if(!p)return;
  setStatus(`Загружаем фото: ${p.name}…`);
  const ext=(file.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg";
  const path=`products/${p.id}.${ext}`;
  const {error:uploadError}=await supabaseClient.storage.from(IMAGE_BUCKET).upload(path,file,{upsert:true,cacheControl:"3600",contentType:file.type});
  if(uploadError){setStatus("Не удалось загрузить фото: "+uploadError.message,"error");return}
  const {data:pub}=supabaseClient.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  const url=pub.publicUrl;
  const {error:updateError}=await supabaseClient.from("products").update({image_url:url}).eq("id",p.id);
  if(updateError){setStatus("Фото загружено, но ссылка не сохранилась: "+updateError.message,"error");return}
  data[i].image_url=url;render();setStatus(`Фото «${p.name}» сохранено.`,"success");
}

async function removeImage(i){
  const p=data[i];if(!p)return;
  if(!confirm(`Удалить фото товара «${p.name}»?`))return;
  setStatus(`Удаляем фото: ${p.name}…`);
  let storagePath=null;
  if(p.image_url){
    const marker=`/storage/v1/object/public/${IMAGE_BUCKET}/`;
    const pos=p.image_url.indexOf(marker);
    if(pos>=0)storagePath=decodeURIComponent(p.image_url.slice(pos+marker.length));
  }
  if(storagePath){
    const {error}=await supabaseClient.storage.from(IMAGE_BUCKET).remove([storagePath]);
    if(error){setStatus("Не удалось удалить файл: "+error.message,"error");return}
  }
  const {error}=await supabaseClient.from("products").update({image_url:null}).eq("id",p.id);
  if(error){setStatus(error.message,"error");return}
  data[i].image_url=null;render();setStatus(`Фото «${p.name}» удалено.`,"success");
}

async function save(){
  setStatus("Сохраняем изменения…");
  const updates=data.map((p,i)=>{
    const rawPrice=$("rows").querySelector(`[data-field="price"][data-i="${i}"]`).value.trim();
    const label=$("rows").querySelector(`[data-field="price_label"][data-i="${i}"]`).value.trim();
    const active=$("rows").querySelector(`[data-field="active"][data-i="${i}"]`).checked;
    return {
      id:p.id,
      name:$("rows").querySelector(`[data-field="name"][data-i="${i}"]`).value.trim(),
      price:rawPrice===""?null:Number(rawPrice.replace(/\s/g,"")),
      price_label:label,unit:p.unit,category:p.category,description:p.description,
      emoji:p.emoji,image_url:p.image_url||null,is_active:active
    };
  });
  const bad=updates.find(p=>!p.name||(p.price!==null&&!Number.isFinite(p.price)));
  if(bad){setStatus("Проверь название и цену товара.","error");return}
  const {error}=await supabaseClient.from("products").upsert(updates,{onConflict:"id"});
  if(error){setStatus(error.message,"error");return}
  await loadData();setStatus("Изменения сохранены.","success");
}

async function loadSettings(){
  const {data:row,error}=await supabaseClient.from("site_settings").select("*").eq("id",1).maybeSingle();
  if(error){setStatus("Каталог загружен. Настройки сайта пока недоступны: "+error.message,"error");return}
  const s=row||{};
  ["address","phone","whatsapp","hours","map_url","logo_url","instagram_url"].forEach(k=>{if($(k))$(k).value=s[k]||""});
}

async function saveSettings(){
  setStatus("Сохраняем настройки сайта…");
  const payload={
    id:1,address:$("address").value.trim(),phone:$("phone").value.trim(),
    whatsapp:$("whatsapp").value.replace(/\D/g,""),hours:$("hours").value.trim(),
    map_url:$("map_url").value.trim(),logo_url:$("logo_url").value.trim(),
    instagram_url:$("instagram_url").value.trim()
  };
  const {error}=await supabaseClient.from("site_settings").upsert(payload,{onConflict:"id"});
  if(error){setStatus(error.message,"error");return}
  setStatus("Настройки сайта сохранены.","success");
}

async function boot(){
  show("loginCard",false);show("adminCard",false);show("configWarning",false);
  const session=await getSession();
  if(!session){show("loginCard",true);return}
  if(session.user.email?.toLowerCase()!==ADMIN_EMAIL.toLowerCase()){
    await supabaseClient.auth.signOut();show("loginCard",true);
    setStatus("Этот аккаунт не является администратором Tut Dessert.","error");return
  }
  $("adminEmail").textContent=session.user.email;show("adminCard",true);
  try{
    await loadData();
    await loadSettings();
    if(!data.length)setStatus("Таблица пуста. Нажми «Загрузить исходный каталог».","info");
  }catch(e){setStatus(e.message||"Не удалось загрузить данные.","error")}
}

window.addEventListener("error",e=>{
  const msg=e?.error?.message||e?.message;
  if(msg){show("configWarning",true);setStatus("Ошибка JavaScript: "+msg,"error")}
});

document.addEventListener("DOMContentLoaded",()=>{
  if($("login"))$("login").onclick=login;
  if($("password"))$("password").addEventListener("keydown",e=>{if(e.key==="Enter")login()});
  if($("logout"))$("logout").onclick=logout;
  if($("seed"))$("seed").onclick=seed;
  if($("save"))$("save").onclick=save;
  if($("saveSettings"))$("saveSettings").onclick=saveSettings;
  if(typeof supabaseClient!=="undefined"&&supabaseClient) supabaseClient.auth.onAuthStateChange(()=>{});
  boot();
});
