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
        this.widthItem = 100 / (this.sliderItem.length + 2) + '%';                                                 
        
        this.dublicateSlides();
        this.init();
    }

    init() {
        this.addWidthItem();

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

        cloneElementFirst.style.width = this.widthItem;
        cloneElementLast.style.width = this.widthItem;

        this.addWidthList();
        this.changePosition(this.translatePosition);
    }

    addWidthItem() {

        this.sliderItem.forEach((item)=> {
            item.style.width = this.widthItem;
        })
    }

    addAnimation() {
        this.sliderList.classList.add('transition');
    }

    removeAnimation() {
        this.sliderList.classList.remove('transition');
    }

    addWidthList() {
        const widthList = (this.sliderItem.length + 2) * 100 + '%';
        this.sliderList.style.width = widthList;
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
                this.addWidthList();
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
                this.addWidthList();
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

// Open/close menu

class Menu {
    constructor() {
        this.menu = document.querySelector('.nav-small-device__menu');
        this.buttonMenu = document.querySelector('.button-menu');
        this.menuList = document.querySelector('.nav-small-device__list');

        this.toggleMenu();
    }

    toggleMenu() {
        this.buttonMenu.addEventListener('click', ()=> {
            if (this.menu.classList.contains('is-active')) {
                this.menu.classList.remove('is-active');
                this.buttonMenu.classList.remove('button-menu--closed');
                this.menu.style.height = 0;
            } else {
                this.menu.classList.add('is-active');
                this.buttonMenu.classList.add('button-menu--closed');
                this.addHeight();
            }
        }) 
    }

    addHeight() {
        const heightMenu = this.menuList.offsetHeight;
        this.menu.style.height = heightMenu + 'px';
    }
}

const menu = new Menu();
