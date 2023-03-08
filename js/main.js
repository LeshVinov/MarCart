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

const sliderBlock = document.querySelector('.hero')
const slides = document.querySelectorAll('.hero-slider__item')
const dots = document.querySelectorAll('.hero-slider-dots__item')

const sliderFunc = () => {
   
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

try {
    if (!sliderBlock) {
        throw new Error('Верните слайдер')
        
    }
    if (document.body.clientWidth>768){
        sliderFunc()
    } 
} catch(error) {
    console.log(error.message);
}


// end Slider ------------------------------------------------------------------------

// sending form ----------------------------------------------------------------------

const form = document.getElementById('contact_form')
const statusBlock = document.createElement('div')
const loadText = 'Загрузка...'
const errorText = 'Ошибка...'
const validateErrorText = 'Поля заполнены неправильно!'
const successText = 'Спасибо, наш менеджер с вами свяжется!'

statusBlock.classList.add('contact-form__status')

const validate = (formElements) => {
    let success = true

    formElements.forEach(input => {
        if (input.name == 'contact-form_Name') {
             if (input.value === '') {
                 success = false
             } else if (input.value.match(/[^а-яА-Я\^a-zA-Z\s]/g)) {
                 success = false
             }
         } else if (input.name == 'contact-form_Phone') {
             if (input.value === '') {
                 success = false
             } else if (input.value.match(/[^0-9\(\)\+\-]/g)) {
                 success = false
             }
         } 
     })



    return success
}

const sendData = (data) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

const submitForm = () =>{
    const formElements = form.querySelectorAll('.input')
    const formData = new FormData(form)
    const formBody = {}

    statusBlock.textContent = loadText
    form.append(statusBlock)

    formData.forEach((val, key) => {
        formBody[key] = val
    })

    if (validate(formElements)) {
        sendData(formBody)
        .then(data => {
            statusBlock.textContent = successText

            formElements.forEach(input => {
                input.value = ''
            })
            setTimeout(() => {
                statusBlock.remove()
            }, 3000)
            console.log(data);
        })
        .catch(error => {
            statusBlock.textContent = errorText
            
        })
    } else {
        formElements.forEach(input => {
            input.value = ''
        })
        statusBlock.textContent = validateErrorText
        setTimeout(() => {
            statusBlock.remove()
        }, 3000)
    }
}

try {
    if (!form) {
        throw new Error('Верните форму')
        
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        submitForm()
    })
} catch(error) {
    console.log(error.message);
}
