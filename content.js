function getCartProducts() {
    const products = [];

    // Select all cart items
    const productElements = document.querySelectorAll(".sc-list-item"); // Adjust if needed

    console.log("🔍 Cart Items Found:", productElements.length);

    productElements.forEach(productElement => {
        try {
            // Extract product name, ignoring aria-hidden elements
            const nameElement = productElement.querySelector("a.sc-product-link:not([aria-hidden='true'])");
            const name = nameElement ? nameElement.textContent.trim() : "Unknown Product";

            // Extract price (check different possible classes)
            const priceElement = productElement.querySelector(".sc-product-price, .a-price-whole");
            const price = priceElement ? parseFloat(priceElement.textContent.replace("$", "").replace(",", "")) : 0;

            // Extract quantity (if it's inside a dropdown or input field)
            const quantityElement = productElement.querySelector("input.sc-update-quantity-input");
            const quantity = quantityElement ? parseInt(quantityElement.value) : 1;

            console.log("📦 Extracted Product:", { name, price, quantity });

            if (name && quantity) {
                products.push({ name, price, quantity });
            }
        } catch (error) {
            console.error("❌ Error processing cart item:", error);
        }
    });

    return products;
}

// Send the extracted product data to the background script
const products = getCartProducts();
if (products.length > 0) {
    console.log("🚀 Sending Products to Background.js:", products);
    chrome.runtime.sendMessage({ action: "processCartData", products: products });
} else {
    console.error("❌ No products found in the cart. Check your selectors!");
}
