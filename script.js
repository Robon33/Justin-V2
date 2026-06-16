// ===== Click & Collect — menu data =====
// Carte officielle Justin Café (export borne/POS). Alcool et suppléments
// volontairement exclus de cette v1 du click & collect en ligne.
const MENU_CATEGORIES = [
  { id: 'formules', label: 'Nos formules' },
  { id: 'sandwichs', label: 'Sandwichs' },
  { id: 'salades', label: 'Salades' },
  { id: 'snacking', label: 'Snacking' },
  { id: 'sucre', label: 'Sucré' },
  { id: 'boissons-chaudes', label: 'Boissons chaudes' },
  { id: 'boissons-froides', label: 'Boissons froides' },
];

const MENU_ITEMS = [
  { id: 'formules-plat-boisson', cat: 'formules', icon: '🍽️', name: 'Plat + Boisson', desc: 'Un plat au choix + une boisson.', price: 8.5 },
  { id: 'formules-plat-boisson-dessert', cat: 'formules', icon: '🍽️', name: 'Plat + Boisson + Dessert', desc: 'La formule complète : plat, boisson et dessert.', price: 12.5 },
  { id: 'formules-etudiante', cat: 'formules', icon: '🎓', name: 'Formule Étudiante', desc: 'Tarif préférentiel sur présentation de la carte étudiante.', price: 9.8 },
  { id: 'formules-tbm', cat: 'formules', icon: '🚋', name: 'Formule TBM', desc: 'Pensée pour les actifs et usagers du réseau de transport.', price: 9.8 },
  { id: 'sandwichs-poire-boeuf-pesto', cat: 'sandwichs', icon: '🥪', name: 'Poire Bœuf Pesto', price: 11.5 },
  { id: 'sandwichs-tartare-oeuf-confit', cat: 'sandwichs', icon: '🥪', name: 'Tartare Œuf Confit', price: 13.5 },
  { id: 'sandwichs-poulet-pane-tonkatsu', cat: 'sandwichs', icon: '🥪', name: 'Poulet Pané Tonkatsu', price: 11.5 },
  { id: 'sandwichs-saumon-frais-guacamol', cat: 'sandwichs', icon: '🥪', name: 'Saumon Frais Guacamole', price: 13.5 },
  { id: 'sandwichs-jambon-cru-burrata', cat: 'sandwichs', icon: '🥪', name: 'Jambon Cru Burrata', price: 13.5 },
  { id: 'sandwichs-poitr-auberg-chevre', cat: 'sandwichs', icon: '🥪', name: 'Poitrine Aubergine Chèvre', price: 11.5 },
  { id: 'sandwichs-parisien-jambon-mac', cat: 'sandwichs', icon: '🥪', name: 'Parisien Jambon Maison', price: 11.5 },
  { id: 'sandwichs-nordique-saumon', cat: 'sandwichs', icon: '🥪', name: 'Nordique Saumon', price: 13.5 },
  { id: 'sandwichs-asiatiq-poulet-mar', cat: 'sandwichs', icon: '🥪', name: 'Asiatique Poulet Mariné', price: 11.5 },
  { id: 'sandwichs-jambon-beurre', cat: 'sandwichs', icon: '🥪', name: 'Jambon Beurre', price: 8.0 },
  { id: 'sandwichs-poulet-mayo', cat: 'sandwichs', icon: '🥪', name: 'Poulet Mayo', price: 8.0 },
  { id: 'sandwichs-thon-mayo', cat: 'sandwichs', icon: '🥪', name: 'Thon Mayo', price: 8.0 },
  { id: 'sandwichs-vege-du-jour', cat: 'sandwichs', icon: '🥪', name: 'Végé du Jour', price: 11.5 },
  { id: 'sandwichs-truffe', cat: 'sandwichs', icon: '🥪', name: 'Truffe', price: 13.5 },
  { id: 'salades-salade-riz-poulet', cat: 'salades', icon: '🥗', name: 'Salade Riz Poulet', price: 11.5 },
  { id: 'salades-salade-riz-thon', cat: 'salades', icon: '🥗', name: 'Salade Riz Thon', price: 11.5 },
  { id: 'salades-salade-saumon', cat: 'salades', icon: '🥗', name: 'Salade Saumon', price: 11.5 },
  { id: 'salades-salade-vege', cat: 'salades', icon: '🥗', name: 'Salade Végé', price: 11.5 },
  { id: 'salades-salade-du-jour', cat: 'salades', icon: '🥗', name: 'Salade du Jour', price: 11.5 },
  { id: 'snacking-pizza-carre', cat: 'snacking', icon: '🍕', name: 'Pizza Carrée', price: 5.0 },
  { id: 'snacking-hot-dog', cat: 'snacking', icon: '🌭', name: 'Hot Dog', price: 5.0 },
  { id: 'snacking-croque-mr', cat: 'snacking', icon: '🧀', name: 'Croque Monsieur', price: 5.0 },
  { id: 'snacking-panini-poulet', cat: 'snacking', icon: '🥙', name: 'Panini Poulet', price: 5.0 },
  { id: 'snacking-wrap-poulet', cat: 'snacking', icon: '🌯', name: 'Wrap Poulet', price: 5.0 },
  { id: 'snacking-chips-nature-45g', cat: 'snacking', icon: '🍟', name: 'Chips Nature 45g', price: 2.0 },
  { id: 'snacking-chips-bbq-45g', cat: 'snacking', icon: '🍟', name: 'Chips BBQ 45g', price: 2.2 },
  { id: 'snacking-chips-vinaigre-45g', cat: 'snacking', icon: '🍟', name: 'Chips Vinaigre 45g', price: 2.2 },
  { id: 'sucre-cookie', cat: 'sucre', icon: '🍪', name: 'Cookie', price: 2.8 },
  { id: 'sucre-croissant', cat: 'sucre', icon: '🥐', name: 'Croissant', price: 2.2 },
  { id: 'sucre-pain-au-choc', cat: 'sucre', icon: '🥐', name: 'Pain au chocolat', price: 2.4 },
  { id: 'sucre-flan', cat: 'sucre', icon: '🍮', name: 'Flan', price: 4.2 },
  { id: 'sucre-marbre', cat: 'sucre', icon: '🍰', name: 'Marbré', price: 3.8 },
  { id: 'sucre-muffin', cat: 'sucre', icon: '🧁', name: 'Muffin', price: 3.8 },
  { id: 'sucre-brownie', cat: 'sucre', icon: '🍫', name: 'Brownie', price: 4.5 },
  { id: 'sucre-cafe-gourmand', cat: 'sucre', icon: '☕', name: 'Café Gourmand', price: 8.9 },
  { id: 'sucre-the-gourmand', cat: 'sucre', icon: '☕', name: 'Thé Gourmand', price: 8.5 },
  { id: 'sucre-infus-gourmand', cat: 'sucre', icon: '☕', name: 'Infus Gourmand', price: 8.5 },
  { id: 'boissons-chaudes-cafe', cat: 'boissons-chaudes', icon: '☕', name: 'Café', price: 2.0 },
  { id: 'boissons-chaudes-grd-cafe', cat: 'boissons-chaudes', icon: '☕', name: 'Grand Café', price: 2.5 },
  { id: 'boissons-chaudes-cafe-allonge', cat: 'boissons-chaudes', icon: '☕', name: 'Café Allongé', price: 2.2 },
  { id: 'boissons-chaudes-cafe-serre', cat: 'boissons-chaudes', icon: '☕', name: 'Café Serré', price: 2.0 },
  { id: 'boissons-chaudes-deca', cat: 'boissons-chaudes', icon: '☕', name: 'Déca', price: 2.1 },
  { id: 'boissons-chaudes-grd-deca', cat: 'boissons-chaudes', icon: '☕', name: 'Grand Déca', price: 2.6 },
  { id: 'boissons-chaudes-deca-creme', cat: 'boissons-chaudes', icon: '☕', name: 'Déca Crème', price: 2.7 },
  { id: 'boissons-chaudes-grd-deca-creme', cat: 'boissons-chaudes', icon: '☕', name: 'Grand Déca Crème', price: 3.1 },
  { id: 'boissons-chaudes-creme', cat: 'boissons-chaudes', icon: '☕', name: 'Crème', price: 2.6 },
  { id: 'boissons-chaudes-grd-creme', cat: 'boissons-chaudes', icon: '☕', name: 'Grand Crème', price: 3.0 },
  { id: 'boissons-chaudes-cappuccino', cat: 'boissons-chaudes', icon: '☕', name: 'Cappuccino', price: 3.5 },
  { id: 'boissons-chaudes-latte', cat: 'boissons-chaudes', icon: '☕', name: 'Latte', price: 3.8 },
  { id: 'boissons-chaudes-latte-vanille', cat: 'boissons-chaudes', icon: '☕', name: 'Latte Vanille', price: 4.2 },
  { id: 'boissons-chaudes-latte-caramel', cat: 'boissons-chaudes', icon: '☕', name: 'Latte Caramel', price: 4.2 },
  { id: 'boissons-chaudes-mocha', cat: 'boissons-chaudes', icon: '☕', name: 'Mocha', price: 4.2 },
  { id: 'boissons-chaudes-cafe-frappe', cat: 'boissons-chaudes', icon: '☕', name: 'Café Frappé', price: 4.2 },
  { id: 'boissons-chaudes-latte-frappe', cat: 'boissons-chaudes', icon: '☕', name: 'Latte Frappé', price: 4.8 },
  { id: 'boissons-chaudes-matcha', cat: 'boissons-chaudes', icon: '☕', name: 'Matcha', price: 4.2 },
  { id: 'boissons-chaudes-matcha-latte', cat: 'boissons-chaudes', icon: '☕', name: 'Matcha Latte', price: 4.8 },
  { id: 'boissons-chaudes-ube', cat: 'boissons-chaudes', icon: '☕', name: 'Ube', price: 5.0 },
  { id: 'boissons-chaudes-chocolat', cat: 'boissons-chaudes', icon: '🍫', name: 'Chocolat', price: 3.2 },
  { id: 'boissons-chaudes-choc-vienois', cat: 'boissons-chaudes', icon: '🍫', name: 'Chocolat Viennois', price: 4.0 },
  { id: 'boissons-chaudes-cafe-vienois', cat: 'boissons-chaudes', icon: '☕', name: 'Café Viennois', price: 4.0 },
  { id: 'boissons-chaudes-the', cat: 'boissons-chaudes', icon: '🍵', name: 'Thé', price: 3.0 },
  { id: 'boissons-chaudes-the-lait', cat: 'boissons-chaudes', icon: '🍵', name: 'Thé Lait', price: 3.5 },
  { id: 'boissons-chaudes-the-citron', cat: 'boissons-chaudes', icon: '🍵', name: 'Thé Citron', price: 3.2 },
  { id: 'boissons-chaudes-the-menthe', cat: 'boissons-chaudes', icon: '🍵', name: 'Thé Menthe', price: 3.0 },
  { id: 'boissons-chaudes-the-caramel', cat: 'boissons-chaudes', icon: '🍵', name: 'Thé Caramel', price: 3.0 },
  { id: 'boissons-chaudes-the-darjeeling', cat: 'boissons-chaudes', icon: '🍵', name: 'Thé Darjeeling', price: 3.0 },
  { id: 'boissons-chaudes-the-vanille', cat: 'boissons-chaudes', icon: '🍵', name: 'Thé Vanille', price: 3.0 },
  { id: 'boissons-chaudes-the-earl-grey', cat: 'boissons-chaudes', icon: '🍵', name: 'Thé Earl Grey', price: 3.0 },
  { id: 'boissons-chaudes-the-ceylan', cat: 'boissons-chaudes', icon: '🍵', name: 'Thé Ceylan', price: 3.0 },
  { id: 'boissons-chaudes-infusion', cat: 'boissons-chaudes', icon: '🍵', name: 'Infusion', price: 3.0 },
  { id: 'boissons-chaudes-verveine', cat: 'boissons-chaudes', icon: '🍵', name: 'Verveine', price: 3.0 },
  { id: 'boissons-chaudes-tilleul', cat: 'boissons-chaudes', icon: '🍵', name: 'Tilleul', price: 3.0 },
  { id: 'boissons-chaudes-verv-menthe', cat: 'boissons-chaudes', icon: '🍵', name: 'Verveine Menthe', price: 3.0 },
  { id: 'boissons-chaudes-till-menthe', cat: 'boissons-chaudes', icon: '🍵', name: 'Tilleul Menthe', price: 3.0 },
  { id: 'boissons-chaudes-grog', cat: 'boissons-chaudes', icon: '🥃', name: 'Grog', price: 6.5 },
  { id: 'boissons-chaudes-irish-coffee', cat: 'boissons-chaudes', icon: '🥃', name: 'Irish Coffee', price: 8.0 },
  { id: 'boissons-chaudes-vin-chaud', cat: 'boissons-chaudes', icon: '🥃', name: 'Vin Chaud', price: 6.5 },
  { id: 'boissons-froides-volvic-50cl', cat: 'boissons-froides', icon: '🥤', name: 'Volvic 50cl', price: 2.2 },
  { id: 'boissons-froides-volvic-citron-50', cat: 'boissons-froides', icon: '🥤', name: 'Volvic Citron 50', price: 2.8 },
  { id: 'boissons-froides-volvic-fraise-50', cat: 'boissons-froides', icon: '🥤', name: 'Volvic Fraise 50', price: 2.8 },
  { id: 'boissons-froides-badoit-vert-50cl', cat: 'boissons-froides', icon: '🥤', name: 'Badoit Vert 50cl', price: 2.5 },
  { id: 'boissons-froides-badoit-rouge-33', cat: 'boissons-froides', icon: '🥤', name: 'Badoit Rouge 33', price: 2.6 },
  { id: 'boissons-froides-badoit-rouge-1l', cat: 'boissons-froides', icon: '🥤', name: 'Badoit Rouge 1l', price: 4.2 },
  { id: 'boissons-froides-evian-50cl', cat: 'boissons-froides', icon: '🥤', name: 'Evian 50cl', price: 2.2 },
  { id: 'boissons-froides-evian-1l', cat: 'boissons-froides', icon: '🥤', name: 'Evian 1l', price: 4.0 },
  { id: 'boissons-froides-carafe-eau', cat: 'boissons-froides', icon: '🥤', name: 'Carafe Eau', price: 0.0 },
  { id: 'boissons-froides-pepsi-33cl', cat: 'boissons-froides', icon: '🥤', name: 'Pepsi 33cl', price: 2.8 },
  { id: 'boissons-froides-pepsi-max-33cl', cat: 'boissons-froides', icon: '🥤', name: 'Pepsi Max 33cl', price: 2.8 },
  { id: 'boissons-froides-7up-33cl', cat: 'boissons-froides', icon: '🥤', name: '7Up 33cl', price: 2.8 },
  { id: 'boissons-froides-lipton-peche-25', cat: 'boissons-froides', icon: '🥤', name: 'Lipton Pêche 25', price: 2.8 },
  { id: 'boissons-froides-pepsi-50cl', cat: 'boissons-froides', icon: '🥤', name: 'Pepsi 50cl', price: 3.8 },
  { id: 'boissons-froides-pepsi-max-50cl', cat: 'boissons-froides', icon: '🥤', name: 'Pepsi Max 50cl', price: 3.8 },
  { id: 'boissons-froides-pepsi-cherry-50', cat: 'boissons-froides', icon: '🥤', name: 'Pepsi Cherry 50', price: 3.8 },
  { id: 'boissons-froides-7up-zero-50cl', cat: 'boissons-froides', icon: '🥤', name: '7Up Zéro 50cl', price: 3.8 },
  { id: 'boissons-froides-lipton-peche-50', cat: 'boissons-froides', icon: '🥤', name: 'Lipton Pêche 50', price: 3.8 },
  { id: 'boissons-froides-lipton-green-50', cat: 'boissons-froides', icon: '🥤', name: 'Lipton Green 50', price: 3.8 },
  { id: 'boissons-froides-orangina', cat: 'boissons-froides', icon: '🥤', name: 'Orangina', price: 2.8 },
  { id: 'boissons-froides-schweppes-tonic', cat: 'boissons-froides', icon: '🥤', name: 'Schweppes Tonic', price: 2.8 },
  { id: 'boissons-froides-schw-agrumes', cat: 'boissons-froides', icon: '🥤', name: 'Schweppes Agrumes', price: 2.8 },
  { id: 'boissons-froides-red-bull', cat: 'boissons-froides', icon: '⚡', name: 'Red Bull', price: 4.5 },
  { id: 'boissons-froides-sirop-eau', cat: 'boissons-froides', icon: '🍹', name: 'Sirop Eau', price: 2.2 },
  { id: 'boissons-froides-diabolo', cat: 'boissons-froides', icon: '🍹', name: 'Diabolo', price: 3.0 },
  { id: 'boissons-froides-diab-fraise', cat: 'boissons-froides', icon: '🍹', name: 'Diabolo Fraise', price: 3.0 },
  { id: 'boissons-froides-diab-menthe', cat: 'boissons-froides', icon: '🍹', name: 'Diabolo Menthe', price: 3.0 },
  { id: 'boissons-froides-diab-citron', cat: 'boissons-froides', icon: '🍹', name: 'Diabolo Citron', price: 3.0 },
  { id: 'boissons-froides-sirop-grenad', cat: 'boissons-froides', icon: '🍹', name: 'Sirop Grenadine', price: 2.2 },
  { id: 'boissons-froides-sirop-menthe', cat: 'boissons-froides', icon: '🍹', name: 'Sirop Menthe', price: 2.2 },
  { id: 'boissons-froides-sirop-citron', cat: 'boissons-froides', icon: '🍹', name: 'Sirop Citron', price: 2.2 },
  { id: 'boissons-froides-sirop-orgeat', cat: 'boissons-froides', icon: '🍹', name: 'Sirop Orgeat', price: 2.2 },
  { id: 'boissons-froides-sirop-passion', cat: 'boissons-froides', icon: '🍹', name: 'Sirop Passion', price: 2.2 },
  { id: 'boissons-froides-jus-orange', cat: 'boissons-froides', icon: '🧃', name: 'Jus Orange', price: 3.8 },
  { id: 'boissons-froides-jus-ananas', cat: 'boissons-froides', icon: '🧃', name: 'Jus Ananas', price: 3.8 },
  { id: 'boissons-froides-jus-pamplem', cat: 'boissons-froides', icon: '🧃', name: 'Jus Pamplemousse', price: 3.8 },
  { id: 'boissons-froides-jus-tomate', cat: 'boissons-froides', icon: '🧃', name: 'Jus Tomate', price: 3.8 },
  { id: 'boissons-froides-jus-ace', cat: 'boissons-froides', icon: '🧃', name: 'Jus ACE', price: 3.8 },
  { id: 'boissons-froides-jus-mangue', cat: 'boissons-froides', icon: '🧃', name: 'Jus Mangue', price: 3.8 },
  { id: 'boissons-froides-jus-abricot', cat: 'boissons-froides', icon: '🧃', name: 'Jus Abricot', price: 3.8 },
  { id: 'boissons-froides-jus-pomme', cat: 'boissons-froides', icon: '🧃', name: 'Jus Pomme', price: 3.8 },
  { id: 'boissons-froides-citron-presse', cat: 'boissons-froides', icon: '🧃', name: 'Citron Pressé', price: 5.5 },
  { id: 'boissons-froides-orange-pressee', cat: 'boissons-froides', icon: '🧃', name: 'Orange Pressée', price: 5.5 },
];

