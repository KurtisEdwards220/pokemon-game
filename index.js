const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

console.log(collisions);

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './img/LakeVerity.png';

const playerImage = new Image();
playerImage.src = './img/swimming.png';

const hairImage = new Image();
hairImage.src = './img/hair.png';

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  position: {
    x: -470,
    y: -850,
  },
  image: image,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 12,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height * 2
  );
  c.drawImage(
    hairImage,
    0,
    0,
    hairImage.width / 12,
    hairImage.height,
    canvas.width / 2 - hairImage.width / 4 / 2,
    canvas.height / 2 - hairImage.height / 2,
    hairImage.width / 4,
    hairImage.height * 2
  );

  if (keys.w.pressed && lastKey === 'w') background.position.y += 3;
  else if (keys.a.pressed && lastKey === 'a') background.position.x += 3;
  else if (keys.s.pressed && lastKey === 's') background.position.y -= 3;
  else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3;
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});
