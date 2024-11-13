document.addEventListener('DOMContentLoaded', function() {
  // Fetch CO2 emissions and alternatives from background script
  chrome.runtime.sendMessage({ action: "getCarbonData" }, function(response) {
    if (response) {
      displayCO2Data(response.totalCO2);
      displayAlternatives(response.alternatives);
    }
  });
});

function displayCO2Data(totalCO2) {
  document.getElementById("totalCO2").innerText = `${totalCO2} kg`;
}

function displayAlternatives(alternatives) {
  const list = document.getElementById("alternative-list");
  list.innerHTML = ""; // Clear existing items
  alternatives.forEach(alt => {
    let item = document.createElement("li");
    item.textContent = `${alt.name} - CO2: ${alt.co2} kg`;
    list.appendChild(item);
  });
}
