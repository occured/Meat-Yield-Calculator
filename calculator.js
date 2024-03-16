// steakCalculator.js

function changeSteakSizes() {
    var meatType = document.getElementById("meatType").value;
    var steakSizesContainer = document.getElementById("steakSizes");

    // Clear previous input fields
    steakSizesContainer.innerHTML = "";

    // Add input fields based on selected meat type
    switch (meatType) {
        case "sirloin":
            addSteakSizeInput(4, steakSizesContainer, "Tips");
            addSteakSizeInput(6, steakSizesContainer, "CFS");
            addSteakSizeInput(6, steakSizesContainer, "Sirloin");
            addSteakSizeInput(8, steakSizesContainer, "Sirloin");
            addSteakSizeInput(11, steakSizesContainer, "Sirloin");
            addSteakSizeInput(16, steakSizesContainer, "Sirloin");
            break;
        case "filet":
            addSteakSizeInput(3, steakSizesContainer, "Medallions");
            addSteakSizeInput(4, steakSizesContainer, "Dillo");
            addSteakSizeInput(6, steakSizesContainer, "Filet");
            addSteakSizeInput(8, steakSizesContainer, "Filet");
            break;
        case "ribeye":
            addSteakSizeInput(12, steakSizesContainer, "Ribeye");
            addSteakSizeInput(14, steakSizesContainer, "Ribeye");
            addSteakSizeInput(16, steakSizesContainer, "Ribeye");
            break;
        case "strip":
            addSteakSizeInput(8, steakSizesContainer, "Strip");
            addSteakSizeInput(12, steakSizesContainer, "Strip");
            break;
        case "Bone-In":
            addSteakSizeInput(12, steakSizesContainer, "BL Ribeye");
            addSteakSizeInput(14, steakSizesContainer, "BL Ribeye");
            addSteakSizeInput(16, steakSizesContainer, "BL Ribeye");
            addSteakSizeInput(20, steakSizesContainer, "BI Ribeye");
            break;
    }
}

function addSteakSizeInput(size, container, name) {
    var div = document.createElement("div");
    div.className = "steak-size";
    div.innerHTML = `
        <label class="steak" for="steakSize${size}">${size} Oz ${name}:</label>
        <input class="steakInput" type="number" id="steakSize${size}" min="0">
    `;
    container.appendChild(div);
}

function calculateYield() {
    var steakSizes = document.getElementsByClassName("steak-size");
    var caseWeight = parseFloat(document.getElementById("caseWeight").value) || 0;
    var totalSteakWeight = 0;

    // Calculate total steak weight
    for (var i = 0; i < steakSizes.length; i++) {
        var steakQtyInput = steakSizes[i].getElementsByTagName("input")[0];
        totalSteakWeight += (parseFloat(steakQtyInput.value) || 0) * parseFloat(steakQtyInput.id.replace("steakSize", ""));
    }

    var yieldPercentage = (totalSteakWeight / (caseWeight * 16)) * 100; // Convert pounds to ounces

    if (isNaN(caseWeight) || caseWeight <= 0 || totalSteakWeight === 0) {
        document.getElementById("result").textContent = "Please enter valid numbers in at least one quantity field and case weight.";
    } else {
        document.getElementById("result").textContent = "Yield Percentage: " + yieldPercentage.toFixed(2) + "%";
    }
}

function calculateCuts() {
    var beefWeight = parseFloat(document.getElementById("beefWeight").value);
    var cutsResult = document.getElementById("cutsResult");

    if (isNaN(beefWeight) || beefWeight <= 0) {
        cutsResult.textContent = "Please enter a valid beef weight.";
        return;
    }

    var cuts = {
        "6s": Math.floor(beefWeight / 6),
        "8s": Math.floor(beefWeight / 8),
        "11s": Math.floor(beefWeight / 11),
        "12s": Math.floor(beefWeight / 12),
        "16s": Math.floor(beefWeight / 16)
    };

    var resultText = "<h2>Cut Recommendations:</h2><ul class=\"text\">";
    for (var cut in cuts) {
        if (cuts.hasOwnProperty(cut)) {
            resultText += "<li>" + cut + ": " + cuts[cut] + " Steaks</li>";
        }
    }
    resultText += "</ul>";
    cutsResult.innerHTML = resultText;
}

function subtractWeight(amount) {
    var beefWeightInput = document.getElementById("beefWeight");
    var currentWeight = parseFloat(beefWeightInput.value);
    if (!isNaN(currentWeight)) {
        var newWeight = Math.max(currentWeight - amount, 0);
        beefWeightInput.value = newWeight;
        calculateCuts(); // Update cut recommendations after subtracting weight
    }
}
