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



