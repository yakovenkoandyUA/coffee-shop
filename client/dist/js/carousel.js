"use strict";

var swiper = new Swiper('.swiper', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination'
  },
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    900: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});
var swiper1 = new Swiper('.swiper1', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination1'
  },
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});
var swiper2 = new Swiper('.swiper2', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination2'
  },
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});
var swiper3 = new Swiper('.swiper3', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination3'
  },
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});