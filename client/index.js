if (localStorage.getItem('storage') === 'undefined') {
	localStorage.setItem('storage', JSON.stringify([]))
}

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
submit?.addEventListener('submit', async e => {
	e.preventDefault()
	const allField = document.querySelectorAll('#wonnaForm input')
	let data = {}
	allField.forEach(i => {
		data[i.name] = i.value
	})
	const res = await fetch('/api/mail', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	const result = await res.text()
	console.log(result);
})

const buyGoods = e => {
	const basketNum = document.querySelector('.basket_num')
	if (e.target.classList.contains('prodcut__list-link')) {
		const img = e.target.parentElement.parentElement.children[0].src
		const imgDetails = e.target.parentElement.parentElement.children[0].dataset.details
		const title = e.target.parentElement.parentElement.children[1].textContent
		const descr = e.target.parentElement.parentElement.children[2].innerHTML
		// console.log(e.target.parentElement.parentElement.children)
		basketNum.textContent = +basketNum.textContent + 1
		// console.log(e.target.parentElement.parentElement.children)
		const storageItem = {
			id: basketNum?.textContent,
			imgSrc: img,
			imgDetails,
			title,
			descr,
			qty: 1,
		}
		window.open('./singleProduct.html', '_self')
		localStorage.setItem('user', JSON.stringify(storageItem))
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
const basket = document.querySelector('.basket_wrap')
const modalBasket = document.querySelector('.modal-basket')
const modalWrapperBasket = document.querySelector('.modal-basket-wrapper')
const close1 = document.querySelector('.close1')
const handleModal1 = e => {
	modalBasket.classList.toggle('active')
	const storage = JSON.parse(localStorage.getItem('storage'))
	const wrapper = document.querySelector('.modal-basket-goods')
	const wrapperP = document.querySelector('.modal-basket-goods p')
	// wrapper.innerHTML = ''
	wrapperP?.remove()
	storage?.forEach(singleGood => {
		wrapper.insertAdjacentHTML(
			'afterbegin',
			`
			<div data-id='${singleGood.id}' class="modal-basket-goods-item">
			<img src="${singleGood.imgSrc}" alt="">
			<div class="count">
			
			<p>${singleGood.qty}</p>
			
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
	const area = document.querySelectorAll('.modal-form-textarea')
	const allImg = [...document.querySelectorAll('.modal-basket-goods-item img')]
	const data = {}
	fields.forEach(({ name, value }) => {
		if (!!value) {
			data[name] = value
		}
	})
	data.desc = area.value
	data.storage = JSON.parse(localStorage.getItem('storage'))
	data.completed = false
	// console.log(data);
	// const url = 'http://localhost:8080'
	// console.log(JSON.stringify(data))
	document.querySelector('.single').classList.add('hidden')
	document.querySelector('#loader-page').classList.add('active')

	const res1 = await fetch('/api/mail/admin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	const result1 = await res1.text()

	// console.log(result1,result);
	localStorage.setItem('basketUser', true)
	localStorage.setItem('storage', JSON.stringify([]))
	const tasks = await fetch('/api/tasks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	const resTasks = await tasks.json()
	// console.log(resTasks)
	document.querySelector('#loader-page').classList.remove('active')
	window.open('./index.html', '_self')
}

if (JSON.parse(localStorage.getItem('basketUser'))) {
	popupHandler()
}

async function createSlides() {
	const coffeeDiv = document.querySelector('#coffee .swiper-wrapper')
	const gigienaDiv = document.querySelector('#gigiena .swiper-wrapper')
	const homeGoodsDiv = document.querySelector('#homeGoods .swiper-wrapper')
	const thechDiv = document.querySelector('#thech .swiper-wrapper')
	if (!coffeeDiv || !gigienaDiv || !homeGoodsDiv || !thechDiv) return
	const data = await fetch('./data.json')
	const { coffee, gigiena, homeGoods, thech } = await data.json()

	coffee.forEach(({ imgSrc, title, description, price, imgDetails }) => {
		// const testD = decodeEntities(description)
		// console.log(testD);
		coffeeDiv.insertAdjacentHTML(
			'beforeend',
			`
			<div class="prodcut__list-item swiper-slide">
				<img class="prodcut__list-img" src="${imgSrc}" alt=""data-details="${imgDetails}" />
				<h3 class="prodcut__list-title" '>
					${title}
				</h3>
				<p class="product-hiden-text">${description}</p>
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
	thech.forEach(({ imgSrc, title, description, price, imgDetails }) => {
		// const testD = decodeEntities(description)
		// console.log(testD);
		thechDiv.insertAdjacentHTML(
			'beforeend',
			`
			<div class="prodcut__list-item swiper-slide">
				<img class="prodcut__list-img" src="${imgSrc}" alt=""data-details="${imgDetails}" />
				<h3 class="prodcut__list-title" '>
					${title}
				</h3>
				<p class="product-hiden-text">${description}</p>
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
	gigiena.forEach(({ imgSrc, title, description, price, imgDetails }) => {
		gigienaDiv.insertAdjacentHTML(
			'beforeend',
			`
			<div class="prodcut__list-item swiper-slide">
				<img class="prodcut__list-img" src="${imgSrc}" alt="" />
				<h3 class="prodcut__list-title" '>
					${title}
				</h3>
				<p class="product-hiden-text">${description}</p>
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
	homeGoods.forEach(({ imgSrc, title, description, price, imgDetails }) => {
		homeGoodsDiv.insertAdjacentHTML(
			'beforeend',
			`
			<div class="prodcut__list-item swiper-slide">
				<img class="prodcut__list-img" src="${imgSrc}" alt=""  />
				<h3 class="prodcut__list-title" '>
					${title}
				</h3>
				<p class="product-hiden-text">${description}</p>
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

document.querySelector('.modal-basket-goods').addEventListener('click', e => {
	// e.target.parentElement.remove()
	if (e.target.classList.contains('delete')) {
		const newStore = removeItem(e.target.parentElement.dataset.id)
		// console.log(newStore);
		localStorage.setItem('storage', JSON.stringify(newStore))
		// console.log(e.target.parentElement)
		const wrapper = document.querySelector('.modal-basket-goods')

		wrapper.innerHTML = ''
		newStore?.forEach(singleGood => {
			wrapper.insertAdjacentHTML(
				'afterbegin',
				`
			<div data-id='${singleGood.id}' class="modal-basket-goods-item">
			<img src="${singleGood.imgSrc}" alt="">
			<div class="count">
			
			<p>${singleGood.qty}</p>
			
			</div>
			<img src="./img/close.png" class="delete" alt="" />
			</div>`,
			)
		})
	}
})

function removeItem(itemId) {
	let storage = JSON.parse(localStorage.getItem('storage'))
	// Find the index of the item with the given id
	const itemIndex = storage.findIndex(item => item.id === itemId)
	if (itemIndex !== -1) {
		const item = storage[itemIndex]

		// Decrement qty by 1
		item.qty -= 1

		// If qty becomes 0, remove the item from the array
		if (item.qty === 0) {
			storage.splice(itemIndex, 1)
		}
		console.log(storage)
		// Display the updated array
		return storage
	}
}

const f = document.querySelector('#admin')

f?.addEventListener('keyup', function (e) {
	if (e.target.value.toLowerCase() === 'папа') {
		window.open('./tasks.html', '_self')
	}
})
