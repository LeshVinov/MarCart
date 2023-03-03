// burger-menu -------------------------------------------------------------------------

const menuBtn = document.querySelector('.menu-btn')
const menuNav = document.querySelector('.header')
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuNav.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuNav.classList.remove('open');
        menuOpen = false;
    }
});

// end burger-menu----------------------------------------------------------------------

// slider ------------------------------------------------------------------------------

const sliderFunc = () => {
    const sliderBlock = document.querySelector('.hero')
    const slides = document.querySelectorAll('.hero-slider__item')
    
    const sliderButtonPrev = document.querySelector('.slider-button-prev')
    const sliderButtonNext = document.querySelector('.slider-button-next')
    
    const dots = document.querySelectorAll('.hero-slider-dots__item')
    
    const timeInterval = 3000
    
    let countSlider = 0
    let interval
    
    const prevSlide = (elems, index, strClass) => {
        elems[index].classList.remove(strClass)
    }
    
    const nextSlide = (elems, index, strClass) => {
        elems[index].classList.add(strClass)
    }
    
    const autoSLide = () => {
        prevSlide(slides, countSlider, 'hero-slider__item--active')
        prevSlide(dots, countSlider, 'hero-slider-dots__item--active')
        countSlider++
        sliderBlock.style.background = `url('./img/hero-bg-`+`${countSlider}`+`.jpg') no-repeat center / cover`
        if(countSlider >= slides.length) {
            countSlider = 0
        }
        sliderBlock.style.background = `url('./img/hero-bg-`+`${countSlider}`+`.jpg') no-repeat center / cover`

        nextSlide(slides, countSlider, 'hero-slider__item--active')
        nextSlide(dots, countSlider, 'hero-slider-dots__item--active')
    }
    
    const startSlide = (timer = 3000) => {
        interval = setInterval(autoSLide, timer)
    }
    
    const stopSlide = () => {
        clearInterval(interval)
    }
    
    sliderBlock.addEventListener('click', (e) => {   
        e.preventDefault()
    
        if(!e.target.matches('.hero-slider-dots__item, .hero-slider__button')) {
            return
        }
    
        prevSlide(slides, countSlider, 'hero-slider__item--active')
        prevSlide(dots, countSlider, 'hero-slider-dots__item--active')
    
        if (e.target.matches('#arrow-right')) {
            countSlider++
        } else if (e.target.matches('#arrow-left')) {
            countSlider--
        } else if (e.target.classList.contains('hero-slider-dots__item')) {
            dots.forEach((dot, index) => {
                if (e.target === dot) {
                    countSlider = index
                }
            })
        }
    
        if(countSlider >= slides.length) {
            countSlider = 0
        }
        if(countSlider < 0) {
            countSlider = slides.length-1
        }
        sliderBlock.style.background = `url('./img/hero-bg-`+`${countSlider}`+`.jpg') no-repeat center / cover`
    
        nextSlide(slides, countSlider, 'hero-slider__item--active')
        nextSlide(dots, countSlider, 'hero-slider-dots__item--active')
    })
    
    sliderBlock.addEventListener('mouseenter', (e) => {
            if (e.target.matches('.hero-slider-dots__item, .hero-slider__button')) {
            stopSlide()
        }
    }, true)
    sliderBlock.addEventListener('mouseleave', (e) => {
            if (e.target.matches('.hero-slider-dots__item, .hero-slider__button')) {
            startSlide(timeInterval)
        }
    }, true)
    
    
    startSlide(timeInterval)
}

if (document.body.clientWidth>768){
    sliderFunc()
} 

// endSlider -------------------------------------------------------------------------

// sending form ----------------------------------------------------------------------
