$(document).ready(function() {
  const canvas = document.querySelector('#draw');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.strokeStyle ='#000000';
  ctx.lineJoin = 'bevel';
  ctx.lineCap = 'square';

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue},90%, 0%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360)  {
      hue = 0;
    }

    if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
      direction = !direction;
    }
    if (direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }


  };

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);

  $('#clear').click(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

});
