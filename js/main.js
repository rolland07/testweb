

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

 
  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  const scrollWrapper = document.querySelector('.scroll-wrapper');
  const toggleBtn = document.getElementById('toggle-buttons');
  const scrollTopBtn = document.querySelector('.scroll-top');

  // Toggle tampilnya tombol tambahan
  toggleBtn.addEventListener('click', () => {
    scrollWrapper.classList.toggle('show-buttons');
  });

  // Scroll ke atas
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Munculkan tombol utama saat scroll
  function toggleScrollTopVisibility() {
    if (window.scrollY > 100) {
      scrollWrapper.classList.add('active');
    } else {
      scrollWrapper.classList.remove('active');
      scrollWrapper.classList.remove('show-buttons'); // Sembunyikan tombol lain juga
    }
  }

  window.addEventListener('load', toggleScrollTopVisibility);
  window.addEventListener('scroll', toggleScrollTopVisibility);
  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });
    /**
   * beforeafter
   */
    const slider = document.querySelector('.slider-handle');
  const afterImage = document.querySelector('.after-overlay img');
  const container = document.querySelector('.before-after-container');

  let isDragging = false;

  const updateSlider = (x) => {
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    const percent = (offsetX / rect.width) * 100;
    afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    slider.style.left = `${percent}%`;
  };

  slider.addEventListener('mousedown', () => {
    isDragging = true;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      updateSlider(e.clientX);
    }
  });

  // For touch devices
  slider.addEventListener('touchstart', () => {
    isDragging = true;
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (isDragging) {
      updateSlider(e.touches[0].clientX);
    }
  });

    /**
   * testimonihome Scrollspy
   */
    document.addEventListener("DOMContentLoaded", function () {
      const cards = document.querySelectorAll('.testimonialhomeV2-card');
      const dots = document.querySelectorAll('.testimonialhomeV2-dot');
      const prevBtn = document.querySelector('.testimonialhomeV2-nav-btn.prev');
      const nextBtn = document.querySelector('.testimonialhomeV2-nav-btn.next');
    
      let currentIndex = 0;
    
      function showCard(index) {
        cards.forEach(card => card.classList.remove('testimonialhomeV2-active'));
        dots.forEach(dot => dot.classList.remove('testimonialhomeV2-active'));
        cards[index].classList.add('testimonialhomeV2-active');
        dots[index].classList.add('testimonialhomeV2-active');
      }
    
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
      });
    
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
      });
    
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          currentIndex = parseInt(dot.dataset.index);
          showCard(currentIndex);
        });
      });
    });

  /**
   * getnow Scrollspy
   */
  document.querySelectorAll('[data-scroll]').forEach(container => {
    let isDown = false;
    let startX, scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Speed
      container.scrollLeft = scrollLeft - walk;
    });
  });
  /**
   * form WAS 1
   */
  
  /**
   * form WAS 2
   */

 document.addEventListener('DOMContentLoaded', function () {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbz_0y8q3n_JvN1vHM_0XYA-nXYQKMPFlG9vNCSx0XalY7DJwwAjzvKHvHKgbmvxoLE-/exec';

  function handleFormSubmit(formId, namaId, jenisId, teleponId, emailId, msgId) {
    const form = document.getElementById(formId);
    const msg = document.getElementById(msgId);

    if (!form || !msg) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const nama = document.getElementById(namaId).value.trim();
      const jenis = document.getElementById(jenisId).value;
      const telepon = document.getElementById(teleponId).value.trim();
      const email = document.getElementById(emailId).value.trim();

      const errorMsgs = form.querySelectorAll('.error-msg');
      errorMsgs.forEach(el => el.style.display = 'none');

      let valid = true;
      if (!nama) {
        document.getElementById(namaId).nextElementSibling.style.display = 'block';
        valid = false;
      }
      if (!jenis) {
        document.getElementById(jenisId).nextElementSibling.style.display = 'block';
        valid = false;
      }
      if (!telepon) {
        document.getElementById(teleponId).parentElement.nextElementSibling.style.display = 'block';
        valid = false;
      }
      if (!email) {
        document.getElementById(emailId).nextElementSibling.style.display = 'block';
        valid = false;
      }

      if (!valid) return;

      // Kirim ke WhatsApp
      const nomorWA = '6281188088018';
      const pesan = `Halo! Saya ${nama}, ingin konsultasi tentang ${jenis}. Nomor saya: ${telepon}, email: ${email}`;
      const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
      window.open(urlWA, '_blank');

      // Kirim ke Google Sheets
      const forms = ["#formpricing1", "#formpricing2"];

forms.forEach((selector) => {
    const form = document.querySelector(selector);
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(form);

            fetch("php/pricing.php", {
                method: "POST",
                body: formData
            })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Gagal mengirim form");
                }
            })
            .then((data) => {
                form.reset();
                alert("Pesan Anda berhasil terkirim!");
            })
            .catch((error) => {
                alert("Terjadi kesalahan: " + error.message);
            });
        });
    }
});

    });
  }

  handleFormSubmit('pricingForm1', 'nama1', 'jenis1', 'telepon1', 'email1', 'msg');
  handleFormSubmit('pricingForm2', 'nama2', 'jenis2', 'telepon2', 'email2', 'msg2');
});




  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


// Fungsi untuk memuat blog posts
// Fetch posts dari GitHub API

