// const modal = document.querySelector('.modal')
// const close = document.querySelector('.close')
// const btnWonna = document.querySelector('.btn__wonna')
const submit = document.querySelector('.modal-form-submit')

// const handleModal = e => {
// 	modal.classList.toggle('active')
// }

// btnWonna.addEventListener('click', handleModal)
// close.addEventListener('click', handleModal)
// submit.addEventListener('click', handleModal)

const buyGoods = e => {
	const basketNum = document.querySelector('.basket_num')
	if (e.target.classList.contains('prodcut__list-link')) {
		const img = e.target.parentElement.parentElement.children[0].src
		basketNum.textContent = +basketNum.textContent + 1
		const storageItem = {
			id: basketNum.textContent,
			imgSrc: img,
		}
		const storage = JSON.parse(localStorage.getItem('user'))

		const t = storage.map(i =>{ 
			
		})
		const newStorage = [...storage, storageItem]
		localStorage.setItem('user', JSON.stringify(newStorage))
	}
}

const goods = document.querySelectorAll('.goods')
goods.forEach(item => {
	item.addEventListener('click', buyGoods)
})

localStorage.setItem('user', JSON.stringify([]))

const basket = document.querySelector('.basket_wrap')
const modalBasket = document.querySelector('.modal-basket')
const modalWrapperBasket = document.querySelector('.modal-basket-wrapper')
const close1 = document.querySelector('.close1')
const handleModal1 = e => {
	modalBasket.classList.toggle('active')
	const storage = JSON.parse(localStorage.getItem('user'))
	const wrapper = document.querySelector('.modal-basket-goods')
	storage.forEach(singleGood => {
		wrapper.insertAdjacentHTML(
			'afterbegin',
			`
                <div class="modal-basket-goods-item">
                        <img src="${singleGood.imgSrc}" alt="">
                        <div class="count">
                               
                                <p>0</p>
                               
                        </div>
                </div>`,
		)
	})
}
// console.log('object')
close1.addEventListener('click', handleModal1)
submit.addEventListener('click', handleModal1)
basket.addEventListener('click', handleModal1)

submit.addEventListener('click', sendMail)

async function sendMail(e) {
	e.preventDefault()
	const fields = document.querySelectorAll('.modal-form-field')
	const data = {}
	fields.forEach(({ name, value }) => {
		data[name] = value
	})
	const url = 'http://localhost:8080'
	console.log(JSON.stringify(data))
	const res = await fetch('/api/mail', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	const result = await res.text()
}
