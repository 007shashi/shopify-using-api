document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
    .then(response => response.json())
    .then(data => {
        const product = data.product;

        // 1 Vendor
        document.getElementById('product-vendor').innerText = product.vendor;

        // 2 Title
        document.getElementById('product-title').innerText = product.title;

        // 3 Price
        document.getElementById('product-price').innerText = product.price;

        // 4 Compare at Price
        document.getElementById('product-compare-at-price').innerText = product.compare_at_price;

        // 5 Discount Percentage
        const discountPercentage = ((parseInt(product.compare_at_price.substring(1)) - parseInt(product.price.substring(1))) / parseInt(product.compare_at_price.substring(1))) * 100;
        document.getElementById('product-discount-percentage').innerText = `${discountPercentage.toFixed(2)}%`;

        // 6 Thumbnail Image
        //since provided API Images are broken i have included own images for thumbnail and product image
        const imageUrls = [
            "https://images.unsplash.com/photo-1632162451754-457b6ebd9720",
            "https://images.unsplash.com/photo-1632162451592-5b25447cb1ac",
            "https://images.unsplash.com/photo-1632162451352-df77c3013f25",
            "https://images.unsplash.com/photo-1632162451609-3f2f0e61311a"
        ];
        const mainProductThumbnail = document.querySelector('.product-thumbnail');
        const imageSelectionContainer = document.getElementById('image-selection');
        imageUrls.forEach(url => {
            const imageElement = document.createElement('img');
            imageElement.src = url;
            imageElement.className = 'image-option';
            imageElement.addEventListener('click', function() {
                document.querySelectorAll('.image-option').forEach(option => {
                    option.classList.remove('active');
                });
                imageElement.classList.add('active');
                mainProductThumbnail.src = imageElement.src;
            });
            imageSelectionContainer.appendChild(imageElement);
        });


        // 7 Color Selector
        const colorOption = product.options.find(option => option.name === 'Color');
        if (colorOption) {
        const colorContainer = document.createElement('div');
        colorContainer.className = 'product-color-selector';
        colorOption.values.forEach(value => {
            const colorName = Object.keys(value)[0];
            const colorCode = value[colorName];
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = colorCode; 
            colorBox.setAttribute('data-color', colorName);
            colorBox.addEventListener('click', function() {
            document.querySelectorAll('.color-box').forEach(box => {
                box.classList.remove('active');
            });
            colorBox.classList.add('active');
            document.getElementById('selected-color').innerText = colorName;
            });
            colorContainer.appendChild(colorBox);
        });
        document.getElementById('product-color-selector').appendChild(colorContainer);
        }
                
        // 8. Size Selector
        const sizeOption = product.options.find(option => option.name === 'Size');
        if (sizeOption) {
            const sizeContainer = document.createElement('div');
            sizeContainer.className = 'product-size-selector';
            sizeOption.values.forEach(value => {
            const sizeButton = document.createElement('label');
            sizeButton.className = 'size-button';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'size'; 
            input.value = value;
            const span = document.createElement('span');
            span.textContent = value;
            input.addEventListener('change', function() {
                document.querySelectorAll('.size-button').forEach(button => {
                    button.classList.remove('active');
                });
                    sizeButton.classList.add('active');
                });
                sizeButton.appendChild(input);
                sizeButton.appendChild(span);
                sizeContainer.appendChild(sizeButton);
            });
            document.getElementById('product-size-selector').appendChild(sizeContainer);
        }

        // 9. Quantity Selector
        let quantity = 1;
        document.getElementById('decrease-quantity').addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                document.getElementById('quantity').textContent = quantity;
            }
            });
            document.getElementById('increase-quantity').addEventListener('click', function() {
                quantity++;
                document.getElementById('quantity').textContent = quantity;
            });

        // 10. Add to Cart Button
        document.getElementById('add-to-cart').addEventListener('click', function() {
            const selectedColorBox = document.querySelector('.product-color-selector .active');
            const selectedColor = selectedColorBox ? selectedColorBox.getAttribute('data-color') : null;
            const selectedSize = document.querySelector('.product-size-selector .active')?.textContent;
        
            if (selectedColor && selectedSize) {
                const productTitle = document.getElementById('product-title').textContent;
                const cartMessage = `${productTitle} with color ${selectedColor} and size ${selectedSize} added to cart`;
                const cartMessageElement = document.getElementById('cart-message');
                cartMessageElement.textContent = cartMessage;
                cartMessageElement.style.display = 'inline';
            } else {
                alert('Please select color and size before adding to cart.');
            }
        });
        
       // 11. Description
        document.getElementById('product-description').innerHTML = product.description;
    })
    .catch(error => console.error('Error fetching product data:', error));
});
