const CRYSTAL_SIZE = 150;
const SIDES = 6;

// layout
const MARGIN = CRYSTAL_SIZE / 2;
const COLUMNS = 3;
const ROWS = 4;
const PADDING = CRYSTAL_SIZE * 0.2;
const GRIDBOX = CRYSTAL_SIZE + PADDING;
const START = CRYSTAL_SIZE / 2 + MARGIN;

let PALETTE = [];
ALL_CRYSTALS = [];

function setup() {
  const totalX = START + GRIDBOX * COLUMNS;
  const totalY = START + GRIDBOX * ROWS;
  createCanvas(totalX, totalY, SVG);

  PALETTE = [
    color(247, 37, 133), // pink
    color(58, 12, 163), // purple
    color(76, 201, 240), // blue
  ];

  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const posX = START + x * GRIDBOX;
      const posY = START + y * GRIDBOX;
      const crystal = makeCrystal({ x: posX, y: posY });
      console.log(crystal);
      ALL_CRYSTALS.push(crystal);
    }
  }

  ALL_CRYSTALS.forEach((crystal) => {
    drawCrystal(crystal);
  });
}
