document.addEventListener('DOMContentLoaded', function () {

    const canvas = document.getElementById('sketchPad');
    const ctx = canvas.getContext('2d');
    const currentColorDisplay = document.getElementById('currentColor');
  
    const defaultBtn = document.getElementById('defaultBtn');
    const redBtn = document.getElementById('redBtn');
    const blueBtn = document.getElementById('blueBtn');
    const greenBtn = document.getElementById('greenBtn');
    const eraserBtn = document.getElementById('eraserBtn');
    const clearBtn = document.getElementById('clearBtn');
  
    let isDrawing = false;
    let currentColor = 'black';
  
    // Fill the canvas with a white background so "erasing" and
    // "clearing" read back as pure white rather than transparent.
    function fillWhiteBackground() {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    fillWhiteBackground();
  
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = currentColor;
  
    // Translate a mouse event's viewport coordinates into
    // coordinates relative to the canvas element itself.
    function getPos(event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  
    function setColor(color, label) {
      currentColor = color;
      ctx.strokeStyle = color;
      currentColorDisplay.textContent = label;
    }
  
    function startDrawing(event) {
      isDrawing = true;
      const pos = getPos(event);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      // Draw an immediate dot at the starting point so a simple
      // click (with no movement) still marks the canvas.
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  
    function draw(event) {
      if (!isDrawing) return;
      const pos = getPos(event);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  
    function stopDrawing() {
      if (!isDrawing) return;
      isDrawing = false;
      ctx.beginPath();
    }
  
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
  
    defaultBtn.addEventListener('click', () => setColor('black', 'Black'));
    redBtn.addEventListener('click', () => setColor('red', 'Red'));
    blueBtn.addEventListener('click', () => setColor('blue', 'Blue'));
    greenBtn.addEventListener('click', () => setColor('green', 'Green'));
    eraserBtn.addEventListener('click', () => setColor('white', 'White'));
  
    clearBtn.addEventListener('click', () => {
      fillWhiteBackground();
      setColor('black', 'Black');
    });
  
  });