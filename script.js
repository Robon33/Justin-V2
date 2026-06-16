// ===== Click & Collect — menu data =====
// ⚠️ PLACEHOLDER : à remplacer par la vraie carte (produits, descriptions, prix) dès réception.
const MENU_CATEGORIES = [
  { id: 'sandwichs', label: 'Sandwichs' },
  { id: 'salades', label: 'Salades' },
  { id: 'snacking', label: 'Snacking' },
  { id: 'sucre', label: 'Sucré' },
  { id: 'boissons', label: 'Boissons' },
];

const MENU_ITEMS = [
  { id: 'sw-poulet', cat: 'sandwichs', icon: '🥪', name: 'Le Justin Poulet', desc: 'Poulet rôti, sauce maison, crudités, pain artisanal.', price: 7.5 },
  { id: 'sw-jambon', cat: 'sandwichs', icon: '🥪', name: 'Le Parisien', desc: 'Jambon, beurre, cornichons — la simplicité bien faite.', price: 6.5 },
  { id: 'sw-vege', cat: 'sandwichs', icon: '🥪', name: 'Le Végétal', desc: 'Houmous, légumes grillés, herbes fraîches.', price: 7.0 },
  { id: 'sal-riz', cat: 'salades', icon: '🥗', name: 'Salade César au riz', desc: 'Poulet grillé, parmesan, riz, sauce César.', price: 8.5 },
  { id: 'sal-fraiche', cat: 'salades', icon: '🥗', name: 'Salade fraîcheur', desc: 'Crudités de saison, vinaigrette maison.', price: 7.5 },
  { id: 'sn-pizza', cat: 'snacking', icon: '🍕', name: 'Pizza carrée', desc: 'Tomate, mozzarella, origan.', price: 4.5 },
  { id: 'sn-hotdog', cat: 'snacking', icon: '🌭', name: 'Hot-dog Justin', desc: 'Saucisse, oignons confits, sauce maison.', price: 5.5 },
  { id: 'su-cookie', cat: 'sucre', icon: '🍪', name: 'Cookie', desc: 'Pépites de chocolat, cuit minute.', price: 2.8 },
  { id: 'su-croissant', cat: 'sucre', icon: '🥐', name: 'Croissant', desc: 'Pur beurre, tradition française.', price: 2.0 },
  { id: 'su-painchoc', cat: 'sucre', icon: '🥐', name: 'Pain au chocolat', desc: 'Pur beurre.', price: 2.2 },
  { id: 'su-flan', cat: 'sucre', icon: '🍮', name: 'Flan', desc: 'Pâtissier, recette traditionnelle.', price: 3.0 },
  { id: 'bo-cafe', cat: 'boissons', icon: '☕', name: 'Café', desc: 'Espresso, allongé ou crème.', price: 2.5 },
  { id: 'bo-matcha', cat: 'boissons', icon: '🍵', name: 'Matcha Ube', desc: 'Notre signature — matcha &amp; ube.', price: 4.5 },
  { id: 'bo-soda', cat: 'boissons', icon: '🥤', name: '7Up / Volvic citron-fraise', desc: 'Au choix.', price: 3.0 },
];

let activeCategory = 'sandwichs';
const cart = {}; // { itemId: qty }

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

function formatPrice(n) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function renderMenuGrid() {
  const grid = document.getElementById('ccGrid');
  const items = MENU_ITEMS.filter(i => i.cat === activeCategory);

  grid.innerHTML = items.map(item => {
    const qty = cart[item.id] || 0;
    return `
      <div class="cc-card">
        <div class="cc-card-icon">${item.icon}</div>
        <h3>${item.name}</h3>
        <p class="cc-desc">${item.desc}</p>
        <div class="cc-card-foot">
          <span class="cc-price">${formatPrice(item.price)}</span>
          ${qty > 0
            ? `<div class="cc-qty">
                 <button data-action="dec" data-id="${item.id}" aria-label="Retirer">−</button>
                 <span>${qty}</span>
                 <button data-action="inc" data-id="${item.id}" aria-label="Ajouter">+</button>
               </div>`
            : `<button class="cc-add-btn" data-action="inc" data-id="${item.id}" aria-label="Ajouter au panier">+</button>`
          }
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (btn.dataset.action === 'inc') {
        cart[id] = (cart[id] || 0) + 1;
      } else {
        cart[id] = Math.max(0, (cart[id] || 0) - 1);
        if (cart[id] === 0) delete cart[id];
      }
      renderMenuGrid();
      renderCart();
    });
  });
}

function cartItemsList() {
  return Object.entries(cart).map(([id, qty]) => {
    const item = MENU_ITEMS.find(i => i.id === id);
    return { ...item, qty };
  });
}

function cartTotal() {
  return cartItemsList().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function cartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
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
          cart[id] = (cart[id] || 0) + 1;
        } else {
          cart[id] = Math.max(0, (cart[id] || 0) - 1);
          if (cart[id] === 0) delete cart[id];
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
