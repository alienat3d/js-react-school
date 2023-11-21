function slider() {
  const slider = document.querySelector('.offer__slider'),
    slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
    slidesField = slidesWrapper.querySelector('.offer__slider-inner'),
    sliderImages = slidesWrapper.querySelectorAll('.offer__slide'),
    prevSlideBtn = slider.querySelector('.offer__slider-prev'),
    nextSlideBtn = slider.querySelector('.offer__slider-next'),
    currentSlideCounter = slider.querySelector('#current'),
    totalSlidesCounter = slider.querySelector('#total'),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;

  const indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('carousel-indicators');

  slider.append(indicators);

  const settingActiveDot = () => {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = 1;
  };

  const addingZero = (element, number) => {
    if (sliderImages.length < 10) { element.textContent = `0${number}`; }
    else { element.textContent = number; }
  };

  const getDigitsOnly = (str) => +str.replace(/\D/g, '');

  for (let index = 0; index < sliderImages.length; index++) {
    const dot = document.createElement('li');

    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', index + 1);

    if (index === 0) { dot.style.opacity = 1; }

    indicators.append(dot);
    dots.push(dot);
  }

  addingZero(totalSlidesCounter, sliderImages.length);
  addingZero(currentSlideCounter, slideIndex);

  if (sliderImages.length < 10) {
    totalSlidesCounter.textContent = `0${sliderImages.length}`;
    currentSlideCounter.textContent = `0${slideIndex}`;
  } else {
    totalSlidesCounter.textContent = sliderImages.length;
    currentSlideCounter.textContent = slideIndex;
  }

  slidesField.style.width = 100 * sliderImages.length + '%';

  sliderImages.forEach((slide) => (slide.style.width = width));

  nextSlideBtn.addEventListener('click', () => {
    if (offset === getDigitsOnly(width) * (sliderImages.length - 1)) {
      offset = 0;
    } else {
      offset += getDigitsOnly(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === sliderImages.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    addingZero(currentSlideCounter, slideIndex);
    settingActiveDot();

    dots.forEach(dot => {
      dot.addEventListener('click', (evt) => {
        const slideTo = evt.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset = getDigitsOnly(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        addingZero(currentSlideCounter, slideIndex);
        settingActiveDot();
      });
    });
  });
  prevSlideBtn.addEventListener('click', () => {
    if (offset === 0) {
      offset = getDigitsOnly(width) * (sliderImages.length - 1);
    } else {
      offset -= getDigitsOnly(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = sliderImages.length;
    } else {
      slideIndex--;
    }

    addingZero(currentSlideCounter, slideIndex);
    settingActiveDot();
  });
}

module.exports = slider;