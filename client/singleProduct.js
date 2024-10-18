const items = JSON.parse(localStorage.getItem('user'))
// console.log(items)

const single = document.querySelector('.single')

single.insertAdjacentHTML(
	'afterbegin',
	`			<div>
	
	<img class="single__img" src="${items.imgSrc}" alt="img">
	<button class="prodcut__list-link">хочу</button>
	</div>
				<div class="single__info">
					<h2 class="single__title">${items.title}</h2>
					<p class="single__descr">${items.descr}</p>
				</div>`,
)

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
	basketNum.textContent = +basketNum.textContent + 1
	const storage = JSON.parse(localStorage.getItem('storage'))
	if (!storage) {
		localStorage.setItem('storage', JSON.stringify([items]))
	} else {
		const res = reducedItems(storage, items)
		localStorage.setItem('storage', JSON.stringify(res))
	}
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
