// ═══════════ Pivara ═══════════
const WA = '5492215315005'; // Pivara La Plata
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const waOpen = txt => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(txt)}`,'_blank');

// ── WhatsApp delegado
document.addEventListener('click', e => {
  const b = e.target.closest('[data-wa]');
  if(!b) return;
  e.preventDefault();
  waOpen(b.dataset.wa || 'Hola Pivara! Quiero hacer una consulta.');
});

// ── Nav mobile
const navToggle=$('#navToggle'), navLinks=$('#navLinks');
navToggle.addEventListener('click', () => {
  const o=navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', o);
  navToggle.setAttribute('aria-expanded', o);
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ navLinks.classList.remove('open'); navToggle.classList.remove('open'); }));

// ── Smooth scroll
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const id=a.getAttribute('href'); if(id==='#') return;
  const el=document.querySelector(id);
  if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
}));

// ── Hero palabra por palabra
(function(){
  const h=$('#heroTitle'); if(!h) return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  h.innerHTML = h.textContent.trim().split(' ').map((w,i)=>
    `<span class="word" style="animation-delay:${.25+i*.07}s">${w}</span>`).join(' ');
})();

// ── Reveal observer (definido antes de usarse)
let io=null;
function observeReveals(){
  if(!io){ io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }),{threshold:.12}); }
  $$('.reveal:not(.in)').forEach(el=>io.observe(el));
}

// ── MENÚ (en WordPress editable desde el panel)
const MENU = [
  {cat:'Desayunos', items:[
    {n:'Pivara clásico', d:'Café con leche + medialunas + jugo', p:'$6.800'},
    {n:'Tostado completo', d:'Pan de campo, jamón, queso y tomate', p:'$5.900'},
    {n:'Avocado toast', d:'Palta, huevo poché y semillas', p:'$7.400'},
    {n:'Yogur con granola', d:'Casero, con frutas de estación', p:'$5.200'},
  ]},
  {cat:'Meriendas', items:[
    {n:'Merienda Pivara', d:'Infusión + tostado + porción de torta', p:'$8.500'},
    {n:'Submarino', d:'Leche caliente + barra de chocolate', p:'$4.600'},
    {n:'Waffles', d:'Con dulce de leche y frutos rojos', p:'$7.900'},
    {n:'Tabla dulce para dos', d:'Para compartir la tarde', p:'$12.900'},
  ]},
  {cat:'Cafetería', items:[
    {n:'Espresso', d:'Café de especialidad de tueste propio', p:'$2.800'},
    {n:'Flat white', d:'Doble espresso y leche cremada', p:'$4.200'},
    {n:'Cappuccino', d:'El de siempre, bien espumoso', p:'$4.000'},
    {n:'Café del día', d:'Filtrado, preguntá por la variedad', p:'$3.600'},
  ]},
  {cat:'Pastelería', items:[
    {n:'Cheesecake', d:'De maracuyá o frutos rojos', p:'$5.400'},
    {n:'Carrot cake', d:'Con frosting de queso crema', p:'$5.200'},
    {n:'Alfajor de maicena', d:'Hecho en casa', p:'$2.400'},
    {n:'Budín del día', d:'Preguntá cuál horneamos hoy', p:'$3.200'},
  ]},
];
let catActiva = 0;
const menuTabs=$('#menuTabs'), menuList=$('#menuList');
if(menuTabs){
  menuTabs.innerHTML = MENU.map((m,i)=>`<button class="menu-tab${i===0?' active':''}" data-i="${i}">${m.cat}</button>`).join('');
  menuTabs.addEventListener('click', e => {
    const b=e.target.closest('.menu-tab'); if(!b) return;
    catActiva=+b.dataset.i;
    $$('.menu-tab').forEach(t=>t.classList.toggle('active', t===b));
    renderMenu();
  });
}
function renderMenu(){
  menuList.innerHTML = MENU[catActiva].items.map(it=>`
    <div class="mi">
      <div class="mi-info"><b>${it.n}</b><span>${it.d}</span></div>
      <span class="mi-dots"></span>
      <span class="mi-price">${it.p}</span>
    </div>`).join('');
}
renderMenu();

// ── PROMOS
const PROMOS = [
  {day:'Lunes a viernes', t:'2x1 en café', d:'De 9 a 12 hs, todos los días hábiles. Para arrancar bien.', price:'desde $2.800'},
  {day:'Miércoles', t:'Comer LOCRO', d:'El plato del día más pedido. Casero y abundante.', price:'$9.500'},
  {day:'Finde', t:'Brunch Pivara', d:'Desayuno completo para dos con café de especialidad.', price:'$18.900'},
];
$('#promoGrid').innerHTML = PROMOS.map(p=>`
  <article class="promo reveal">
    <div class="promo-day">${p.day}</div>
    <h3>${p.t}</h3>
    <p>${p.d}</p>
    <div class="promo-price">${p.price}</div>
    <a href="#" class="pbtn" data-wa="Hola Pivara! Quiero aprovechar la promo '${p.t}' (${p.day}).">Quiero esta promo →</a>
  </article>`).join('');

// ── GALERÍA (placeholders)
$('#galGrid').innerHTML = ['Café & medialunas','Cheesecake','Mesa Pivara','Latte art','Locro','Interior','Brunch','Vidriera']
  .map(l=>`<div class="gal-item" title="${l}"><div class="ph"></div></div>`).join('');

// ── RESEÑAS
const RESENAS = [
  {q:'El mejor café de La Plata. Lugar hermoso para quedarse a laburar o charlar. Atención de 10.', n:'Sofía M.', src:'Google · ★★★★★', a:'S'},
  {q:'Las tortas son una locura y el café riquísimo. Siempre tienen algo nuevo para probar. Volvemos seguro.', n:'Joaco R.', src:'Google · ★★★★★', a:'J'},
  {q:'Ambiente súper cálido, ideal para la merienda. El submarino y los waffles, imperdibles.', n:'Caro D.', src:'Google · ★★★★★', a:'C'},
];
$('#revGrid').innerHTML = RESENAS.map(r=>`
  <article class="rev reveal">
    <div class="rev-stars">★★★★★</div>
    <p>“${r.q}”</p>
    <div class="rev-who"><span class="rev-av">${r.a}</span><span><span class="rev-name">${r.n}</span><br><span class="rev-src">${r.src}</span></span></div>
  </article>`).join('');

// ── reveal inicial
observeReveals();

// ── Año
$('#yr').textContent = new Date().getFullYear();
