const modal = document.querySelector('.modal')
const modalWrapper = document.querySelector('.modal-wrapper')
const close = document.querySelector('.close')
const btnWonna = document.querySelector('.btn__wonna')
const submit = document.querySelector('.modal-form-submit')

const handleModal = e => {
   console.log(e);
        modal.classList.toggle('active')
}

btnWonna.addEventListener('click', handleModal)
close.addEventListener('click', handleModal)
submit.addEventListener('click', handleModal)

