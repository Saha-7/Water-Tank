/**
 * Computes how many units of water are trapped between blocks.
 *
 * Strategy: For each column, water level = min(tallest block to the left, tallest block to the right).
 * Water stored at column i = waterLevel[i] - blockHeight[i]  (floored at 0)
 *
 * @param {number[]} heights - Array of block heights (each >= 0)
 * @returns {{ totalWater: number, waterPerColumn: number[] }}
 */
function computeWater(heights) {
  const n = heights.length;

  if (n < 3) return { totalWater: 0, waterPerColumn: new Array(n).fill(0) };

  // Build max-height seen from the left at each index
  const maxLeft = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    maxLeft[i] = Math.max(maxLeft[i - 1], heights[i - 1]);
  }

  // Build max-height seen from the right at each index
  const maxRight = new Array(n).fill(0);
  for (let i = n - 2; i >= 0; i--) {
    maxRight[i] = Math.max(maxRight[i + 1], heights[i + 1]);
  }

  // Water at each column = min(left wall, right wall) - block height
  const waterPerColumn = heights.map((height, i) => {
    const waterLevel = Math.min(maxLeft[i], maxRight[i]);
    return Math.max(0, waterLevel - height);
  });

  const totalWater = waterPerColumn.reduce((sum, w) => sum + w, 0);

  return { totalWater, waterPerColumn };
}

/**
 * Parses a comma/space-separated string into an array of non-negative integers.
 * Returns null if the input is invalid.
 *
 * @param {string} input
 * @returns {number[] | null}
 */
function parseHeights(input) {
  const cleaned = input.replace(/[\[\]]/g, "").trim();

  if (!cleaned) return null;

  const parts = cleaned.split(/[\s,]+/);
  const heights = parts.map(Number);

  const isValid = heights.every((n) => Number.isInteger(n) && n >= 0);

  return isValid ? heights : null;
}