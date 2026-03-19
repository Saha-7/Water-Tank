// DOM references
const input = document.getElementById("heights-input");
const computeBtn = document.getElementById("compute-btn");
const errorMessage = document.getElementById("error-message");
const resultSection = document.getElementById("result-section");
const waterCount = document.getElementById("water-count");
const svgContainer = document.getElementById("svg-container");

// Run the example from the assignment on page load
const DEFAULT_INPUT = "0, 4, 0, 0, 0, 6, 0, 6, 4, 0";

function showError(message) {
  errorMessage.textContent = message;
  input.classList.add("error");
  resultSection.classList.remove("visible");
}

function clearError() {
  errorMessage.textContent = "";
  input.classList.remove("error");
}

function handleCompute() {
  clearError();

  const heights = parseHeights(input.value);

  if (!heights) {
    showError("Enter a list of non-negative integers, e.g. 0, 4, 0, 6, 4, 0");
    return;
  }

  const { totalWater, waterPerColumn } = computeWater(heights);

  waterCount.textContent = totalWater;
  renderSVG(svgContainer, heights, waterPerColumn);
  resultSection.classList.add("visible");
}

// Trigger on button click or Enter key
computeBtn.addEventListener("click", handleCompute);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleCompute();
});

// Load default example immediately
input.value = DEFAULT_INPUT;
handleCompute();