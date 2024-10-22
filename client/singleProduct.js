const items = JSON.parse(localStorage.getItem('user'))
// console.log(items)

const single = document.querySelector('.single')
// console.log(items.imgDetails.split(','))
console.log(items.imgDetails)
let imgs = items.imgDetails.split(',')
let res = [...imgs, items.imgSrc].reverse()
console.log(res)

single.insertAdjacentHTML(
	'afterbegin',
	`			<div>
	<div>
	<div class="swiper11 task-swiper">
	<!-- Additional required wrapper -->
	<div class="swiper-wrapper sing-imgs">
	<!-- Slides -->
	
	
	</div>
	
	</div>
	<div class="swiper10 task-swiper">
	<!-- Additional required wrapper -->
	<div class="swiper-wrapper sing-imgs">
	<!-- Slides -->
	
	
	</div>
	
	</div>
	
	</div>
	<button class="prodcut__list-link">хочу</button>
	</div>
				<div class="single__info">
					<h2 class="single__title">${items.title}</h2>
					<p class="single__descr">${items.descr}</p>
				</div>`,
)
var swiper = new Swiper('.swiper10', {
	spaceBetween: 10,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
})
var swiper2 = new Swiper('.swiper11', {
	spaceBetween: 10,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	thumbs: {
		swiper: swiper,
	},
})
if (items.imgDetails !== 'undefined') {
	res.forEach((items, ind) => {
		document.querySelector('.swiper10 .swiper-wrapper').insertAdjacentHTML(
			'beforeend',
			`
						<div class="swiper-slide">
						<img src='${items}' alt='${ind}'></div>

		`,
		)
	})
}
// console.log(!!items.imgDetails);

	console.log('object')
	res.forEach((items, ind) => {
		document.querySelector('.swiper11 .swiper-wrapper').insertAdjacentHTML(
			'beforeend',
			`
						<div class="swiper-slide">
						<img src='${items}' alt='${ind}'></div>

		`,
		)
	})


const btn = document.querySelector('.prodcut__list-link')
btn.addEventListener('click', buy)

function buy() {
	// const img = document.querySelector('.single__img').src
	// const title = document.querySelector('.single__title').textContent

	// const storageItem = {
	//     id: basketNum.textContent,
	//     imgSrc: img,
	//     title,
	// }
	const basketNum = document.querySelector('.basket_num')
	const storage = JSON.parse(localStorage.getItem('storage'))
	if (!storage) {
		localStorage.setItem('storage', JSON.stringify([items]))
	} else {
		const res = reducedItems(storage, items)
		localStorage.setItem('storage', JSON.stringify(res))
	}
	basketNum.textContent = storage.length
}

function reducedItems(ar, newItem) {
	// debugger
	const foundItem = ar.find(item => item.id === newItem.id)
	// console.log(foundItem)

	if (foundItem) {
		return ar.map(i => {
			if (foundItem.id === i.id) {
				i.qty += 1
				return i
			} else {
				return i
			}
		})
	} else {
		return [...ar, newItem]
	}
}
