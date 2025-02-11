function getCartProducts() {
    const products = [];
    const productElements = document.querySelectorAll(".cart-item"); // Update selector if needed

    console.log("Cart Items Found:", productElements.length); // Debugging line

    productElements.forEach(productElement => {
        try {
            const name = productElement.querySelector(".product-name")?.innerText.trim() || "Unknown Product";
            const price = parseFloat(productElement.querySelector(".product-price")?.innerText.replace("$", "") || 0);
            const quantity = parseInt(productElement.querySelector(".product-quantity")?.innerText || 1);

            console.log("Extracted Product:", { name, price, quantity }); // Debugging line

            if (name && quantity) {
                products.push({ name, price, quantity });
            }
        } catch (error) {
            console.error("Error processing cart item:", error);
        }
    });

    return products;
}

// Send the product data to the background script
const products = getCartProducts();

if (products.length > 0) {
    console.log("Sending Products to Background.js:", products); // Debugging line
    chrome.runtime.sendMessage({ action: "processCartData", products: products });
} else {
    console.error("No products found in the cart. Check your selectors!");
}
