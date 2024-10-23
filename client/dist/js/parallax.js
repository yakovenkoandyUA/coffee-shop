"use strict";

function scrollParallax() {
  if (window.scrollY > window.innerHeight) return;
  var target = document.querySelectorAll('.table-scroll-item');
  var scaleItem = document.querySelector('.table-scale-item');
  var scaleItem1 = document.querySelector('.table-scale-item1');
  if (!scaleItem || !scaleItem1) return;
  var posScale = window.scrollY * scaleItem.dataset.rate;
  var posScale1 = window.scrollY * scaleItem1.dataset.rate;
  // scaleItem.style.width = '100px'
  scaleItem.style.transform = "perspective(300px) translateX(-50%) translateY(".concat(posScale, "px)");
  scaleItem1.style.transform = "perspective(300px)  translateZ(".concat(-posScale1, "px)");
  target.forEach(function (item) {
    var pos = window.scrollY * item.dataset.rate;
    if (item.dataset.direction === 'vertical') {
      item.style.transform = "translate3d(0px, ".concat(pos, "px, 0px)");
    } else {
      var posX = window.scrollY * item.dataset.ratex;
      var posY = window.scrollY * item.dataset.ratey;
      item.style.transform = "translate3d(".concat(posX, "px, ").concat(posY, "px, 0px)");
    }
  });
}
window.addEventListener('scroll', scrollParallax);

//! SIMPLE PARALLAX

var paralax = function paralax(elem, distance, speed) {
  var item = document.querySelector(elem);
  item.style.transform = "translateY(".concat(distance * speed, "px)");
};
window.addEventListener('scroll', function () {
  // paralax('.cool', window.scrollY, -1)
});