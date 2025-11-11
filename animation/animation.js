const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;

const container = document.getElementById('container');
let width = container.offsetWidth;
let height = container.offsetHeight;

// Create engine
const engine = Engine.create();
const world = engine.world;
world.gravity.y = 0.5;

// Create renderer
const render = Render.create({
  element: container,
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    background: 'transparent'
  }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Create boundaries (invisible walls)
let wallOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
let ground = Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions);
let leftWall = Bodies.rectangle(-25, height / 2, 50, height, wallOptions);
let rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions);

Composite.add(world, [ground, leftWall, rightWall]);

// Shape and text data
const shapeData = [
  { text: 'Design' },
  { text: 'Code' },
  { text: 'Create' },
  { text: 'Build' },
  { text: 'Launch' },
  { text: 'Innovate' },
  { text: 'Dream' },
  { text: 'Explore' }
];

// Image data - using data URIs for the three icons
const imageData = [
  {
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiMwMDAwRkYiLz48cGF0aCBkPSJNMjAgNzVMMjAgMjVNMjAgNzVMODAgNzVNMzUgNjBMMzUgNDBNNTAgNjBMNTAgMzBNNjUgNjBMNjUgNDUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGNpcmNsZSBjeD0iMzUiIGN5PSI0MCIgcj0iNCIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjMwIiByPSI0IiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjY1IiBjeT0iNDUiIHI9IjQiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTM1IDQwTDUwIDMwTTUwIDMwTDY1IDQ1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSI1NSIgY3k9IjQ1IiByPSIxMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTYzIDM4TDcyIDI5TTcyIDI5TDc1IDMyTTcyIDI5TDY5IDI2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==',
    width: 60,
    height: 60
  },
  {
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiMwMDAwRkYiLz48cGF0aCBkPSJNNTAgMjVWMzBNMzAgMzBMMzQgMzRNNzAgMzBMNjYgMzRNMjUgNTBIMzBNNzAgNTBINzUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTQwIDQ1QzQwIDM5LjQ3NzIgNDQuNDc3MiAzNSA1MCAzNUM1NS41MjI4IDM1IDYwIDM5LjQ3NzIgNjAgNDVDNjAgNDguNSA1OCA1Mi41IDU1IDU1SDQ1QzQyIDUyLjUgNDAgNDguNSA0MCA0NVoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00NSA1NUg1NU00MyA2MEg1N000NSA2NUg1NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNDcgNDJMNTMgNDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=',
    width: 60,
    height: 60
  },
  {
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiMwMDAwRkYiLz48cGF0aCBkPSJNNTAgMjBDNDUgMjUgNDAgMzUgNDAgNDVDNDAgNTUgNDUgNjAgNTAgNjVDNTUgNjAgNjAgNTUgNjAgNDVDNjAgMzUgNTUgMjUgNTAgMjBaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjM1IiByPSI1IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik00MCA0NUwzNSA1NUwzOCA1NVoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik02MCA0NUw2NSA1NUw2MiA1NVoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik00NSA2NUw0MCA3MEM0MCA3NSA0NSA3OCA1MCA3OEM1NSA3OCA2MCA3NSA2MCA3MEw1NSA2NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTQ1IDY1SDU1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zNSA3MEMzMiA3MiAzMCA3NSAzMiA3N0MzNCA3OSAzNyA3NyA0MCA3NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNNjUgNzBDNjggNzIgNzAgNzUgNjggNzdDNjYgNzkgNjMgNzcgNjAgNzUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTQ1IDcyTDQ3IDc1TTUwIDcyTDUwIDc2TTU1IDcyTDUzIDc1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==',
    width: 60,
    height: 60
  }
];

const shapes = [];
const labels = [];
const images = [];

// Estimate text width
function getTextWidth(text) {
  return text.length * 10 + 40;
}

// Create text shapes
shapeData.forEach((data, i) => {
  const x = Math.random() * (width - 200) + 100;
  const y = -100 - (i * 80);
  const w = getTextWidth(data.text);
  const h = 50;
  const cornerRadius = [0, 5, 10, 15, 20, 25][Math.floor(Math.random() * 6)];

  const shape = Bodies.rectangle(x, y, w, h, {
    chamfer: { radius: cornerRadius },
    restitution: 0.9,
    friction: 0.1,
    density: 0.001,
    render: {
      fillStyle: 'transparent',
      strokeStyle: 'black',
      lineWidth: 2
    }
  });

  const label = document.createElement('div');
  label.className = 'shape-label';
  label.textContent = data.text;
  container.appendChild(label);
  labels.push(label);

  shapes.push(shape);
  Composite.add(world, shape);
});

// Create image shapes
imageData.forEach((data, i) => {
  const x = Math.random() * (width - 200) + 100;
  const y = -100 - ((shapeData.length + i) * 80);

  const shape = Bodies.rectangle(x, y, data.width, data.height, {
    chamfer: { radius: data.height / 2 },
    restitution: 0.9,
    friction: 0.1,
    density: 0.001,
    render: { fillStyle: 'transparent', strokeStyle: 'transparent', lineWidth: 0 }
  });

  const img = document.createElement('img');
  img.className = 'shape-image';
  img.src = data.src;
  img.style.width = data.width + 'px';
  img.style.height = data.height + 'px';
  container.appendChild(img);
  images.push(img);

  shapes.push(shape);
  Composite.add(world, shape);
});

// Mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: { stiffness: 0.2, render: { visible: false } }
});
Composite.add(world, mouseConstraint);
render.mouse = mouse;

// Hover effect
Events.on(mouseConstraint, 'mousemove', (e) => {
  const mousePos = e.mouse.position;
  shapes.forEach(shape => {
    const dx = shape.position.x - mousePos.x;
    const dy = shape.position.y - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 150) {
      const force = 0.008;
      const randomForce = { x: (Math.random() - 0.5) * force, y: (Math.random() - 0.5) * force };
      Body.applyForce(shape, shape.position, randomForce);
      Body.setAngularVelocity(shape, shape.angularVelocity + (Math.random() - 0.5) * 0.3);
    }
  });
});

// Update positions
Events.on(engine, 'afterUpdate', () => {
  for (let i = 0; i < shapeData.length; i++) {
    const label = labels[i];
    const shape = shapes[i];
    label.style.left = shape.position.x + 'px';
    label.style.top = shape.position.y + 'px';
    label.style.transform = `translate(-50%, -50%) rotate(${shape.angle}rad)`;
  }
  for (let i = 0; i < imageData.length; i++) {
    const img = images[i];
    const shape = shapes[shapeData.length + i];
    img.style.left = shape.position.x + 'px';
    img.style.top = shape.position.y + 'px';
    img.style.transform = `translate(-50%, -50%) rotate(${shape.angle}rad)`;
  }
});

// ✅ Resize handler
window.addEventListener('resize', () => {
  width = container.offsetWidth;
  height = container.offsetHeight;

  render.bounds.max.x = width;
  render.bounds.max.y = height;
  render.options.width = width;
  render.options.height = height;
  render.canvas.width = width;
  render.canvas.height = height;

  // Remove old walls
  Composite.remove(world, [ground, leftWall, rightWall]);

  // Add new resized walls
  ground = Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions);
  leftWall = Bodies.rectangle(-25, height / 2, 50, height, wallOptions);
  rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions);
  Composite.add(world, [ground, leftWall, rightWall]);
});

// Prevent scrolling
mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
