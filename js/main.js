const containerProdutos = document.getElementById("produtos");
const carrinhoBtn = document.getElementById("carrinho");
const cart = document.getElementById("cart");
const fecharCarrinho = document.getElementById("fecharCarrinho");
const cartItems = document.getElementById("cartItems");
const contadorEl = document.getElementById("item");
const totalEl = document.getElementById("total");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const API_URL = "https://dummyjson.com/products/category/smartphones";
let carrinho = [];

const formatarValor = valor => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

async function carregarProdutos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    data.products.forEach(produto => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${produto.images[0]}" alt="${produto.title}" loading="lazy">
        <div>
          <h3>${produto.title}</h3>
          <p style="color:#86868b; font-size:0.85rem;">Hardware de última geração</p>
        </div>
        <div>
          <span>${formatarValor(produto.price * 5)}</span>
          <button class="btn_comprar">Adicionar ao Carrinho</button>
        </div>
      `;
      card.querySelector(".btn_comprar").onclick = () => adicionarAoCarrinho(produto);
      containerProdutos.appendChild(card);
    });
  } catch (err) {
    containerProdutos.innerHTML = "<p>Não foi possível carregar os produtos.</p>";
  }
}

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  atualizarCarrinho();
  cart.classList.add("active");
}

function removerItem(index, event) {

  if (event) event.stopPropagation();
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  cartItems.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    cartItems.innerHTML = "<p style='text-align:center; color:#86868b; margin-top:20px;'>Seu carrinho está vazio.</p>";
  }

  carrinho.forEach((item, index) => {
    total += (item.price * 5);
    const div = document.createElement("div");
    div.classList.add("cart_item");
    div.innerHTML = `
      <img src="${item.images[0]}" alt="${item.title}">
      <div style="flex:1; text-align:left;">
        <p style="font-weight:700; font-size:0.9rem; margin-bottom:4px;">${item.title}</p>
        <p style="color:var(--primary); font-weight:600;">${formatarValor(item.price * 5)}</p>
      </div>
      <button class="btn_remover">Remover</button>
    `;

    div.querySelector(".btn_remover").onclick = (e) => removerItem(index, e);
    cartItems.appendChild(div);
  });

  contadorEl.textContent = carrinho.length;
  totalEl.textContent = formatarValor(total);
}

carrinhoBtn.onclick = (e) => {
  e.stopPropagation();
  cart.classList.toggle("active");
};

fecharCarrinho.onclick = () => cart.classList.remove("active");

menuToggle.onclick = (e) => {
  e.stopPropagation();
  mainNav.classList.toggle("mobile-active");
};

document.onclick = (e) => {
  if (!cart.contains(e.target) && !carrinhoBtn.contains(e.target)) {
    cart.classList.remove("active");
  }
  if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
    mainNav.classList.remove("mobile-active");
  }
};

cart.onclick = (e) => e.stopPropagation();

carregarProdutos();
