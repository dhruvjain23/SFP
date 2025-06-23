// Rotating Background Images with Zoom Effect
document.addEventListener('DOMContentLoaded', function () {
    const bgImages = [
        'images/bg/1.jpg',
        'images/bg/2.jpg',
        'images/bg/3.jpg',
        // Replace with your wedding images
    ];
    let currentIndex = 0;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        function setBg(idx) {
            heroBg.style.backgroundImage = `url('${bgImages[idx]}')`;
            heroBg.classList.remove('zoom');
            // Re-trigger zoom animation
            setTimeout(() => {
                heroBg.classList.add('zoom');
            }, 50);
        }

        // Initial setup
        setBg(currentIndex);

        // Background image change every 7.5s
        setInterval(() => {
            currentIndex = (currentIndex + 1) % bgImages.length;
            setBg(currentIndex);
        }, 7500);
    }

    

    // Typing effect for services
    const services = [
        "Pre-Weddings",
        "Baby Showers",
        "Corporate Events",
        "Property Shoots",
        "Maternity Shoots",
        "Engagements",
        "Haldi & Mehendi"
    ];
    let typeElem = document.getElementById('typewrite');
    if (typeElem) {
        let serviceIndex = 0, charIndex = 0, isDeleting = false, waitTime = 1300;

        function typeServices() {
            let current = services[serviceIndex];
            if (!isDeleting) {
                typeElem.innerHTML = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    isDeleting = true;
                    setTimeout(typeServices, waitTime);
                } else {
                    setTimeout(typeServices, 65 + Math.random() * 50);
                }
            } else {
                typeElem.innerHTML = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    serviceIndex = (serviceIndex + 1) % services.length;
                    setTimeout(typeServices, 260);
                } else {
                    setTimeout(typeServices, 25 + Math.random() * 30);
                }
            }
        }
        typeElem.innerHTML = "";
        typeServices();
    }
    
});



// Animated number increment when in view
function animateCount(el, target, duration) {
    let start = 0;
    let end = parseFloat(target);
    let decimalPlaces = (target % 1 !== 0) ? 1 : 0;
    let range = end - start;
    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = Math.min((currentTime - startTime) / duration, 1);
        let value = start + range * progress;
        el.textContent = value.toFixed(decimalPlaces);
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            el.textContent = end.toFixed(decimalPlaces);
        }
    }
    requestAnimationFrame(animate);
}

// Detect when .about-stats is in viewport
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight - 50 &&
        rect.bottom > 0
    );
}

let statsAnimated = false;
window.addEventListener('scroll', function() {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection && !statsAnimated && isInViewport(statsSection)) {
        statsAnimated = true;
        document.querySelectorAll('.stat-number').forEach(el => {
            animateCount(el, el.getAttribute('data-target'), 1200);
        });
    }
});
// In case stats are in view on first load
window.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection && isInViewport(statsSection)) {
        statsAnimated = true;
        document.querySelectorAll('.stat-number').forEach(el => {
            animateCount(el, el.getAttribute('data-target'), 1200);
        });
    }
});

// Simple auto-scroll carousel (looping, smooth swipe-like movement)
document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.getElementById('galleryCarousel');
    if (!carousel) return;

    // Clone images to allow seamless infinite scroll
    const slides = Array.from(carousel.children);
    slides.forEach(slide => carousel.appendChild(slide.cloneNode(true)));

    let scrollPos = 0;
    const slideWidth = slides[0].offsetWidth + 18; // 18px gap
    let autoScroll;

    function scrollCarousel() {
        scrollPos += 2; // speed, px/frame
        if (scrollPos >= slideWidth * slides.length) {
            scrollPos = 0;
        }
        carousel.style.transform = `translateX(${-scrollPos}px)`;
        autoScroll = requestAnimationFrame(scrollCarousel);
    }
    scrollCarousel();

    // Optional: Pause on hover
    carousel.addEventListener('mouseenter', () => cancelAnimationFrame(autoScroll));
    carousel.addEventListener('mouseleave', () => scrollCarousel());
});


