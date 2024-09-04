const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const btnWonna = document.querySelector('.btn__wonna')
const submit = document.querySelector('.modal-form-submit')

const handleModal = e => {
	modal.classList.toggle('active')
}

btnWonna.addEventListener('click', handleModal)
close.addEventListener('click', handleModal)
submit.addEventListener('click', handleModal)

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
                                <button class="count__btn">-</button>
                                <p>0</p>
                                <button class="count__btn">+</button>
                        </div>
                </div>`,
		)
	})
}
console.log('object');
close1.addEventListener('click', handleModal1)
submit.addEventListener('click', handleModal1)
basket.addEventListener('click', handleModal1)
