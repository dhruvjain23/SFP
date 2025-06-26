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
window.addEventListener('scroll', function () {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection && !statsAnimated && isInViewport(statsSection)) {
        statsAnimated = true;
        document.querySelectorAll('.stat-number').forEach(el => {
            animateCount(el, el.getAttribute('data-target'), 1200);
        });
    }
});
// In case stats are in view on first load
window.addEventListener('DOMContentLoaded', function () {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection && isInViewport(statsSection)) {
        statsAnimated = true;
        document.querySelectorAll('.stat-number').forEach(el => {
            animateCount(el, el.getAttribute('data-target'), 1200);
        });
    }
});

// Simple auto-scroll carousel (looping, smooth swipe-like movement)
document.addEventListener("DOMContentLoaded", function () {
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


document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
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


document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carouselTrack");
  const carousel = document.querySelector(".reviews-carousel");
  let cards = Array.from(track.children);
  let perPage = 2; // Default to 2 cards
  let cardWidth = 0; // Will be calculated
  let page = 0;

  function updateVars() {
    cards = Array.from(track.children).filter(card => !card.classList.contains('clone'));
    perPage = window.innerWidth < 700 ? 1 : 2;
    cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || 28);
    // Set carousel container width to fit exactly perPage cards
    carousel.style.maxWidth = `${cardWidth * perPage}px`;
    carousel.style.width = `${cardWidth * perPage}px`;
  }

  function cloneSlides() {
    Array.from(track.querySelectorAll('.clone')).forEach(el => el.remove());
    for (let i = 0; i < perPage; i++) {
      let clone = cards[i % cards.length].cloneNode(true); // Ensure enough clones
      clone.classList.add('clone');
      track.appendChild(clone);
    }
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
      if (page >= maxPage) {
        setTimeout(() => {
          track.style.transition = 'none';
          page = 0;
          slideTo(page, false);
        }, 550); // Match transition duration
      }
    }, 3500);
  }

  function stopCarousel() {
    clearInterval(intervalId);
  }

    window.addEventListener("resize", function () {
        stopCarousel();
        updateVars();
        page = 0;
        slideTo(page, false);
        startCarousel();
    });

  // Pause on hover
  track.addEventListener('mouseenter', stopCarousel);
  track.addEventListener('mouseleave', startCarousel);

  // Initialize
  updateVars();
  cloneSlides();
  slideTo(page, false);
  startCarousel();
});

document.getElementById('quoteForm').addEventListener('submit', function (e) {
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