document.addEventListener("DOMContentLoaded", function() {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function() {
            navLinks.classList.toggle("show");
            navToggle.classList.toggle("active"); // This triggers the X icon
        });
        // Hide menu after clicking a link (optional)
        navLinks.querySelectorAll("a").forEach(link =>
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                navToggle.classList.remove("active");
            })
        );
    }
});

// Parallax 3D Card Hover Effect
document.querySelectorAll('.expertise-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x within card
    const y = e.clientY - rect.top;  // mouse y within card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 7; // adjust multiplier for depth
    const rotateY = ((x - centerX) / centerX) * 11;
    this.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.045)`;
    // Parallax icon:
    const icon = this.querySelector('.expertise-icon');
    if(icon) {
      icon.style.transform = `translateY(-10px) scale(1.17) rotate(-8deg) translateX(${(rotateY)*2}px) translateY(${(-rotateX)*2}px)`;
    }
    // Parallax text desc:
    const desc = this.querySelector('.expertise-desc');
    if(desc && desc.style.opacity === "1") {
      desc.style.transform = `translateY(${-rotateX*2}px) scale(1)`;
    }
    this.classList.add('is-hovering');
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
    const icon = this.querySelector('.expertise-icon');
    if(icon) icon.style.transform = '';
    const desc = this.querySelector('.expertise-desc');
    if(desc) desc.style.transform = '';
    this.classList.remove('is-hovering');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carouselTrack");
  let cards = Array.from(track.children);
  let perPage = window.innerWidth < 700 ? 1 : 2;
  let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || 28);
  let page = 0;

  // Helper: Clone slides for infinite scroll
  function cloneSlides() {
    Array.from(track.querySelectorAll('.clone')).forEach(el => el.remove());
    // Clone enough cards for smooth infinite effect
    for (let i = 0; i < perPage; i++) {
      let clone = cards[i].cloneNode(true);
      clone.classList.add('clone');
      track.appendChild(clone);
    }
  }

  function updateVars() {
    cards = Array.from(track.children).filter(card => !card.classList.contains('clone'));
    perPage = window.innerWidth < 700 ? 1 : 2;
    cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || 28);
  }

  function slideTo(pg, animate = true) {
    updateVars();
    cloneSlides();
    track.style.transition = animate ? 'transform 0.55s cubic-bezier(.68,0,.32,1)' : 'none';
    track.style.transform = `translateX(-${pg * cardWidth}px)`;
  }

  let intervalId;
  function startCarousel() {
    intervalId = setInterval(() => {
      updateVars();
      let maxPage = cards.length;
      page++;
      slideTo(page, true);
      // When at clones, snap back to 0 instantly (after animation)
      if (page === maxPage) {
        setTimeout(() => {
          track.style.transition = 'none';
          page = 0;
          slideTo(page, false);
        }, 560);
      }
    }, 3500);
  }
  function stopCarousel() { clearInterval(intervalId); }

  window.addEventListener("resize", function () {
    stopCarousel();
    updateVars();
    page = 0;
    slideTo(page, false);
    startCarousel();
  });

  // Optionally pause on hover
  track.addEventListener('mouseenter', stopCarousel);
  track.addEventListener('mouseleave', startCarousel);

  // Init
  updateVars();
  cloneSlides();
  slideTo(page, false);
  startCarousel();
});

document.getElementById('quoteForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Get form values
  const name = document.getElementById('yourName').value.trim();
  const phone = document.getElementById('yourPhone').value.trim();
  const email = document.getElementById('yourEmail').value.trim();
  const dropdown = document.getElementById('yourDropdown').value;
  const location = document.getElementById('yourLocation').value.trim();

  const mail = "shivameharfilms2@gmail.com";
  const subject = encodeURIComponent("Quote Request from " + name);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${dropdown}\nLocation: ${location}`
  );
  window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
});