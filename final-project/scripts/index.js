// Handle responsive hamburger menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dynamically populate the product grid with data from data/menu.json
const productGrid = document.getElementById('product-grid');

fetch('data/menu.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(products => {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.imageURL}" alt="${product.itemName}" width=125 height=75 loading="lazy">
                <h3>${product.itemName}</h3>
                <p>Type: ${product.type}</p>
                <p>Calories: ${product.servingCalories} kcal</p>
                <p>Nutrition: Sugar: ${product.sugar}g | Protein: ${product.protein}g | Fiber: ${product.fiber}g</p>
            `;

            productGrid.appendChild(productCard);
        });
    })
    .catch(error => {
        console.error('Error loading menu data:', error);
        productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    });