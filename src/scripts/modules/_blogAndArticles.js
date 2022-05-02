const blogAndArticlesSlider = new Swiper('.blogAndArticles__slider', {
    loop: true,
    centerSlides: true,
    breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
});