const getRandomColorFromPalette = () => PALETTE[floor(random(PALETTE.length))];

const makeShape =
  (sides = 6) =>
  (x, y, radius) => {
    const rotateAngle = 360 / sides;

    beginShape();

    for (let i = 0; i < sides; i++) {
      const thisVertex = posInCircle(x, y, radius, i * rotateAngle);
      vertex(thisVertex.x, thisVertex.y);
    }

    endShape(CLOSE);
  };

const posInCircle = (x, y, radius, angle) => {
  const vx = x + radius * cos(angle);
  const vy = y + radius * sin(angle);

  return createVector(vx, vy);
};

const randomSelectTwo = () => {
  const rando = random(1);
  return rando > 0.5 ? true : false;
};

const getRandomFromPalette = () => {
  const rando = floor(random(0, PALETTE.length));
  return PALETTE[rando];
};

const hexagon = makeShape(6);
const triangle = makeShape(3);

const testLines = (state) => {
  state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2;
  state.angle = 360 / state.numShapes;

  return {
    name: "testLines",
    state,
    render: () => {
      stroke(state.layerColor);
      noFill();
      strokeWeight(state.thickStroke);
      push();
      if (state.lines) {
        for (let i = 0; i < 360 - 0.1; i += state.angle) {
          line(0, 0, 0, CRYSTAL_SIZE / 2);
          rotate(state.angle);
        }
      }
      if (state.circle) {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
      }
      pop();
    },
  };
};

const layerConstructors = [
  {
    name: "Outline Shape",
    init: (props) =>
      outlineShape({
        ...props,
        ...setState(state),
      }),
    weight: 0.3,
  },
  {
    name: "Centered Shape",
    init: (props) =>
      centeredShape({
        ...props,
        ...setState(state),
      }),
    weight: 0.3,
  },
  {
    name: "Circles",
    init: (props) =>
      circles({
        ...props,
        ...setState(state),
      }),
    weight: 0.3,
  },
  {
    name: "Simple Lines",
    init: (props) =>
      simpleLines({
        ...props,
        ...setState(state),
      }),
    weight: 0.3,
  },
  {
    name: "Dotted Lines",
    init: (props) =>
      dottedLines({
        ...props,
        ...setState(state),
      }),
    weight: 0.3,
  },
  {
    name: "Ring of Shapes",
    init: (props) =>
      ringOfShapes({
        ...props,
        ...setState(state),
      }),
    weight: 0.3,
  },
  {
    name: "Stepped Hexagons",
    init: (props) =>
      steppedHexagons({
        ...props,
        ...setState(state),
      }),
    weight: 0.7,
  },
  {
    name: "Test Lines",
    init: (props) =>
      testLines({
        lines: false,
        circle: false,
        ...props,
        ...setState(state),
      }),
    weight: 1,
  },
];

const makeCrystal = (pos) => {
  const layers = layerConstructors.map((lcon) => {
    let picker = random(1);
    const draw = picker > lcon.weight;
    return lcon.init({
      pos,
      draw,
    });
  });
  return layers;
};

const drawCrystal = (crystal) => {
  crystal.forEach((layer) => {
    if (layer.state.draw) {
      push();
      translate(layer.state.pos.x, layer.state.pos.y);
      layer.render();
      pop();
    }
  });
};
