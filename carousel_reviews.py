import os
import re

base = r"C:\Users\nickr\.gemini\antigravity\brain\e4e1be1e-4d82-467f-affd-f24bdf5991eb\barbershop"
index_path = os.path.join(base, "index.html")
css_path = os.path.join(base, "css", "style.css")
js_path = os.path.join(base, "js", "script.js")

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# Remove all existing review cards and the reviews-grid container
old_grid_start = '<div class="reviews-grid">'
old_grid_end_marker = '</section>'
# Find the reviews-grid and replace it with a carousel container
old_section = re.search(r'<div class="reviews-grid">.*?</div>\s*</div>\s*</section>', html, re.DOTALL)
if old_section:
    new_carousel = """<div class="reviews-carousel-wrapper">
                    <div class="reviews-carousel" id="reviews-carousel">
                        <!-- Cards injected by JS -->
                    </div>
                    <div class="carousel-dots" id="carousel-dots"></div>
                </div>
            </div>
        </section>"""
    html = html[:old_section.start()] + new_carousel + html[old_section.end():]
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Replaced static reviews grid with carousel container.")

# CSS
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# Remove old reviews-grid CSS
css = css.replace(""".reviews-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}""", "")

carousel_css = """
/* ===== REVIEWS CAROUSEL ===== */
.reviews-carousel-wrapper {
    position: relative;
    overflow: hidden;
}

.reviews-carousel {
    display: flex;
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
}

.carousel-slide {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    min-width: 100%;
    flex-shrink: 0;
    padding: 4px;
}

.carousel-dots {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 32px;
}

.carousel-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--border-color);
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 0;
}

.carousel-dot.active {
    background: var(--accent-color);
    transform: scale(1.3);
    box-shadow: 0 0 8px rgba(26, 115, 232, 0.4);
}

.review-card {
    animation: none;
    opacity: 1;
}

.carousel-slide .review-card {
    animation: cardPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.carousel-slide .review-card:nth-child(2) {
    animation-delay: 0.1s;
}

.carousel-slide .review-card:nth-child(3) {
    animation-delay: 0.2s;
}

@keyframes cardPop {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@media (max-width: 992px) {
    .carousel-slide {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .carousel-slide {
        grid-template-columns: 1fr;
    }
}
"""

if "REVIEWS CAROUSEL" not in css:
    css += carousel_css
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css)
    print("Added carousel CSS.")

# JS - inject reviews data + carousel engine
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

carousel_js = """

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
    {name:'Marcus L.', time:'3 weeks ago', text:'"The vibe in this shop is unmatched. Good music, great conversation, and the cuts speak for themselves. Five stars isn\'t enough."'},
    {name:'Brandon K.', time:'1 month ago', text:'"Brought my son here for his first real haircut and they treated him like a VIP. Patient, skilled, and the lineup was cleaner than mine. We\'re both customers for life."'},
    {name:'Anthony M.', time:'2 months ago', text:'"I\'ve been to barbers all over Philly and Bucks County. No Push Backs is easily top tier. Professional from the booking to the final mirror check."'},
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
"""

if "REVIEWS CAROUSEL ENGINE" not in js:
    js += carousel_js
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js)
    print("Added carousel JS engine.")

print("Done!")
