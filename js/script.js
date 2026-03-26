// No Push Backs Barbershop - script.js
var barbers = [
  { id: 'tony-sautner', name: 'Tony Sautner',
    bio: 'Tony is the owner of No Push Backs. He built this shop from the ground up and brings that same standard to every cut.',
    image: 'Tony.jpg',
    bookingLink: 'https://tonycutz.as.me/schedule/16de057f',
    instagramLink: 'https://www.instagram.com/tony.sautner/',
    gallery: [] },
  { id: 'juan-barreto', name: 'Juan Barreto',
    bio: 'Juan is known for razor-sharp fades and attention to detail. Every client walks out looking right.',
    image: 'juan.jpg',
    bookingLink: 'https://juanittostylo.booksy.com',
    instagramLink: 'https://www.instagram.com/juanjobarreto_',
    gallery: [] },
  { id: 'david-rodriguez', name: 'David Rodriguez',
    bio: 'David has an eye for clean lines and flawless fades. Clients trust him because he always comes through.',
    image: 'david.jpg',
    bookingLink: 'https://app.thecut.co/barbers/David95',
    instagramLink: 'https://www.instagram.com/davidrod70',
    gallery: [] },
  { id: 'joseph-sanchez', name: 'Joseph Sanchez',
    bio: 'Joseph specializes in textured styles and modern cuts. If you want something sharp and on-trend, he is your guy.',
    image: 'joel.jpg',
    bookingLink: '#',
    instagramLink: 'https://www.instagram.com/_ohthatsjoel',
    gallery: [] },
  { id: 'sabastian-barrantes', name: 'Sabastian Barrantes',
    bio: 'Sabastian takes pride in understanding what each client wants and making it happen. Every cut is personal.',
    image: 'sabastian.jpg',
    bookingLink: 'https://booksy.com/en-us/447774_sb-cutz_barber-shop_33218_bristol',
    instagramLink: 'https://www.instagram.com/bassprocutz',
    gallery: [] },
  { id: 'anthony-galhhber', name: 'Anthony Galhhber',
    bio: 'Anthony brings energy to every appointment. Steady hand, sharp eye, and you walk out looking fresh every time.',
    image: 'anthony.jpg',
    bookingLink: 'https://antgallagher12.booksy.com/a',
    instagramLink: 'https://www.instagram.com/_twancuts_',
    gallery: [] }
];

document.addEventListener('DOMContentLoaded', function() {
  var grid=document.getElementById('barber-grid'),modal=document.getElementById('profile-modal'),closeBtn=document.getElementById('close-modal');
  var mImg=document.getElementById('modal-barber-img'),mName=document.getElementById('modal-barber-name');
  var mBio=document.getElementById('modal-barber-bio');
  var mLink=document.getElementById('modal-booking-link'),mIgLink=document.getElementById('modal-instagram-link'),mGal=document.getElementById('modal-gallery');

  barbers.forEach(function(b){
    var c=document.createElement('div'); c.className='barber-card';
    c.innerHTML='<div class="barber-img-container"><img src="'+b.image+'" alt="'+b.name+'" class="barber-img" loading="lazy"></div>'
              +'<div class="barber-info"><h3 class="barber-name">'+b.name+'</h3>'
              +'<span class="view-profile-text">View Profile &amp; Book &#8594;</span></div>';
    c.addEventListener('click',(function(x){return function(){openModal(x);};})(b));
    grid.appendChild(c);
  });

  function openModal(b){
    mImg.src=b.image; mName.textContent=b.name;
    if(mBio) mBio.textContent=b.bio;
    mLink.href=b.bookingLink; mLink.textContent='Book Now';
    if(b.instagramLink) { mIgLink.href=b.instagramLink; mIgLink.style.display='flex'; } else { mIgLink.style.display='none'; }
    
    // Set Gallery to Coming Soon state
    mGal.style.display = 'block'; // Reset grid since it's one item
    mGal.innerHTML = `
      <div class="coming-soon-box" style="padding: 24px; box-shadow: none; border: 1px dashed var(--border-color); text-align: center; border-radius: 12px; max-width: 100%; margin-top: 16px;">
        <div class="cs-icon" style="margin-bottom: 12px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </div>
        <div class="cs-badge" style="margin-bottom: 12px; font-size: 0.7rem;">Coming Soon</div>
        <p class="cs-desc" style="font-size: 0.95rem; margin-bottom: 0;">We are currently curating ${b.name.split(' ')[0]}'s portfolio. Be sure to check back shortly!</p>
      </div>
    `;
    
    modal.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
      modal.classList.add('hide');
      document.body.style.overflow='';
      setTimeout(function() {
          modal.classList.remove('hide');
          modal.close();
      }, 300);
  }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
      var r = modal.getBoundingClientRect();
      if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
          closeModal();
      }
  });
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){var h=this.getAttribute('href');if(!h||h==='#'||h.startsWith('#book-')||this.id==='modal-booking-link'||this.id==='modal-instagram-link')return;e.preventDefault();var t=document.querySelector(h);if(t)t.scrollIntoView({behavior:'smooth'});});
  });
});




