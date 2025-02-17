const translations = {
    pt: {
        all: "Todos os Produtos",
        clothes: "Roupas",
        accessories: "Acessórios",
        digital: "Digital",
        productName: "Camiseta Premium",
        addToCart: "ADICIONAR AO CARRINHO",
        color: "Cor:",
        size: "Tamanho:",
        terms: "Termos de uso",
        refund: "Política de reembolso",
        contact: "Contato"
    },
    en: {
        all: "All Products",
        clothes: "Clothes",
        accessories: "Accessories",
        digital: "Digital",
        productName: "Premium T-Shirt",
        addToCart: "ADD TO CART",
        color: "Color:",
        size: "Size:",
        terms: "Terms of Use",
        refund: "Refund Policy",
        contact: "Contact"
    }
};

const exchangeRates = {
    EUR: 1,
    USD: 1.12,
    GBP: 0.86,
    BRL: 5.95
};

const currencySymbols = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    BRL: "R$"
};

document.addEventListener('DOMContentLoaded', function() {
    // Image Slider
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const images = card.querySelectorAll('.product-images img');
        const prevBtn = card.querySelector('.prev');
        const nextBtn = card.querySelector('.next');
        let currentImageIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                showImage(currentImageIndex);
            });

            nextBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                showImage(currentImageIndex);
            });
        }

        // Auto-rotate images
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        }, 3000);
    });

    // Language Switcher
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        const language = this.value;
        updateLanguage(language);
    });

    function updateLanguage(language) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
    }

    // Currency Converter
    const currencySelect = document.getElementById('currencySelect');
    currencySelect.addEventListener('change', function() {
        const currency = this.value;
        updatePrices(currency);
    });

    function updatePrices(currency) {
        document.querySelectorAll('.price').forEach(priceElement => {
            const basePrice = parseFloat(priceElement.getAttribute('data-price-eur'));
            const convertedPrice = basePrice * exchangeRates[currency];
            priceElement.textContent = `${currencySymbols[currency]}${convertedPrice.toFixed(2)}`;
        });
    }

    // Color Selector
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const parentCard = this.closest('.product-card');
            parentCard.querySelectorAll('.color-option').forEach(opt => {
                opt.style.border = '2px solid #444';
            });
            this.style.border = '2px solid #DAA520';
        });
    });

    // Add to Cart Button
    const addToCartBtns = document.querySelectorAll('.cartBtn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const selectedColor = productCard.querySelector('.color-option[style*="DAA520"]');
            const selectedSize = productCard.querySelector('.size-selector select').value;
            
            if (!selectedColor) {
                alert('Por favor, selecione uma cor.');
                return;
            }
            
            alert('Produto adicionado ao carrinho!');
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});