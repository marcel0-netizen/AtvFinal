class Produto {
  constructor(nome, categoria, descricao) {
    this.nome = nome;
    this.categoria = categoria;
    this.descricao = descricao;
    this.id = Date.now();
  }
}
let produtos = [];
const form = document.getElementById('productForm');
const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');
function renderProdutos(lista) {
  productList.innerHTML = '';
  if (lista.length === 0) {
    productList.innerHTML = '<li>Nenhum produto encontrado.</li>';
    return;
  }
  lista.forEach(prod => {
    const li = document.createElement('li');
    li.className = 'product-item';
    li.innerHTML = `
      <h3>${prod.nome}</h3>
      <p><strong>Categoria:</strong> ${prod.categoria}</p>
      <p>${prod.descricao}</p>
      <button class="remove-btn" onclick="removerProduto(${prod.id})">Remover</button>
    `;
    productList.appendChild(li);
  });
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('name').value.trim();
  const categoria = document.getElementById('category').value.trim();
  const descricao = document.getElementById('description').value.trim();
  if (!nome || !categoria || !descricao) return;
  const novoProduto = new Produto(nome, categoria, descricao);
  produtos.push(novoProduto);
  form.reset();
  renderProdutos(produtos);
});
function removerProduto(id) {
  produtos = produtos.filter(prod => prod.id !== id);
  renderProdutos(produtos);
}
searchInput.addEventListener('input', function () {
  const termo = searchInput.value.toLowerCase();
  const resultados = produtos.filter(prod =>
    prod.nome.toLowerCase().includes(termo) ||
    prod.categoria.toLowerCase().includes(termo)
  );
  renderProdutos(resultados);
});
renderProdutos(produtos);
