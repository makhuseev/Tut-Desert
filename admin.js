const DEFAULTS = [
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
{id:"oriental",name:"Восточный пирог",category:"Пироги",price:"2800/4000",unit:"₸",emoji:"🥧",desc:"Домашний пирог. Доступны два размера."},
{id:"curd-pie",name:"Творожный пирог",category:"Пироги",price:"2800/4000",unit:"₸",emoji:"🥧",desc:"Нежная творожная начинка."},
{id:"banoffee",name:"Банофи пай",category:"Пироги",price:"2800/4000",unit:"₸",emoji:"🍌",desc:"Банан, карамель и нежный крем."},
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
let data=JSON.parse(localStorage.getItem("tutProducts")||"null")||DEFAULTS;
function render(){document.getElementById("rows").innerHTML=data.map((p,i)=>`<div class="admin-row"><input data-name="${i}" value="${p.name}"><div>${p.category}</div><input data-price="${i}" value="${p.price}"><div>${p.unit}</div></div>`).join("")}
document.getElementById("save").onclick=()=>{data=data.map((p,i)=>({...p,name:document.querySelector(`[data-name="${i}"]`).value,price:document.querySelector(`[data-price="${i}"]`).value}));localStorage.setItem("tutProducts",JSON.stringify(data));alert("Изменения сохранены в этом браузере.");};
document.getElementById("reset").onclick=()=>{if(confirm("Вернуть исходные данные?")){localStorage.removeItem("tutProducts");data=DEFAULTS;render()}};
render();
