const slider = document.querySelector('.section-activity__slider');
const slidesContainer = slider.querySelector('.section-activity__slides');
const slides = slider.querySelectorAll('.section-activity__slide');
const prevButton = document.getElementById('slider-back');
const nextButton = document.getElementById('slider-next');
let currentIndex = 0;
let slideWidth = 0;
let slidesToShow = 3;
let slidesgap = 0;


function showSlide(index) {
    const offset = -index * (slideWidth);
    slidesContainer.style.transform = `translateX(${offset}px)`;
}

function prevSlide() {
    currentIndex = (currentIndex - slidesToShow + slides.length) % (slides.length - slidesToShow + 1);
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % (slides.length - slidesToShow + 1);
    showSlide(currentIndex);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

function updateSlideWidth() {
    slideWidth = slides[0].offsetWidth + slidesgap;
    showSlide(currentIndex);
}

function updateSlidesToShow() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 650) {
        slidesToShow = 1;
    } else if (windowWidth < 1020) {
        slidesToShow = 2;
    } else {
        slidesToShow = 3;
    }
    slidesgap = parseInt(getStyle(slides[0], "margin-right"));
    console.log("slidesgap: " + slidesgap);
    updateSlideWidth();
}

window.addEventListener('resize', updateSlidesToShow);

updateSlidesToShow();

function getStyle(e, styleName) {
    var styleValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
    } else if (e.currentStyle) {
        styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });
        styleValue = e.currentStyle[styleName];
    }
    return styleValue;
}