async function req() {
	const tasks = await fetch('/api/tasks', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const resTasks = await tasks.json()

	const wrapper = document.querySelector('#done')
	const wrapperNot = document.querySelector('#notDone')

	resTasks?.forEach((singleGood, ind) => {
		let storageList = ''
		// console.log(singleGood.address)
		singleGood.storage.forEach(item => {
			storageList += `<div class="tasks-item-good-el">
                            <img src="${item.imgSrc}" alt="">
                            <p>к-сть: ${item.qty}</p>
                        </div>`
		})
		if (singleGood.completed) {
			wrapper.insertAdjacentHTML(
				'beforeend',
				`
			<div class="tasks-item">
                    <div class="tasks-item-num">${++ind}</div>
                    <div class="tasks-item-names">${singleGood.name || '-'}</div>
                    <div class="tasks-item-phone">${singleGood.phone || '-'}</div>
                    <div class="tasks-item-mail">${singleGood.mail || '-'}</div>
                    <div class="tasks-item-address">${singleGood.desc ? singleGood.desc : '-'}</div>
                    <div class="tasks-item-good">
                        ${storageList}
                    </div>
                    <div> <input type="checkbox" class="toggle-completed-checkbox" data-task-id="${singleGood._id}" ${singleGood.completed ? 'checked' : ''}></div>
                </div>`,
			)
		} else {
			wrapperNot.insertAdjacentHTML(
				'beforeend',
				`
			<div class="tasks-item">
                    <div class="tasks-item-num">${++ind}</div>
                    <div class="tasks-item-names">${singleGood.name} </div>
                    <div class="tasks-item-phone">${singleGood.phone}</div>
                    <div class="tasks-item-address">${singleGood.desc ?  singleGood.desc : '-'}</div>
                    <div class="tasks-item-good">
                        ${storageList}
                    </div>
                    <div> <input type="checkbox" class="toggle-completed-checkbox" data-task-id="${singleGood._id}" ${singleGood.completed ? 'checked' : ''}></div>
                </div>`,
			)
            
        }
	})

	// console.log(resTasks);

	const inputs = document.querySelectorAll('.toggle-completed-checkbox')
	inputs?.forEach(checkbox => {
		checkbox.addEventListener('change', event => {
			const taskId = event.target.getAttribute('data-task-id')
			toggleTaskCompleted(taskId, event.target)
		})
	})
}

req()
// Function to toggle the task's completed status
async function toggleTaskCompleted(taskId, checkbox) {
	try {
		const response = await fetch(`/api/tasks/${taskId}/toggle-completed`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error('Failed to toggle task completion')
		}

		const updatedTask = await response.text()
		console.log('Task toggled successfully:', updatedTask)
		// Update the checkbox's checked state based on the server response
		// checkbox.checked = updatedTask.completed;
	} catch (error) {
		console.error('Error toggling task completion:', error)
		// Revert checkbox state if there's an error
		// checkbox.checked = !checkbox.checked;
	}
}

// function goBack() {
// 	history.back()
// }

// const btnBack = document.querySelector('.go-back')
// btnBack.addEventListener('click', goBack)

const btnsTabs = document.querySelectorAll('.tabs-tasks-btn')

btnsTabs.forEach(item => {
	item.addEventListener('click', e => {
		const attr = e.currentTarget.dataset.id
		const allDiv = document.querySelectorAll('.task-wrapper')
        const b = document.querySelector('.tabs-tasks-btn.active')
        b?.classList.remove('active')

       item.classList.add('active')
		allDiv.forEach(i => {
			if (i.id === attr) {
				// console.log('object')
				i.classList.add('active')
			} else {
				i.classList.remove('active')
			}
		})
	})
})
