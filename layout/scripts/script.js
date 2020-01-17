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
