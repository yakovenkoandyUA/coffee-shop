const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const btnWonna = document.querySelector('.btn__wonna')
const submit = document.querySelector('.modal-form-wonna-submit')
const submit1 = document.querySelector('.modal-form-submit')

const handleModal = e => {
	if (e?.target === e?.currentTarget) {
		modal.classList.toggle('active')
	}
}

btnWonna?.addEventListener('click', handleModal)
close?.addEventListener('click', handleModal)
submit?.addEventListener('click', handleModal)
submit?.addEventListener('submit', e => {
	e.preventDefault()
})

const buyGoods = e => {
	const basketNum = document.querySelector('.basket_num')
	if (e.target.classList.contains('prodcut__list-link')) {
		const img = e.target.parentElement.parentElement.children[0].src
		const title = e.target.parentElement.parentElement.children[1].textContent
		const descr = e.target.parentElement.parentElement.children[2].textContent

		basketNum.textContent = +basketNum.textContent + 1
		// console.log(e.target.parentElement.parentElement.children)
		const storageItem = {
			id: basketNum.textContent,
			imgSrc: img,
			title,
			descr,
		}
		window.open('./singleProduct.html', '_self')
		localStorage.setItem('user', JSON.stringify(storageItem))
		// newWindow.document.location.href = './singleProduct.html'

		// const t = storage.map(i =>{

		// })
		// const storage = JSON.parse(localStorage.getItem('user'))
		// if(!storage) {
		// debugger
		// } else {
		// const newStorage = [...storage, storageItem]
		// localStorage.setItem('user', JSON.stringify(newStorage))
		// }
	}
}

const popup = document.querySelector('.popup')
const btnPopup = document.querySelector('.popup button')
function popupHandler(e = true) {
	if (e?.target === popup || e?.target === btnPopup || e) {
		popup?.classList.toggle('active')
		localStorage.setItem('basketUser', false)
		// console.log('object')
	}
}

popup?.addEventListener('click', popupHandler)
// btnPopup.addEventListener('click', popupHandler)

const goods = document.querySelectorAll('.goods')
goods.forEach(item => {
	item.addEventListener('click', buyGoods)
})
// if(!localStorage.getItem('user')) {
// 	localStorage.setItem('user', JSON.stringify([]))
// }

const basket = document.querySelector('.basket_wrap')
const modalBasket = document.querySelector('.modal-basket')
const modalWrapperBasket = document.querySelector('.modal-basket-wrapper')
const close1 = document.querySelector('.close1')
const handleModal1 = e => {
	modalBasket.classList.toggle('active')
	const storage = JSON.parse(localStorage.getItem('storage'))
	const wrapper = document.querySelector('.modal-basket-goods')
	storage?.forEach(singleGood => {
		wrapper.insertAdjacentHTML(
			'afterbegin',
			`
			<div class="modal-basket-goods-item">
			<img src="${singleGood.imgSrc}" alt="">
			<div class="count">
			
			<p>1</p>
			
			</div>
			<img src="./img/close.png" class="delete" alt="" />
			</div>`,
		)
		})
	}
	// console.log('object')
	close1?.addEventListener('click', () => {
		const wrapper = document.querySelector('.modal-basket-goods')
		const c = [...wrapper.children]
		c.forEach(i => i.remove())
		modalBasket.classList.toggle('active')
	})
	submit1?.addEventListener('click', () => {
	// const wrapper = document.querySelector('.modal-basket-goods')
	// const c = [...wrapper.children]
	// c.forEach(i => i.remove())
	modalBasket.classList.toggle('active')
})
basket?.addEventListener('click', handleModal1)
modalBasket?.addEventListener('click', e => {
	
	if (e.target === e.currentTarget) {
		const wrapper = document.querySelector('.modal-basket-goods')
		modalBasket.classList.toggle('active')
		const c = [...wrapper.children]
		c.forEach(i => i.remove())
	}
})

submit1?.addEventListener('click', sendMail)

async function sendMail(e) {
	e.preventDefault()
	const fields = document.querySelectorAll('.modal-form-field')
	const allImg = [...document.querySelectorAll('.modal-basket-goods-item img')]
	const data = {}
	fields.forEach(({ name, value }) => {
		if (!!value) {
			data[name] = value
		}
	})
	data.storage = JSON.parse(localStorage.getItem('storage'))
	// console.log(data);
	// const url = 'http://localhost:8080'
	// console.log(JSON.stringify(data))
	const res = await fetch('/api/mail', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	const result = await res.text()
	localStorage.setItem('basketUser', true)
	window.open('./index.html', '_self')
}

if (JSON.parse(localStorage.getItem('basketUser'))) {
	popupHandler()
}
async function createSlides(params) {
	const coffeeDiv = document.querySelector('#coffee .swiper-wrapper')
	const gigienaDiv = document.querySelector('#gigiena .swiper-wrapper')
	const homeGoodsDiv = document.querySelector('#homeGoods .swiper-wrapper')
	if (!coffeeDiv || !gigienaDiv || !homeGoodsDiv) return
	const data = await fetch('./data.json')
	const { coffee, gigiena, homeGoods } = await data.json()

	coffee.forEach(({ imgSrc, title, description, price }) => {
		coffeeDiv.insertAdjacentHTML(
			'beforeend',
			`
			<div class="prodcut__list-item swiper-slide">
				<img class="prodcut__list-img" src="${imgSrc}" alt="" />
				<h3 class="prodcut__list-title" data-descr='${description}'>
					${title}
				</h3>
				<h3 class="prodcut__list-title1" >
					${description}
				</h3>
				<div class="wrapper__price">
					<p class="wrapper__price-text">${price}</p>
					<button class="prodcut__list-link">
						хочу
					</button>
				</div>
			</div>`,
		)
	})
	gigiena.forEach(({ imgSrc, title, description, price }) => {
		gigienaDiv.insertAdjacentHTML(
			'beforeend',
			`
			<div class="prodcut__list-item swiper-slide">
				<img class="prodcut__list-img" src="${imgSrc}" alt="" />
				<h3 class="prodcut__list-title" data-descr='${description}'>
					${title}
				</h3>
				<h3 class="prodcut__list-title1" >
					${description}
				</h3>
				<div class="wrapper__price">
					<p class="wrapper__price-text">${price}</p>
					<button class="prodcut__list-link">
						хочу
					</button>
				</div>
			</div>`,
		)
	})
	homeGoods.forEach(({ imgSrc, title, description, price }) => {
		homeGoodsDiv.insertAdjacentHTML(
			'beforeend',
			`
			<div class="prodcut__list-item swiper-slide">
				<img class="prodcut__list-img" src="${imgSrc}" alt="" />
				<h3 class="prodcut__list-title" data-descr='${description}'>
					${title}
				</h3>
				<h3 class="prodcut__list-title1" >
					${description}
				</h3>
				<div class="wrapper__price">
					<p class="wrapper__price-text">${price}</p>
					<button class="prodcut__list-link">
						хочу
					</button>
				</div>
			</div>`,
		)
	})
}

createSlides()

const listCateg = document.querySelector('.category-list')
const listCategItem = document.querySelectorAll('.category-list-item')

listCategItem.forEach(item => {
	item.addEventListener('click', () => {
		handleModal()
	})
})

if (localStorage.getItem('storage')) {
	const basketNum = document.querySelector('.basket_num')
	const storage = JSON.parse(localStorage.getItem('storage'))
	basketNum.textContent = storage.length
}



document.querySelector('.modal-basket-goods').addEventListener('click', (e) => {
	e.target.parentElement.remove()

	// console.log(e.target.parentElement)
})