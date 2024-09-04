function scrollParallax() {
    if(window.scrollY > window.innerHeight) return
    const target = document.querySelectorAll('.table-scroll-item')
    const scaleItem = document.querySelector('.table-scale-item')
    const scaleItem1 = document.querySelector('.table-scale-item1')

    let posScale = window.scrollY * scaleItem.dataset.rate
    let posScale1 = window.scrollY * scaleItem1.dataset.rate
    // scaleItem.style.width = '100px'
    scaleItem.style.transform = `perspective(300px) translateX(-50%) translateY(${posScale}px)`
    scaleItem1.style.transform = `perspective(300px)  translateZ(${-posScale1}px)`
    target.forEach(item => {
        let pos = window.scrollY * item.dataset.rate
        if(item.dataset.direction === 'vertical') {
            item.style.transform = `translate3d(0px, ${pos}px, 0px)`
        } else {
            let posX = window.scrollY * item.dataset.ratex
            let posY = window.scrollY * item.dataset.ratey
            
            item.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`
        }
    })
}

window.addEventListener('scroll', scrollParallax)

//! SIMPLE PARALLAX


const paralax = (elem, distance, speed) => { 
    const item = document.querySelector(elem)
    item.style.transform = `translateY(${distance * speed}px)`

 }

 window.addEventListener('scroll', () => {
    // paralax('.cool', window.scrollY, -1)
 })


