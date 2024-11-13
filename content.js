// Function to gather product data from the page
function getCartProducts() {
  // Example selectors; you’ll need to customize these based on the website's structure
  const products = [];
  const productElements = document.querySelectorAll(".cart-item"); // Adjust selector

  productElements.forEach(productElement => {
    const name = productElement.querySelector(".product-name").innerText; // Adjust selector
    const price = parseFloat(productElement.querySelector(".product-price").innerText.replace("$", "")); // Adjust selector
    const quantity = parseInt(productElement.querySelector(".product-quantity").innerText); // Adjust selector

    products.push({ name, price, quantity });
  });

  return products;
}

// Send the product data to the background script
const products = getCartProducts();
chrome.runtime.sendMessage({ action: "processCartData", products: products });
