function getCartProducts() {
    const products = [];

    // Select all cart items
    const productElements = document.querySelectorAll(".sc-list-item"); // Adjust selector if needed

    console.log("🔍 Cart Items Found:", productElements.length);

    productElements.forEach(productElement => {
        try {
            const name = productElement.querySelector(".sc-product-link")?.innerText.trim() || "Unknown Product";
            const price = parseFloat(productElement.querySelector(".sc-product-price")?.innerText.replace("$", "") || 0);
            const quantity = parseInt(productElement.querySelector(".sc-update-quantity-input")?.value || 1);

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
