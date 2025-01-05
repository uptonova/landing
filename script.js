function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let isCursorActive = !isMobile();

const dotsContainer = document.getElementById('dots-container');
let dots = [];
let lines = [];

function createDots() {
  const numDots = !isMobile() ? 150 : 50;

  dotsContainer.innerHTML = '';
  dots = [];

  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = `${Math.random() * window.innerWidth}px`;
    dot.style.top = `${Math.random() * window.innerHeight}px`;

    dot.speedX = (Math.random() - 0.5) * 0.5;
    dot.speedY = (Math.random() - 0.5) * 0.5;

    dot.style.opacity = 1;

    dotsContainer.appendChild(dot);
    dots.push(dot);
  }
}

if (isCursorActive) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    dots.forEach(dot => {
      const dotX = parseFloat(dot.style.left);
      const dotY = parseFloat(dot.style.top);
      const distance = Math.sqrt(Math.pow(dotX - mouseX, 2) + Math.pow(dotY - mouseY, 2));

      const opacity = Math.max(0.1, 1 - distance / 800);
      dot.style.opacity = opacity;
    });

    createLines(mouseX, mouseY);
  });
}

function createLines(mouseX, mouseY) {
  lines.forEach(line => line.remove());
  lines = [];

  if (isCursorActive) {
    dots.forEach(dot => {
      const dotX = parseFloat(dot.style.left);
      const dotY = parseFloat(dot.style.top);
      const distance = Math.sqrt(Math.pow(dotX - mouseX, 2) + Math.pow(dotY - mouseY, 2));

      if (distance < 150) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.left = `${dotX}px`;
        line.style.top = `${dotY}px`;

        const angle = Math.atan2(mouseY - dotY, mouseX - dotX);
        const length = distance;
        const x2 = dotX + length * Math.cos(angle);
        const y2 = dotY + length * Math.sin(angle);

        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}rad)`;
        line.style.transformOrigin = '0 0';
        dotsContainer.appendChild(line);
        lines.push(line);
      }
    });
  }
}

function moveDots() {
  dots.forEach(dot => {
    let dotX = parseFloat(dot.style.left);
    let dotY = parseFloat(dot.style.top);

    dotX += dot.speedX;
    dotY += dot.speedY;

    if (dotX < 0 || dotX > window.innerWidth - 10) {
      dot.speedX = -dot.speedX;
    }

    if (dotY < 0 || dotY > window.innerHeight - 10) {
      dot.speedY = -dot.speedY;
    }

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
  });

  requestAnimationFrame(moveDots);
}

moveDots();
createDots();

window.addEventListener('resize', () => {
  createDots();
});


document.getElementById("mail-link").addEventListener("click", function () {
  alert("uptonova@bk.ru")
})

document.getElementById("listen").addEventListener("click", function () {
  document.getElementById("content-socials").style.display = "none";
  document.getElementById("content-playlist").style.display = "block";
  VK.Widgets.Playlist('playlist', -228679195, 2, '78ee72aaa3590bb6eb', { width: 500 });
})

document.getElementById("back-to-socials").addEventListener("click", function () {
  document.getElementById("content-socials").style.display = "block";
  document.getElementById("content-playlist").style.display = "none";
})

const socials = document.getElementById("socials")
const speed = 250;
const fadein_interval = setInterval(function () {
  if (+socials.style.opacity >= 1)
    clearInterval(fadein_interval);

  socials.style.opacity = +socials.style.opacity + (1 / speed);
}, speed / 1000);