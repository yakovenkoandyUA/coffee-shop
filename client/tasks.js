
async function req () {

    const tasks = await fetch('/api/tasks', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	
	})
    const resTasks = await tasks.json()
    
    const wrapper = document.querySelector('.task-wrapper')

    resTasks?.forEach((singleGood, ind) => {
        let storageList = ''
        console.log(singleGood)
        singleGood.storage.forEach(item => {
            storageList += `<div class="tasks-item-good-el">
                            <img src="${item.imgSrc}" alt="">
                            <p>к-сть: ${item.qty}</p>
                        </div>`
        })
		wrapper.insertAdjacentHTML(
			'beforeend',
			`
			<div class="tasks-item">
                    <div class="tasks-item-num">${++ind}</div>
                    <div class="tasks-item-names">${singleGood.name} ${singleGood.lastName}</div>
                    <div class="tasks-item-phone">${singleGood.phone}</div>
                    <div class="tasks-item-address">${singleGood.address}</div>
                    <div class="tasks-item-good">
                        ${storageList}
                    </div>
                    <div><input type="checkbox"></div>
                </div>`,
		)
	})
    
    // console.log(resTasks);
}

req()


// function goBack() {
// 	history.back()
// }

// const btnBack = document.querySelector('.go-back')
// btnBack.addEventListener('click', goBack)


