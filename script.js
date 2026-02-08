// Hardcoded login (change to secure method in production)
const adminUsername = 'sardar';
const adminPassword = '123'; 

let products = JSON.parse(localStorage.getItem('products')) || [
    { name: 'Luxury Rose', price: 'Rs. 15,000', image: 'https://via.placeholder.com/150/ffd700/000000?text=Rose+Perfume' },
    { name: 'Midnight Musk', price: 'Rs. 13,500', image: 'https://via.placeholder.com/150/000000/ffd700?text=Musk+Perfume' }
];

let isLoggedIn = false; 

// Load images from localStorage or set defaults (kept for admin, but not displayed)
let homeImage = localStorage.getItem('homeImage') || 'https://via.placeholder.com/800x400/00BFFF/FFFFFF?text=Beautiful+Waterfall';
let productsImage = localStorage.getItem('productsImage') || 'https://via.placeholder.com/800x300/228B22/FFFFFF?text=Lush+Forest';

function displayProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    products.forEach(product => {
        list.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmFmYWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            </div>
        `;
    });
}

function displayAdminProducts() {
    const list = document.getElementById('admin-product-list');
    list.innerHTML = '';
    products.forEach((product, index) => {
        list.innerHTML += `
            <div class="admin-product">
                <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmFmYWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';">
                <h4>${product.name}</h4>
                <p>${product.price}</p>
                <button onclick="removeProduct(${index})">Remove</button>
            </div>
        `;
    });
}

function showSection(section) {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('products').classList.add('hidden');
    document.getElementById('admin').classList.add('hidden');

    if (section === 'admin' && !isLoggedIn) {
        alert('Please log in first to access the Admin panel.');
        document.getElementById('home').classList.remove('hidden');
    } else {
        document.getElementById(section).classList.remove('hidden');
    }
    window.scrollTo(0, 0);
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (username === adminUsername && password === adminPassword) {
        isLoggedIn = true;
        showSection('admin');
        displayAdminProducts();

        // Close login panel after login
        const panel = document.getElementById('adminLogin');
        panel.classList.remove('open');
    } else {
        alert('Invalid credentials');
        console.log('Entered Username:', username);
        console.log('Entered Password:', password);
    }
}

function logout() {
    isLoggedIn = false;
    showSection('home');
}

function addProduct() {
    const name = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value.trim();
    const image = document.getElementById('product-image').value.trim();
    if (name && price && image) {
        products.push({ name, price, image });
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        displayAdminProducts();
        alert('Product added!');
    } else {
        alert('Fill all fields');
    }
}

function removeProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    displayAdminProducts();
    alert('Product removed!');
}

function updateHomeImage() {
    const newUrl = document.getElementById('home-image-url').value.trim();
    if (newUrl) {
        homeImage = newUrl;
        localStorage.setItem('homeImage', homeImage);
        alert('Home image updated and saved!');
    } else {
        alert('Enter a valid URL');
    }
}

function removeHomeImage() {
    homeImage = 'https://via.placeholder.com/800x400/00BFFF/FFFFFF?text=Beautiful+Waterfall';
    localStorage.setItem('homeImage', homeImage);
    alert('Home image removed (reset to default)!');
}

function updateProductsImage() {
    const newUrl = document.getElementById('products-image-url').value.trim();
    if (newUrl) {
        productsImage = newUrl;
        localStorage.setItem('productsImage', productsImage);
        alert('Products image updated and saved!');
    } else {
        alert('Enter a valid URL');
    }
}

function removeProductsImage() {
    productsImage = 'https://via.placeholder.com/800x300/228B22/FFFFFF?text=Lush+Forest';
    localStorage.setItem('productsImage', productsImage);
    alert('Products image removed (reset to default)!');
}

document.getElementById('username').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        login();
    }
});
document.getElementById('password').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        login();
    }
});

// Toggle login panel open/close
function toggleLogin() {
    const panel = document.getElementById('adminLogin');
    panel.classList.toggle('open');
}

// Initialize
showSection('home');
displayProducts();
