let category = "all";
let query = "";
let sort = "default";
let cart = JSON.parse(localStorage.getItem("mini-shop-cart") || "{}");

function saveCart() { localStorage.setItem("mini-shop-cart", JSON.stringify(cart)); }
function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartSubtotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(x => x.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

function render() {
  let list = PRODUCTS.filter(p =>
    (category === "all" || p.category === category) &&
    (p.name.toLowerCase().includes(query) || p.desc.includes(query))
  );
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

  document.getElementById("count").textContent = list.length;
  const grid = document.getElementById("grid");
  grid.innerHTML = list.length ? list.map(p => `
    <article class="card">
      <div class="visual">${p.emoji}</div>
      <div class="body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price-row"><span class="price">$${p.price.toFixed(2)}</span><span class="rating">⭐ ${p.rating}</span></div>
      </div>
      <div class="actions">
        <button class="detail" onclick="showDetail(${p.id})">详情</button>
        <button class="add" onclick="addToCart(${p.id})">加入购物车</button>
      </div>
    </article>`).join("") : `<p class="empty">没有找到符合条件的商品，换个关键词试试。</p>`;

  document.getElementById("cartCount").textContent = cartCount();
  renderCart();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const ids = Object.keys(cart);
  if (!ids.length) { box.innerHTML = `<p class="empty">购物车是空的，先去挑几件吧。</p>`; }
  else {
    box.innerHTML = ids.map(id => {
      const p = PRODUCTS.find(x => x.id === Number(id));
      if (!p) return "";
      return `<div class="cart-item">
        <span class="emoji">${p.emoji}</span>
        <div class="info"><div>${p.name}</div><div>$${p.price.toFixed(2)}</div></div>
        <div class="qty">
          <button onclick="changeQty(${p.id}, -1)">−</button><span>${cart[id]}</span><button onclick="changeQty(${p.id}, 1)">+</button>
        </div>
        <button class="close" onclick="removeItem(${p.id})">删除</button>
      </div>`;
    }).join("");
  }
  const sub = cartSubtotal();
  const ship = sub === 0 ? 0 : (sub >= 50 ? 0 : 5.99);
  document.getElementById("totals").innerHTML = `
    小计：$${sub.toFixed(2)}<br>
    运费：${sub === 0 ? "$0.00" : (ship === 0 ? "免运费" : "$" + ship.toFixed(2))}<br>
    <strong>总计：$${(sub + ship).toFixed(2)}</strong>`;
}

function addToCart(id) { cart[id] = (cart[id] || 0) + 1; saveCart(); render(); }
function changeQty(id, d) { cart[id] += d; if (cart[id] <= 0) delete cart[id]; saveCart(); render(); }
function removeItem(id) { delete cart[id]; saveCart(); render(); }
function setCategory(c, el) {
  category = c;
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
  render();
}
function showDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  document.getElementById("detailBody").innerHTML = `
    <div style="font-size:64px;text-align:center">${p.emoji}</div>
    <h2>${p.name}</h2>
    <p>${p.desc}</p>
    <p>分类：${CATEGORIES[p.category]}　评分：⭐ ${p.rating}</p>
    <p class="price">$${p.price.toFixed(2)}</p>`;
  document.getElementById("detailModal").classList.add("open");
  document.getElementById("detailAdd").onclick = () => { addToCart(id); closeModal("detailModal"); openCart(); };
}
function closeModal(id) { document.getElementById(id).classList.remove("open"); }
function openCart() { document.getElementById("drawer").classList.add("open"); }
function closeCart() { document.getElementById("drawer").classList.remove("open"); }
function openCheckout() {
  if (!cartCount()) { alert("购物车是空的，先加几件商品。"); return; }
  closeCart();
  document.getElementById("checkoutModal").classList.add("open");
}
function submitOrder(e) {
  e.preventDefault();
  const orderNo = "MS" + Date.now().toString().slice(-8);
  document.getElementById("orderResult").innerHTML = `<p>✅ 下单成功（演示）</p><p>订单号：<strong>${orderNo}</strong></p><p class="note">这只是前端模拟，没有真实支付和发货。</p>`;
  cart = {}; saveCart(); render();
}

document.getElementById("search").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); render(); });
document.getElementById("sort").addEventListener("change", e => { sort = e.target.value; render(); });
document.getElementById("checkoutForm").addEventListener("submit", submitOrder);
render();
