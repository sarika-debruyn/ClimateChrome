let carbonData = {
  totalCO2: 0,
  alternatives: []
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "processCartData") {
    // Process the cart data and calculate CO2 emissions
    carbonData = calculateCO2Emissions(request.products);
    findSustainableAlternatives(request.products);
  } else if (request.action === "getCarbonData") {
    // Return carbon data to popup
    sendResponse(carbonData);
  }
});

function calculateCO2Emissions(products) {
  let totalCO2 = 0;
  products.forEach(product => {
    // Assume a basic emissions factor; replace with real data
    const emissionFactor = 2.5; // Example value
    totalCO2 += emissionFactor * product.quantity;
  });
  return {
    totalCO2,
    alternatives: [] // Placeholder, will populate in findSustainableAlternatives
  };
}

function findSustainableAlternatives(products) {
  // Mock function for alternatives; replace with actual scraping/API calls
  const alternatives = products.map(product => ({
    name: `Eco-friendly ${product.name}`,
    co2: (Math.random() * 2).toFixed(2) // Example lower CO2
  }));

  // Store the alternatives in carbonData
  carbonData.alternatives = alternatives;
}
