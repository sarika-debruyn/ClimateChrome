let carbonData = {
    totalCO2: 0,
    alternatives: []
};

// Store API Key once when the extension is installed (Replace with your actual API Key)
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ apiKey: "1P80VY458563NC3GBDYC5FR43W" }, () => {
        console.log("API Key has been stored securely.");
    });
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.action === "processCartData") {
        carbonData = await calculateCO2Emissions(request.products);
        sendResponse(carbonData);
    } else if (request.action === "getCarbonData") {
        sendResponse(carbonData);
    }
    return true; // Keeps the message channel open for async responses
});

// Retrieve stored API key
async function getStoredAPIKey() {
    return new Promise((resolve) => {
        chrome.storage.local.get("apiKey", (data) => {
            if (data.apiKey) {
                resolve(data.apiKey);
            } else {
                console.error("API Key not found!");
                resolve(null);
            }
        });
    });
}

// Fetch CO₂ emissions from Climatiq API
async function getCO2Emissions(productName) {
    const apiKey = await getStoredAPIKey();

    if (!apiKey) {
        console.error("API Key is missing!");
        return { error: "No API key available" };
    }

    const endpoint = "https://beta3.api.climatiq.io/estimate";
    const requestBody = {
        activity_id: "manufacturing", // Update based on Climatiq's dataset
        parameters: {
            product_name: productName
        }
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        return data.co2_kg || 2.5; // Default value if API response is missing
    } catch (error) {
        console.error("Error fetching CO₂ emissions:", error);
        return 2.5; // Use a fallback emission factor
    }
}

// Calculate total CO₂ emissions for products in cart
async function calculateCO2Emissions(products) {
    let totalCO2 = 0;
    let co2Data = [];

    for (const product of products) {
        const emissionFactor = await getCO2Emissions(product.name);
        const productCO2 = emissionFactor * product.quantity;

        totalCO2 += productCO2;
        co2Data.push({ name: product.name, co2: productCO2.toFixed(2) });
    }

    return { totalCO2, alternatives: co2Data };
}
