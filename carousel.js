const swiper = new Swiper('.swiper', {
	// Optional parameters
	// direction: 'vertical',
	loop: true,

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
	},
	// Default parameters
	slidesPerView: 1,
	spaceBetween: 10,
	// Responsive breakpoints
	breakpoints: {
	
		// when window width is >= 480px
		480: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		// when window width is >= 640px
		800: {
			slidesPerView: 3,
			spaceBetween: 40,
		},
	},
})
const swiper1 = new Swiper('.swiper1', {
	// Optional parameters
	// direction: 'vertical',
	loop: true,

	// If we need pagination
	pagination: {
		el: '.swiper-pagination1',
	},
	// Default parameters
	slidesPerView: 1,
	spaceBetween: 10,
	// Responsive breakpoints
	breakpoints: {
	
		// when window width is >= 480px
		480: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		// // when window width is >= 640px
		// 640: {
		// 	slidesPerView: 2,
		// 	spaceBetween: 40,
		// },
	},
})
