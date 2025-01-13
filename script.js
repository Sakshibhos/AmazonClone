const imgs = document.querySelectorAll('.header-slider ul img ');
const prev_btn = document.querySelector('.control-prev');
const next_btn = document.querySelector('.control-next');

let n = 0;

function changeSlide() {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = 'none';
    }
    imgs[n].style.display = 'block';
}

changeSlide();

prev_btn.addEventListener('click', (e)=>{
    if (n < 0) {
        n--;
    }else{
        n = imgs.length - 1;
    }
    changeSlide();
})

next_btn.addEventListener('click', (e)=>{
    if (n < imgs.length - 1) {
        n++;
    }else{
        n = 0;
    }
    changeSlide();
})

const scrollContainer = document.querySelectorAll(".products");

for (const item of scrollContainer) {
    item.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            item.scrollLeft += 100;
        } else {
            item.scrollLeft -= 100;
        }
    });
}

// Dynamic Product Search
const searchInput = document.querySelector('.nav-search-input');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    productCards.forEach(card => {
        const productName = card.querySelector('h4').textContent.toLowerCase();
        card.style.display = productName.includes(query) ? 'block' : 'none';
    });
});

// Add to Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const addToCartButtons = document.querySelectorAll('.product-card');

addToCartButtons.forEach((card, index) => {
    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Cart';
    addButton.className = 'add-to-cart';
    card.appendChild(addButton);

    addButton.addEventListener('click', () => {
        const product = {
            name: card.querySelector('h4').textContent,
            price: card.querySelector('.product-price span').textContent
        };
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    });
});

// Display Cart
const cartLink = document.querySelector('.nav-cart');
cartLink.addEventListener('click', () => {
    const cartContent = cart.map(item => `${item.name} - Rs. ${item.price}`).join('\n');
    alert(cartContent || 'Your cart is empty!');
});

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = 'Toggle Dark Mode';
darkModeToggle.className = 'dark-mode-toggle';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Image Zoom on Hover
const productImages = document.querySelectorAll('.product-img-container img');

productImages.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.2)';
        img.style.transition = 'transform 0.2s';
    });
    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
    });
});
