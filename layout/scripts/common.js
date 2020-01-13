console.log("I'm Mishka");

// Слайдер отзывов

if (document.querySelectorAll(".review").length > 0) {
    var animation = false;
    var sliderList = document.querySelector(".reviews__list");
    var sliderItem = document.querySelectorAll(".review");
    var slidePrev = document.querySelector(".reviews__arrow--left");
    var slideNext = document.querySelector(".reviews__arrow--right");
    var slideIndex = 0;
    var children = sliderList.children;
    var cloneElementFirst = children[0].cloneNode(true);
    var cloneElementLast = children[sliderItem.length - 1].cloneNode(true);

    slidePrev.onclick = scrollToPrev;
    slideNext.onclick = scrollToNext;
    sliderList.style.width = sliderItem.length * 100 + "%";
    sliderList.insertBefore(cloneElementLast, children[0]);
    sliderList.appendChild(cloneElementFirst);
    sliderList.style.width = (sliderItem.length + 2) * 100 + "%";
    var translatePosition = -(100 / (sliderItem.length + 2)) + "%";
    sliderList.style.transform = "translateX(" + translatePosition + ")";

    function scrollToNext() {
        if (animation) {
            return;
        }

        animation = true;

        slideIndex++;
        sliderList.classList.add("transition");

        if (slideIndex > sliderItem.length - 1) {
            setTimeout(function () {
                sliderList.classList.remove("transition");
                sliderList.style.width = (sliderItem.length + 2) * 100 + "%";
                slideIndex = 0;
                sliderList.style.transform = "translateX(" + translatePosition + ")";
                animation = false;
            }, 1000)
        }

        var translateScroll = (-(slideIndex + 1) * (100 / (sliderItem.length + 2))) + "%";
        sliderList.style.transform = "translateX(" + translateScroll + ")";

        setTimeout(function () {
            animation = false;
        }, 1000)
    }

    function scrollToPrev() {
        if (animation) {
            return;
        }

        animation = true;

        slideIndex--;
        sliderList.classList.add("transition");

        if (slideIndex < 0) {
            setTimeout(function () {
                sliderList.classList.remove("transition");
                sliderList.style.width = (sliderItem.length + 2) * 100 + "%";
                slideIndex = sliderItem.length - 1;
                var translatePositionLast = -sliderItem.length * (100 / (sliderItem.length + 2)) + "%";
                sliderList.style.transform = "translateX(" + translatePositionLast + ")";
                animation = false;
            }, 1000)
        }

        var translateScroll = (-(slideIndex + 1) * (100 / (sliderItem.length + 2))) + "%";
        sliderList.style.transform = "translateX(" + translateScroll + ")";

        setTimeout(function () {
            animation = false;
        }, 1000)
    }
}

// Открытие/закрытие поле поиска

if (document.querySelectorAll(".main-navigation__form".length > 0)) {
    var fieldSearch = document.querySelector(".main-navigation__field");
    var buttonSearch = document.querySelector(".main-navigation__search");

    toggleSearch = () => {
        fieldSearch.classList.toggle("active");
    }

    buttonSearch.addEventListener("click", event => {
        event.stopPropagation();
        toggleSearch();
    });

    document.addEventListener("click", e => {
        var target = event.target;
        var its_fieldSearch = target == fieldSearch || fieldSearch.contains(target);
        var its_buttonSearch = target == buttonSearch;
        var fieldSearch_is_active = fieldSearch.classList.contains("active");

        if (!its_fieldSearch && !its_buttonSearch && fieldSearch_is_active) {
            toggleSearch();
        }
    })
}

// Open/close modal window

if (document.querySelectorAll(".modal-order").length > 0) {
    var modalWindow = document.querySelector(".modal-order");
    var buttonOpen = document.querySelector(".button--order");
    var modalWindowContent = document.querySelector(".modal-order__content");

    buttonOpen.addEventListener("click", function() {
        modalWindow.classList.add("active");
    })

    document.addEventListener("click", e => {
        var target = event.target;
        var itsModalWindow = target == modalWindowContent || modalWindowContent.contains(target);
        var itsButtonOpen = target == buttonOpen;

        if (!itsModalWindow && !itsButtonOpen && modalWindowContent) {
            modalWindow.classList.remove("active");
        }
    })
}

// Open/close menu

if (document.querySelectorAll(".header").length > 0) {
    var navList = document.querySelectorAll(".main-navigation__list");
    var buttonMenu = document.querySelector(".header__menu");

    function toggleMenu () {
        buttonMenu.addEventListener("click", function () {
            if (buttonMenu.classList.contains("header__menu--opened")) {
                navList.forEach(function (item) {
                    item.classList.add("main-navigation__list--active");
                    buttonMenu.classList.remove("header__menu--opened");
                    buttonMenu.classList.add("header__menu--closed");
                })
            }

            else if (buttonMenu.classList.contains("header__menu--closed")) {
                navList.forEach(function (item) {
                    item.classList.remove("main-navigation__list--active");
                    buttonMenu.classList.add("header__menu--opened");
                    buttonMenu.classList.remove("header__menu--closed");
                })
            }
        })
    }

    toggleMenu();

    window.addEventListener("resize", function() {
        toggleMenu();
    })
}
