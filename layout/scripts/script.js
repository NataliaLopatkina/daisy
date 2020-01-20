// Scroll slider

function scrollTop(button, el) {
    const scrollBlock = document.querySelector('.' + el);
    const scrollButton = document.querySelector('.' + button);
    const top = scrollBlock.offsetTop - 44;

    scrollButton.addEventListener('click', ()=> {
        event.preventDefault();
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        })
    })
}
   
scrollTop('hero__button-slider', 'advantages');
scrollTop('advantages__button-slider', 'hero--expand');
scrollTop('hero__button-expand', 'steps');
scrollTop('steps__button-slider', 'areas');
scrollTop('area__button-slider--landing', 'area--advertising');
scrollTop('area__button-slider--advertising', 'area--marketing');
scrollTop('area__button-slider--marketing', 'portfolio');
scrollTop('portfolio__button-slider', 'team');
scrollTop('team__button-slider', 'reviews');

// Filter

class Filter {
    constructor(){
        this.init();
    }

    init() {
        const buttonsList = document.querySelectorAll('.portfolio-toggles__button');

        buttonsList.forEach((item)=> {
            item.addEventListener('click', ()=> {
                const currentTargetData = event.target.dataset.button;
                this.filterProducts(currentTargetData);

                buttonsList.forEach((item) => {
                    if (item.classList.contains('is-active')) {
                        item.classList.remove('is-active');
                    }
                    
                    const currentTarget = event.target;
                    currentTarget.classList.add('is-active');
                })
            })
        })   
    }

    filterProducts(category) {
        const filterElements = document.querySelectorAll('.portfolio-list__item');
        const activeFilterElements = document.querySelectorAll(`[data-work='${category}']`);

        if (category !== 'All') {
            filterElements.forEach((item) => {
                item.classList.add('not-active')
            })

            activeFilterElements.forEach((item) => {
                item.classList.remove('not-active');
            })
        } else {
            filterElements.forEach((item) => {
                item.classList.remove('not-active')
            })
        }   
    }
}

const filter = new Filter();

// Slider

class Slider {
    constructor() {
        this.animation = false;
        this.slideIndex = 0;
        this.sliderList = document.querySelector('.reviews__list');
        this.sliderItem = document.querySelectorAll('.review');
        this.translatePosition = -(100 / (this.sliderItem.length + 2)) + '%';
        this.translatePositionLast = -this.sliderItem.length * (100 / (this.sliderItem.length + 2)) + '%';                                                 
        
        this.dublicateSlides();
        this.init();
    }

    init() {
        const controlNext = document.querySelector('.controls__button--next');
        const controlPrev = document.querySelector('.controls__button--prev');

        controlNext.addEventListener('click', ()=> {
            this.scrollToNext()
        })

        controlPrev.addEventListener('click', ()=> {
            this.scrollToPrev();
        })
    }

    dublicateSlides() {
        const children = this.sliderList.children;
        const cloneElementFirst = children[0].cloneNode(true);
        const cloneElementLast = children[this.sliderItem.length - 1].cloneNode(true);

        this.sliderList.insertBefore(cloneElementLast, children[0]);
        this.sliderList.appendChild(cloneElementFirst);

        this.calcWidth();
        this.changePosition(this.translatePosition);
    }

    addAnimation() {
        this.sliderList.classList.add('transition');
    }

    removeAnimation() {
        this.sliderList.classList.remove('transition');
    }

    calcWidth() {
        this.sliderList.style.width = (this.sliderItem.length + 2) * 100 + '%';
    }

    changePosition(translatePosition) {
        this.sliderList.style.transform = 'translateX(' + translatePosition + ')';
    }

    translateScroll() {
        const translateScroll = (-(this.slideIndex + 1) * (100 / (this.sliderItem.length + 2))) + '%';
        this.sliderList.style.transform = 'translateX(' + translateScroll + ')';
    }

    scrollToNext() {

        if(this.animation) {
            return;
        }

        this.animation = true;
        this.slideIndex ++;

        this.addAnimation();

        if (this.slideIndex > this.sliderItem.length - 1) {
            setTimeout(()=> {
                this.removeAnimation();
                this.calcWidth();
                this.slideIndex = 0;
                this.changePosition(this.translatePosition);
                this.animation = false;
            }, 1000)

            this.translateScroll();

        } else {
            this.translateScroll();

            setTimeout(() => {
                this.animation = false;
            }, 1000)
        }
    }

    scrollToPrev() {

        if (this.animation) {
            return;
        }

        this.animation = true;
        this.slideIndex--;

        this.addAnimation();

        if (this.slideIndex < 0) {
            setTimeout(() => {
                this.removeAnimation();
                this.calcWidth();
                this.slideIndex = this.sliderItem.length - 1;
                this.changePosition(this.translatePositionLast);
                this.animation = false;
            }, 1000)

            this.translatePosition();
            
        } else {
            this.translateScroll();
            setTimeout(() => {
                this.animation = false;
            }, 1000)
        }
    }
}

const slider = new Slider();
