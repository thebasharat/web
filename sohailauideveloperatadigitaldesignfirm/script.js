document.addEventListener('DOMContentLoaded', () => {
    const imageIds = ['img1', 'img2', 'img3'];
  
    function bringToFront(targetId) {
      imageIds.forEach((id) => {
        const img = document.getElementById(id);
        img.style.zIndex = (id === targetId) ? '10' : '1';
      });
    }
  
    document.getElementById('btn1').addEventListener('click', () => bringToFront('img1'));
    document.getElementById('btn2').addEventListener('click', () => bringToFront('img2'));
    document.getElementById('btn3').addEventListener('click', () => bringToFront('img3'));
  });