// Formules : prix fixe quelle que soit la composition choisie (comme sur la borne).
const FORMULES_CONFIG = {
  'formules-plat-boisson': { needsDessert: false },
  'formules-plat-boisson-dessert': { needsDessert: true },
  'formules-etudiante': { needsDessert: false },
  'formules-tbm': { needsDessert: false },
};

const PLAT_CATEGORIES = ['sandwichs', 'salades', 'snacking'];

let activeCategory = 'formules';
let diningMode = 'sur-place';
// cart[lineId] = { name, price, icon, qty }
const cart = {};

function formatPrice(n) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function addToCart(lineId, { name, price, icon }) {
  if (!cart[lineId]) cart[lineId] = { name, price, icon, qty: 0 };
  cart[lineId].qty += 1;
}
function removeFromCart(lineId) {
  if (!cart[lineId]) return;
  cart[lineId].qty -= 1;
  if (cart[lineId].qty <= 0) delete cart[lineId];
}

function renderCategoryTabs() {
  const tabsEl = document.getElementById('ccTabs');
  tabsEl.innerHTML = MENU_CATEGORIES.map(c =>
    `<button class="cc-tab${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">${c.label}</button>`
  ).join('');

  tabsEl.querySelectorAll('.cc-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderCategoryTabs();
      renderMenuGrid();
    });
  });
}

