// Fetch data from the JSON file
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    // If on the index page, display categories
    if (document.location.pathname === '/index.html') {
        displayCategories(products);
    }

    // If on the collection page, display products of a category
    if (document.location.pathname === '/collection.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        displayProducts(products, category);
    }

    // If on the product detail page, display a single product
    if (document.location.pathname === '/product.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        displayProductDetail(products, productId);
    }
  })
  .catch(error => console.error('Error loading products data:', error));

// Function to display categories
function displayCategories(products) {
    const categories = [...new Set(products.map(product => product.category))];
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `
            <h2>${category}</h2>
            <a href="collection.html?category=${encodeURIComponent(category)}">
                <img src="https://via.placeholder.com/150" alt="${category}">
            </a>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });
}

// Function to display products of a category
function displayProducts(products, category) {
    const productContainer = document.getElementById('product-container');
    const categoryProducts = products.filter(product => product.category === category);
    categoryProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.price}</p>
            <a href="product.html?id=${product.id}">View Details</a>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Function to display a single product
function displayProductDetail(products, productId) {
    const product = products.find(p => p.id == productId);
    const productDetailContainer = document.getElementById('product-detail');
    if (product) {
        productDetailContainer.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Price: ${product.price}</p>
        `;
    }
}
