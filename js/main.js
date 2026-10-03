(function(){
var btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
var lb=document.querySelector('.lightbox');if(!lb)return;
var tiles=[].slice.call(document.querySelectorAll('.tile')),img=lb.querySelector('img'),count=lb.querySelector('.lb-count'),i=0,last;
var g=document.querySelector('.gallery'),pending=tiles.length;
function ready(){g.classList.add('ready')}
tiles.forEach(function(t){var im=t.querySelector('img');
function set(){if(im.naturalWidth)t.style.setProperty('--r',im.naturalWidth/im.naturalHeight);if(--pending===0)ready()}
if(im.complete)set();else{im.addEventListener('load',set);im.addEventListener('error',set)}});
setTimeout(ready,3000);
function show(n){i=(n+tiles.length)%tiles.length;img.src=tiles[i].getAttribute('href');img.alt=tiles[i].querySelector('img').alt;count.textContent=(i+1)+' / '+tiles.length;
[1,-1].forEach(function(d){new Image().src=tiles[(i+d+tiles.length)%tiles.length].getAttribute('href')})}
function open(n){last=document.activeElement;show(n);lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lb-close').focus()}
function close(){lb.hidden=true;document.body.style.overflow='';if(last)last.focus()}
tiles.forEach(function(t,n){t.addEventListener('click',function(e){e.preventDefault();open(n)})});
lb.querySelector('.lb-close').onclick=close;
lb.querySelector('.lb-prev').onclick=function(){show(i-1)};
lb.querySelector('.lb-next').onclick=function(){show(i+1)};
lb.addEventListener('click',function(e){if(e.target===lb)close()});
document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
var x0;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)show(d<0?i+1:i-1)});
})();
