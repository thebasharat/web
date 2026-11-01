const mybutton=document.getElementById('highlightBtn');
const para_to_be_high=document.getElementById('textPara');
mybutton.addEventListener('click',function (){
  para_to_be_high.classList.toggle('Highlighter');
});