// ==== SCROLL ANIMATIONS ====
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in classes to sections
    const sectionsToAnimate = [
        document.querySelector('.hero-content'),
        document.querySelector('.location-bar'),
        document.querySelector('.reviews-section'),
        document.querySelector('.section-header'),
        ...document.querySelectorAll('.barber-card')
    ];

    sectionsToAnimate.forEach((el, index) => {
        if(el) {
            el.classList.add('fade-in-section');
            // Stagger cards
            if(el.classList.contains('barber-card')) {
                el.style.transitionDelay = `${(index % 3) * 150}ms`;
            }
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});





// ===== REVIEWS CAROUSEL ENGINE =====
(function() {
  var gIcon = '<svg class="g-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.64 12.2c0-.82-.07-1.62-.2-2.4H12v4.56h6.52a5.56 5.56 0 0 1-2.42 3.65v3.04h3.91c2.3-2.12 3.63-5.24 3.63-8.85z"/><path fill="#34A853" d="M12 24c3.27 0 6.02-1.08 8.03-2.93l-3.91-3.04c-1.09.73-2.48 1.16-4.12 1.16-3.17 0-5.85-2.14-6.81-5.02H1.14v3.13A11.96 11.96 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.19 14.17a7.22 7.22 0 0 1 0-4.34V6.7H1.14a11.97 11.97 0 0 0 0 10.6l4.05-3.13z"/><path fill="#EA4335" d="M12 4.81c1.78 0 3.38.61 4.64 1.8l3.48-3.48A11.95 11.95 0 0 0 12 0 11.96 11.96 0 0 0 1.14 6.7l4.05 3.13c.96-2.88 3.64-5.02 6.81-5.02z"/></svg>';
  var colors = ['#1a73e8','#ea4335','#34a853','#fbbc05','#1a73e8','#ea4335','#34a853','#fbbc05','#1a73e8'];

  var reviews = [
    {name:'John P.', time:'2 weeks ago', text:'"Best barbershop in Bristol hands down. The attention to detail is crazy, shop is clean, and the environment is exactly what you want from a high-end spot. Definitely my new go-to."'},
    {name:'Michael S.', time:'1 month ago', text:'"Always leave looking fresh. They truly listen to what you want and give you styling tips so you can maintain it at home. No shortcuts taken here."'},
    {name:'David A.', time:'3 months ago', text:'"Family-friendly environment and every barber in there has serious skills. My kids refuse to go anywhere else now. Highly recommend booking ahead."'},
    {name:'Carlos R.', time:'1 month ago', text:'"I drove 30 minutes past other shops just to come here. Worth every mile. My fade was absolutely perfect and lasted over two weeks looking crisp."'},
    {name:'Tyler W.', time:'2 months ago', text:'"Finally found a barber that actually listens. I showed a picture of what I wanted and walked out looking exactly like it. Will never go anywhere else."'},
    {name:'Marcus L.', time:'3 weeks ago', text:'"The vibe in this shop is unmatched. Good music, great conversation, and the cuts speak for themselves. Five stars isn't enough."'},
    {name:'Brandon K.', time:'1 month ago', text:'"Brought my son here for his first real haircut and they treated him like a VIP. Patient, skilled, and the lineup was cleaner than mine. We're both customers for life."'},
    {name:'Anthony M.', time:'2 months ago', text:'"I've been to barbers all over Philly and Bucks County. No Push Backs is easily top tier. Professional from the booking to the final mirror check."'},
    {name:'James T.', time:'3 months ago', text:'"Walked in with a grown-out mess and walked out looking like a million bucks. These guys are artists. The beard work alone is worth the trip."'}
  ];

  var carousel = document.getElementById('reviews-carousel');
  var dotsContainer = document.getElementById('carousel-dots');
  if (!carousel || !dotsContainer) return;

  var perSlide = 3;
  var totalSlides = Math.ceil(reviews.length / perSlide);
  var currentSlide = 0;

  // Build slides
  for (var s = 0; s < totalSlides; s++) {
    var slide = document.createElement('div');
    slide.className = 'carousel-slide';
    for (var i = s * perSlide; i < Math.min((s+1) * perSlide, reviews.length); i++) {
      var r = reviews[i];
      var card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = '<div class="review-user">'
        + '<div class="user-avatar" style="background-color:'+colors[i]+';">'+r.name.charAt(0)+'</div>'
        + '<div class="user-info"><strong>'+r.name+'</strong><span>'+r.time+'</span></div>'
        + gIcon
        + '</div>'
        + '<div class="review-stars">★★★★★</div>'
        + '<p class="review-text">'+r.text+'</p>';
      slide.appendChild(card);
    }
    carousel.appendChild(slide);
  }

  // Build dots
  for (var d = 0; d < totalSlides; d++) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (d === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (d+1));
    dot.dataset.slide = d;
    dot.addEventListener('click', function() {
      goToSlide(parseInt(this.dataset.slide));
    });
    dotsContainer.appendChild(dot);
  }

  function goToSlide(n) {
    currentSlide = n;
    carousel.style.transform = 'translateX(-' + (n * 100) + '%)';
    var dots = dotsContainer.querySelectorAll('.carousel-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === n);
    }
    // Re-trigger card animations
    var activeSlide = carousel.querySelectorAll('.carousel-slide')[n];
    var cards = activeSlide.querySelectorAll('.review-card');
    for (var c = 0; c < cards.length; c++) {
      cards[c].style.animation = 'none';
      cards[c].offsetHeight; // force reflow
      cards[c].style.animation = '';
    }
  }

  // Auto-rotate every 6 seconds
  setInterval(function() {
    var next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  }, 6000);
})();
