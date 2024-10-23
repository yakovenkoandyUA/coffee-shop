"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var items = JSON.parse(localStorage.getItem('user'));
// console.log(items)

var single = document.querySelector('.single');
// console.log(items.imgDetails.split(','))
// console.log(items.imgDetails)
var imgs;
var res;
// console.log(items.imgDetails)
if (items.imgDetails) {
  imgs = items === null || items === void 0 ? void 0 : items.imgDetails.split(',');
  res = [].concat(_toConsumableArray(imgs), [items.imgSrc]).reverse();
} else {
  res = [items.imgSrc];
}
// console.log(res)

single.insertAdjacentHTML('afterbegin', "\t\t\t<div>\n\t<div>\n\t<div class=\"swiper11 task-swiper\">\n\t<!-- Additional required wrapper -->\n\t<div class=\"swiper-wrapper sing-imgs\">\n\t<!-- Slides -->\n\t\n\t\n\t</div>\n\t\n\t</div>\n\t<div class=\"swiper10 task-swiper\">\n\t<!-- Additional required wrapper -->\n\t<div class=\"swiper-wrapper sing-imgs\">\n\t<!-- Slides -->\n\t\n\t\n\t</div>\n\t\n\t</div>\n\t\n\t</div>\n\t<button class=\"prodcut__list-link\">\u0445\u043E\u0447\u0443</button>\n\t</div>\n\t\t\t\t<div class=\"single__info\">\n\t\t\t\t\t<h2 class=\"single__title\">".concat(items.title, "</h2>\n\t\t\t\t\t<p class=\"single__descr\">").concat(items.descr, "</p>\n\t\t\t\t</div>"));
var swiper = new Swiper('.swiper10', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true
});
var swiper2 = new Swiper('.swiper11', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  thumbs: {
    swiper: swiper
  }
});
if (items.imgDetails !== 'undefined') {
  res.forEach(function (items, ind) {
    document.querySelector('.swiper10 .swiper-wrapper').insertAdjacentHTML('beforeend', "\n\t\t\t\t\t\t<div class=\"swiper-slide\">\n\t\t\t\t\t\t<img src='".concat(items, "' alt='").concat(ind, "'></div>\n\n\t\t"));
  });
}
// console.log(!!items.imgDetails);

res.forEach(function (items, ind) {
  document.querySelector('.swiper11 .swiper-wrapper').insertAdjacentHTML('beforeend', "\n\t\t\t\t\t\t<div class=\"swiper-slide\">\n\t\t\t\t\t\t<img src='".concat(items, "' alt='").concat(ind, "'></div>\n\n\t\t"));
});
var btn = document.querySelector('.prodcut__list-link');
btn.addEventListener('click', buy);
function buy() {
  // const img = document.querySelector('.single__img').src
  // const title = document.querySelector('.single__title').textContent

  // const storageItem = {
  //     id: basketNum.textContent,
  //     imgSrc: img,
  //     title,
  // }
  var basketNum = document.querySelector('.basket_num');
  var storage = JSON.parse(localStorage.getItem('storage'));
  if (!storage) {
    localStorage.setItem('storage', JSON.stringify([items]));
  } else {
    var _res = reducedItems(storage, items);
    localStorage.setItem('storage', JSON.stringify(_res));
  }
  basketNum.textContent = JSON.parse(localStorage.getItem('storage')).length;
}
function reducedItems(ar, newItem) {
  // debugger
  var foundItem = ar.find(function (item) {
    return item.id === newItem.id;
  });
  // console.log(foundItem)

  if (foundItem) {
    return ar.map(function (i) {
      if (foundItem.id === i.id) {
        i.qty += 1;
        return i;
      } else {
        return i;
      }
    });
  } else {
    return [].concat(_toConsumableArray(ar), [newItem]);
  }
}