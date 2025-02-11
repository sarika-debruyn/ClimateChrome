document.addEventListener('DOMContentLoaded', function() {
    // Fetch CO2 emissions and alternatives from background script
    chrome.runtime.sendMessage({ action: "getCarbonData" }, function(response) {
        if (response) {
            displayCO2Data(response.totalCO2);
            displayAlternatives(response.alternatives);
        } else {
            document.getElementById("totalCO2").innerText = "Error fetching data";
        }
    });

    // API Key Input Handling
    document.getElementById("saveApiKey").addEventListener("click", function() {
        const apiKey = document.getElementById("apiKeyInput").value;
        if (apiKey) {
            chrome.storage.local.set({ apiKey: apiKey }, () => {
                alert("API Key saved successfully!");
            });
        } else {
            alert("Please enter a valid API key.");
        }
    });
});

function displayCO2Data(totalCO2) {
    document.getElementById("totalCO2").innerText = totalCO2 ? `${totalCO2} kg` : "N/A";
}

function displayAlternatives(alternatives) {
    const list = document.getElementById("alternative-list");
    list.innerHTML = ""; // Clear previous entries

    if (alternatives.length === 0) {
        list.innerHTML = "<li>No alternatives available</li>";
        return;
    }

    alternatives.forEach(alt => {
        let item = document.createElement("li");
        item.textContent = `${alt.name} - CO2: ${alt.co2} kg`;
        list.appendChild(item);
    });
}
