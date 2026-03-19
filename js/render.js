const CELL_WIDTH = 48;
const CELL_HEIGHT = 36;
const SVG_PADDING = 20;

const COLOR_BLOCK = "#F59E0B"; // amber — the solid blocks
const COLOR_WATER = "#38BDF8"; // sky blue — trapped water
const COLOR_EMPTY = "transparent";
const COLOR_GRID_LINE = "rgba(255,255,255,0.08)";

/**
 * Renders the water tank visualization as an SVG inside the given container.
 *
 * @param {HTMLElement} container
 * @param {number[]} heights
 * @param {number[]} waterPerColumn
 */
function renderSVG(container, heights, waterPerColumn) {
  const maxHeight = Math.max(...heights.map((h, i) => h + waterPerColumn[i]));
  const totalRows = maxHeight || 1;
  const totalCols = heights.length;

  const svgWidth = totalCols * CELL_WIDTH + SVG_PADDING * 2;
  const svgHeight = totalRows * CELL_HEIGHT + SVG_PADDING * 2;

  const svg = createSVGElement("svg", {
    width: svgWidth,
    height: svgHeight,
    viewBox: `0 0 ${svgWidth} ${svgHeight}`,
  });

  for (let col = 0; col < totalCols; col++) {
    const blockRows = heights[col];
    const waterRows = waterPerColumn[col];
    const emptyRows = totalRows - blockRows - waterRows;
    const x = SVG_PADDING + col * CELL_WIDTH;

    drawCellStack(svg, x, emptyRows, waterRows, blockRows);
  }

  drawGridLines(svg, totalRows, totalCols, svgWidth, svgHeight);

  container.innerHTML = "";
  container.appendChild(svg);
}

/**
 * Draws stacked cells (empty → water → block) for one column.
 * Row offsets are explicit so each zone's start position is immediately clear.
 */
function drawCellStack(svg, x, emptyRows, waterRows, blockRows) {
  drawCells(svg, x, 0,                       emptyRows, COLOR_EMPTY);
  drawCells(svg, x, emptyRows,               waterRows, COLOR_WATER);
  drawCells(svg, x, emptyRows + waterRows,   blockRows, COLOR_BLOCK);
}

/**
 * Draws `count` filled cells at column x starting from `startRow`.
 */
function drawCells(svg, x, startRow, count, color) {
  for (let row = startRow; row < startRow + count; row++) {
    const y = SVG_PADDING + row * CELL_HEIGHT;
    svg.appendChild(createSVGElement("rect", {
      x, y,
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
      fill: color,
    }));
  }
}

/**
 * Draws the grid lines over the entire SVG for the table-style look.
 */
function drawGridLines(svg, totalRows, totalCols, svgWidth, svgHeight) {
  for (let row = 0; row <= totalRows; row++) {
    const y = SVG_PADDING + row * CELL_HEIGHT;
    drawLine(svg, SVG_PADDING, y, svgWidth - SVG_PADDING, y);
  }

  for (let col = 0; col <= totalCols; col++) {
    const x = SVG_PADDING + col * CELL_WIDTH;
    drawLine(svg, x, SVG_PADDING, x, svgHeight - SVG_PADDING);
  }
}

/**
 * Appends a single styled grid line to the SVG.
 */
function drawLine(svg, x1, y1, x2, y2) {
  svg.appendChild(createSVGElement("line", {
    x1, y1, x2, y2,
    stroke: COLOR_GRID_LINE,
    "stroke-width": 1,
  }));
}

/**
 * Creates an SVG element with the given attributes.
 */
function createSVGElement(tag, attributes) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}