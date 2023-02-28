window.addEventListener('DOMContentLoaded', () => {
  //   // * ===== Mask input
  //   $('input[type="tel"]').mask('+7 (999) 999-99-99');

  // * ===== Nice Select
  $('select').niceSelect();

  // * ===== Show Hide Password
  (function showHidePassword() {
    const formGroups = document.querySelectorAll('.form-wrap');

    formGroups.forEach((group) => {
      if (group) {
        group.addEventListener('click', (e) => {
          if (!e.target.closest('.btn-change-password')) return;

          const input = document.querySelectorAll('.input-pas');
          input.forEach((el) => {
            if (el.getAttribute('type') === 'password') {
              el.setAttribute('type', 'text');
            } else {
              el.setAttribute('type', 'password');
            }
          });
        });
      }
    });
  })();

  // * ===== Slider
  (function slider() {
    const sliderEls = document.querySelectorAll('.catalog__slider');
    sliderEls.forEach((sliderEl) => {
      if (sliderEl) {
        new Swiper(sliderEl, {
          slidesPerView: 'auto',
          spaceBetween: 25,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            315: {
              spaceBetween: 15,
            },
            768: {
              spaceBetween: 25,
            },
          },
        });
      }
    });
  })();

  // * ===== Fixed Header
  (function fixedHeader() {
    function scrollHeader() {
      const nav = document.querySelector('.header');
      if (nav) {
        if (this.scrollY >= 30) {
          nav.classList.add('scroll-header');
        } else {
          nav.classList.remove('scroll-header');
        }
      }
    }
    window.addEventListener('scroll', scrollHeader);
    // ! Change
    function changeBg() {
      const header = document.querySelector('.header');
      if (header) {
        if (window.pageYOffset >= 30) {
          header.classList.add('scroll-header');
        }
      }
    }
    changeBg();
  })();

  // * ===== Show Filters
  (function showFilters() {
    const menuBtn = document.querySelector('.catalog-vacancies__filter');
    const menu = document.querySelector('.catalog-vacancies__left');
    const menuClose = document.querySelector('.catalog-vacancies__close');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');

    if (menuBtn) {
      menuBtn.addEventListener('click', (e) => {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
      });

      overlay.addEventListener('click', (e) => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
      });

      menuClose.addEventListener('click', (e) => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
      });
    }
  })();

  // * ===== Show Menu
  (function showMenu() {
    const menuBtn = document.querySelector('.header__toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuCloseBtn = document.querySelector('.mobile-menu__close');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');
    if (menu) {
      menuBtn.addEventListener('click', (e) => {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
      });
      overlay.addEventListener('click', (e) => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
      });
      menuCloseBtn.addEventListener('click', (e) => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
      });
    }
  })();

  // * ===== Accordion
  const toggleAccordion = (accordionControl, accordionContent, accordion) => {
    const filters = document.querySelectorAll(accordionControl);
    filters.forEach((el) => {
      if (el) {
        el.addEventListener('click', (e) => {
          const target = e.target.closest(accordion);
          const content = target.querySelector(accordionContent);
          target.classList.toggle('active');
          if (target.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
          } else {
            content.style.maxHeight = null;
          }
        });
      }
    });
  };
  toggleAccordion('.accordion-control', '.accordion-content', '.accordion');

  // * ===== Modal
  (function modals() {
    function bindModal(openBtn, modal, close) {
      const openBtnEl = document.querySelectorAll(openBtn);
      const modalEl = document.querySelector(modal);
      const closeEl = document.querySelectorAll(close);
      const body = document.querySelector('body');
      if (modalEl) {
        openBtnEl.forEach((el) => {
          el.addEventListener('click', (e) => {
            if (e.target) {
              e.preventDefault();
            }
            modalEl.classList.add('active');
            body.classList.add('no-scroll');
          });
        });
        closeEl.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            modalEl.classList.remove('active');
            body.classList.remove('no-scroll');
          });
        });
        modalEl.addEventListener('click', (e) => {
          if (e.target === modalEl) {
            modalEl.classList.remove('active');
            body.classList.remove('no-scroll');
          }
        });
      }
    }
    bindModal('.btn-login', '.popup--login', '.popup__close');
    bindModal('.btn-fio', '.popup-fio', '.popup__close');
    bindModal('.btn-password', '.popup-password', '.popup__close');
    bindModal('.btn-phone', '.popup-phone', '.popup__close');
    bindModal('.btn-email', '.popup-email', '.popup__close');
    bindModal('.btn-country', '.popup-country', '.popup__close');
  })();

  // * ===== Toggle Tabs
  function someTabs(headerSelector, tabSelector, contentSelector, activeClass) {
    const header = document.querySelectorAll(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);
    header.forEach((el) => {
      if (el) {
        hideTabContent();
        showTabContent();
        function hideTabContent() {
          content.forEach((item) => {
            item.classList.remove('active');
          });
          tab.forEach((item) => {
            item.classList.remove(activeClass);
          });
        }
        function showTabContent(i = 0) {
          content[i].classList.add('active');
          tab[i].classList.add(activeClass);
        }
        header.forEach((item) => {
          if (item) {
            item.addEventListener('click', (e) => {
              const target = e.target;
              if (target.classList.contains(tabSelector.replace(/\./, ''))) {
                tab.forEach((item, i) => {
                  if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  someTabs(
    '.catalog__tabs',
    '.catalog__top-btn',
    '.catalog__content',
    'active'
  );

  // * ===== Show Aside
  (function showMenu() {
    const menuBtn = document.querySelector('.show-aside-btn');
    const menu = document.querySelector('.aside');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');

    if (menu) {
      menuBtn.addEventListener('click', (e) => {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
      });
      overlay.addEventListener('click', (e) => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
      });
    }
  })();
});
