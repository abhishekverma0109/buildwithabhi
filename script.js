/* theme toggle (persisted; early set happens inline in <head> to avoid flash) */
(function(){
  var root=document.documentElement,
      btn=document.getElementById('themeToggle'),
      icon=document.getElementById('tIcon');
  var sun='<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var moon='<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  function paint(m){if(icon)icon.innerHTML=(m==='dark'?moon:sun)}
  paint(root.getAttribute('data-theme')==='light'?'light':'dark');
  if(btn)btn.addEventListener('click',function(){
    var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',n);paint(n);
    try{localStorage.setItem('bwa-theme',n)}catch(e){}
  });
})();

/* reveal on scroll */
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},
    {threshold:.14,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
})();

/* smooth in-page scrolling that keeps the URL clean (no #hash left behind) */
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href').slice(1);
      e.preventDefault();
      if(!id||id==='top'){window.scrollTo({top:0,behavior:'smooth'});}
      else{var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});}
      try{history.replaceState(null,'',location.pathname+location.search);}catch(err){}
    });
  });
})();

/* year in footer */
(function(){var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();})();