function renderMenuGrid() {
  const grid = document.getElementById('ccGrid');
  const items = MENU_ITEMS.filter(i => i.cat === activeCategory);
  const isFormules = activeCategory === 'formules';

  grid.innerHTML = items.map(item => {
    const qty = cart[item.id] ? cart[item.id].qty : 0;
    return `
      <div class="cc-card">
        <div class="cc-card-icon">${item.icon}</div>
        <h3>${item.name}</h3>
        ${item.desc ? `<p class="cc-desc">${item.desc}</p>` : ''}
        <div class="cc-card-foot">
          <span class="cc-price">${formatPrice(item.price)}</span>
          ${isFormules
            ? `<button class="btn btn-ghost btn-sm" data-action="configure" data-id="${item.id}">Composer</button>`
            : (qty > 0
                ? `<div class="cc-qty">
                     <button data-action="dec" data-id="${item.id}" aria-label="Retirer">−</button>
                     <span>${qty}</span>
                     <button data-action="inc" data-id="${item.id}" aria-label="Ajouter">+</button>
                   </div>`
                : `<button class="cc-add-btn" data-action="inc" data-id="${item.id}" aria-label="Ajouter au panier">+</button>`)
          }
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (action === 'configure') {
        openConfigurator(MENU_ITEMS.find(i => i.id === id));
        return;
      }
      const item = MENU_ITEMS.find(i => i.id === id);
      if (action === 'inc') {
        addToCart(id, item);
      } else {
        removeFromCart(id);
      }
      renderMenuGrid();
      renderCart();
    });
  });
}

function cartItemsList() {
  return Object.entries(cart).map(([id, v]) => ({ id, ...v }));
}

function cartTotal() {
  return cartItemsList().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function cartCount() {
  return cartItemsList().reduce((sum, i) => sum + i.qty, 0);
}

function renderCart() {
  const count = cartCount();
  const fab = document.getElementById('cartButton');
  const countEl = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const submitBtn = document.getElementById('orderSubmitBtn');

  countEl.textContent = count;
  fab.classList.toggle('visible', count > 0);
  submitBtn.disabled = count === 0;

  const items = cartItemsList();
  if (items.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Votre panier est vide.<br>Ajoutez des produits depuis la carte.</p>';
  } else {
    itemsEl.innerHTML = items.map(i => `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${i.icon} ${i.name} × ${i.qty}</div>
          <div class="cart-item-price">${formatPrice(i.price * i.qty)}</div>
        </div>
        <div class="cc-qty">
          <button data-action="dec" data-id="${i.id}" aria-label="Retirer">−</button>
          <span>${i.qty}</span>
          <button data-action="inc" data-id="${i.id}" aria-label="Ajouter">+</button>
        </div>
      </div>
    `).join('');

    itemsEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (btn.dataset.action === 'inc') {
          addToCart(id, cart[id]);
        } else {
          removeFromCart(id);
        }
        renderCart();
        renderMenuGrid();
      });
    });
  }

  totalEl.textContent = formatPrice(cartTotal());
}

function initClickAndCollect() {
  renderCategoryTabs();
  renderMenuGrid();
  renderCart();

  const cartButton = document.getElementById('cartButton');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');

  function openCart() {
    closeOrderModal();
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }
  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }

  cartButton.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // ===== Click & Collect catalog — pop-up modal =====
  const orderModal = document.getElementById('orderModal');
  const orderModalOverlay = document.getElementById('orderModalOverlay');
  const orderModalClose = document.getElementById('orderModalClose');
  const ccBrowseView = document.getElementById('ccBrowseView');
  const ccConfigurator = document.getElementById('ccConfigurator');

  function showBrowseView() {
    ccConfigurator.hidden = true;
    ccBrowseView.hidden = false;
  }

  function openOrderModal(category) {
    closeCart();
    showBrowseView();
    if (category) {
      activeCategory = category;
      renderCategoryTabs();
      renderMenuGrid();
    }
    orderModal.classList.add('open');
    orderModalOverlay.classList.add('open');
  }
  function closeOrderModal() {
    orderModal.classList.remove('open');
    orderModalOverlay.classList.remove('open');
  }

  document.querySelectorAll('.js-open-order').forEach(btn => {
    btn.addEventListener('click', () => openOrderModal(btn.dataset.cat));
  });
  orderModalClose.addEventListener('click', closeOrderModal);
  orderModalOverlay.addEventListener('click', closeOrderModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOrderModal();
      closeCart();
    }
  });

  // ===== Sur place / À emporter toggle =====
  document.querySelectorAll('.cc-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      diningMode = btn.dataset.mode;
      document.querySelectorAll('.cc-mode-btn').forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  // ===== Formule configurator =====
  const configBack = document.getElementById('ccConfigBack');
  const configTitle = document.getElementById('ccConfigTitle');
  const configPrice = document.getElementById('ccConfigPrice');
  const configPlat = document.getElementById('ccConfigPlat');
  const configBoisson = document.getElementById('ccConfigBoisson');
  const configDessertField = document.getElementById('ccConfigDessertField');
  const configDessert = document.getElementById('ccConfigDessert');
  const configAdd = document.getElementById('ccConfigAdd');

  let currentFormula = null;

  function optionsFor(cat) {
    return MENU_ITEMS.filter(i => i.cat === cat)
      .map(i => `<option value="${i.id}">${i.name} ${i.price > 0 ? '(' + formatPrice(i.price) + ' à la carte)' : ''}</option>`)
      .join('');
  }

  function openConfigurator(formula) {
    currentFormula = formula;
    const config = FORMULES_CONFIG[formula.id] || { needsDessert: false };

    configTitle.textContent = formula.name;
    configPrice.textContent = `${formatPrice(formula.price)} — prix fixe quel que soit votre choix`;

    configPlat.innerHTML = PLAT_CATEGORIES.map(cat => {
      const items = MENU_ITEMS.filter(i => i.cat === cat);
      const label = MENU_CATEGORIES.find(c => c.id === cat)?.label || cat;
      return `<optgroup label="${label}">${items.map(i => `<option value="${i.id}">${i.name}</option>`).join('')}</optgroup>`;
    }).join('');

    configBoisson.innerHTML = optionsFor('boissons-froides');
    configDessertField.style.display = config.needsDessert ? '' : 'none';
    if (config.needsDessert) configDessert.innerHTML = optionsFor('sucre');

    ccBrowseView.hidden = true;
    ccConfigurator.hidden = false;
  }

  configBack.addEventListener('click', showBrowseView);

  configAdd.addEventListener('click', () => {
    if (!currentFormula) return;
    const config = FORMULES_CONFIG[currentFormula.id] || { needsDessert: false };

    const platItem = MENU_ITEMS.find(i => i.id === configPlat.value);
    const boissonItem = MENU_ITEMS.find(i => i.id === configBoisson.value);
    const dessertItem = config.needsDessert ? MENU_ITEMS.find(i => i.id === configDessert.value) : null;

    const parts = [platItem.name, boissonItem.name];
    if (dessertItem) parts.push(dessertItem.name);

    const lineId = `${currentFormula.id}__${platItem.id}__${boissonItem.id}__${dessertItem ? dessertItem.id : ''}`;
    addToCart(lineId, {
      name: `${currentFormula.name} — ${parts.join(' + ')}`,
      price: currentFormula.price,
      icon: currentFormula.icon,
    });

    renderCart();
    showBrowseView();
    renderMenuGrid();
  });

  const orderForm = document.getElementById('orderForm');
  const orderStatus = document.getElementById('orderStatus');
  const orderSubmitBtn = document.getElementById('orderSubmitBtn');

  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (cartCount() === 0) return;

    orderStatus.textContent = '';
    orderStatus.className = 'form-status';
    orderSubmitBtn.disabled = true;
    orderSubmitBtn.textContent = 'Envoi en cours…';

    const formData = Object.fromEntries(new FormData(orderForm).entries());
    const payload = {
      ...formData,
      diningMode,
      items: cartItemsList().map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      total: cartTotal(),
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');

      orderStatus.textContent = 'Commande envoyée ! Réglez sur place au retrait. À très vite 👋';
      orderStatus.classList.add('success');

      Object.keys(cart).forEach(id => delete cart[id]);
      renderMenuGrid();
      renderCart();
      orderForm.reset();
      setTimeout(closeCart, 1800);
    } catch (err) {
      orderStatus.textContent = 'Une erreur est survenue. Merci de réessayer.';
      orderStatus.classList.add('error');
    } finally {
      orderSubmitBtn.disabled = cartCount() === 0;
      orderSubmitBtn.textContent = 'Valider ma commande';
    }
  });
}

initClickAndCollect();

// ===== Splash → Site reveal =====
const splash = document.getElementById('splash');
const site = document.getElementById('site');
const discoverBtn = document.getElementById('discoverBtn');

function revealSite() {
  site.classList.add('revealed');
  document.body.classList.add('site-active');
  site.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

discoverBtn.addEventListener('click', revealSite);

// If user scrolls past the splash manually, reveal too
window.addEventListener('wheel', (e) => {
  if (!site.classList.contains('revealed') && e.deltaY > 0) {
    revealSite();
  }
}, { passive: true });

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const headerNav = document.querySelector('.header-nav');

navToggle.addEventListener('click', () => {
  headerNav.classList.toggle('open');
});

headerNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => headerNav.classList.remove('open'));
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Reservation form =====
const form = document.getElementById('reservationForm');
const submitBtn = document.getElementById('submitBtn');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = '';
  statusEl.className = 'form-status';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours…';

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Request failed');

    statusEl.textContent = 'Merci ! Votre demande de réservation a bien été envoyée. Nous vous recontactons rapidement.';
    statusEl.classList.add('success');
    form.reset();
  } catch (err) {
    statusEl.textContent = 'Une erreur est survenue. Merci de réessayer ou de nous contacter directement par mail.';
    statusEl.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer ma demande';
  }
});
