// Obtendo os elementos do DOM
const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
let products = [];

// Função para renderizar os produtos na página
function renderProducts() {
  productList.innerHTML = ''; // Limpa o conteúdo anterior

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p>Preço: R$ ${product.price.toFixed(2)}</p>
      <div class="product-buttons">
        <button class="edit-btn" data-id="${product.id}">Editar</button>
        <button class="delete-btn" data-id="${product.id}">Excluir</button>
      </div>
    `;
    
    document.getElementById("product-list").appendChild(productCard);
  });
}

// Função para adicionar um novo produto
function addProduct(product) {
  product.id = Date.now(); // Gerando um ID único com base no timestamp
  products.push(product);
  renderProducts();
}

// Função para excluir um produto
function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  renderProducts();
}

// Função para alterar um produto
function editProduct(id) {
  const product = products.find((product) => product.id === id);
  if (product) {
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('image').value = product.image;
    
    // Alterar o botão de submit para editar
    productForm.querySelector('button[type="submit"]').textContent = 'Atualizar Produto';
    
    // Atualizar a ação do formulário para editar
    productForm.onsubmit = (e) => {
      e.preventDefault();
      product.name = document.getElementById('name').value;
      product.price = parseFloat(document.getElementById('price').value);
      product.image = document.getElementById('image').value;
      
      productForm.querySelector('button[type="submit"]').textContent = 'Adicionar Produto';
      renderProducts();
      
      // Limpar os campos do formulário
      productForm.reset();
      productForm.onsubmit = (e) => {
        e.preventDefault();
        addProduct({
          name: document.getElementById('name').value,
          price: parseFloat(document.getElementById('price').value),
          image: document.getElementById('image').value,
        });
        productForm.reset();
      };
    };
  }
}

// Evento de envio do formulário
productForm.onsubmit = (e) => {
  e.preventDefault();
  const newProduct = {
    name: document.getElementById('name').value,
    price: parseFloat(document.getElementById('price').value),
    image: document.getElementById('image').value,
  };
  addProduct(newProduct);
  productForm.reset();
};

// Evento de clique nos botões de editar e excluir
productList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    deleteProduct(productId);
  }

  if (e.target.classList.contains('edit-btn')) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    editProduct(productId);
  }
});

// Inicializar com alguns produtos de exemplo
products = [
  {
    id: 1,
    name: "Caneca Mapa Terra Média",
    price: 49.99,
    image: "https://m.media-amazon.com/images/I/61fv7pU+lmL._AC_UL320_.jpg",
  },
  {
    id: 2,
    name: "Funko Pop! Frodo Baggins",
    price: 329.99,
    image: "https://cdn.awsli.com.br/800x800/84/84034/produto/224854005/c-1--800-lhygo5f57j.jpg",
  },
];

// Renderizar os produtos iniciais
renderProducts();
