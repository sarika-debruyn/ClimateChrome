// Function to gather product data from the page
function getCartProducts() {
    const products = [];
    const productElements = document.querySelectorAll(".cart-item"); // Adjust selector based on the website

    productElements.forEach(productElement => {
        try {
            const name = productElement.querySelector(".product-name")?.innerText.trim() || "Unknown Product";
            const price = parseFloat(productElement.querySelector(".product-price")?.innerText.replace("$", "") || 0);
            const quantity = parseInt(productElement.querySelector(".product-quantity")?.innerText || 1);

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
    chrome.runtime.sendMessage({ action: "processCartData", products: products });
}
