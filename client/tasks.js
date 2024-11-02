
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
        // console.log(singleGood.address)
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
                    <div> <input type="checkbox" class="toggle-completed-checkbox" data-task-id="${singleGood._id}" ${singleGood.completed ? 'checked' : ''}></div>
                </div>`,
		)
	})
    
    // console.log(resTasks);
}

req()

const inputs = document.querySelectorAll('.toggle-completed-checkbox') 
inputs.forEach(checkbox => {
	checkbox.addEventListener('change', event => {
		const taskId = event.target.getAttribute('data-task-id')
		toggleTaskCompleted(taskId, event.target)
	})
})


// Function to toggle the task's completed status
async function toggleTaskCompleted(taskId, checkbox) {
    try {
        const response = await fetch(`/tasks/${taskId}/toggle-completed`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to toggle task completion');
        }

        const updatedTask = await response.json();
        console.log('Task toggled successfully:', updatedTask);
        // Update the checkbox's checked state based on the server response
        checkbox.checked = updatedTask.completed;
    } catch (error) {
        console.error('Error toggling task completion:', error);
        // Revert checkbox state if there's an error
        checkbox.checked = !checkbox.checked;
    }
}

// function goBack() {
// 	history.back()
// }

// const btnBack = document.querySelector('.go-back')
// btnBack.addEventListener('click', goBack)


