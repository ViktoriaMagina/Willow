import WOW from  '../libs/wow.min.js';

const wow = new WOW({
  boxClass: 'wow',
  animateClass: 'animate__animated',
  offset: 100,
  mobile: false, 
  live: false
})
wow.init();