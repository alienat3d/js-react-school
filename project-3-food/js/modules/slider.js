// * Здесь, пользуясь примером других популярных библиотек-слайдеров, мы будем использовать деструктуризацию, передавать объект с настройками.
/* 
container = slider;
slide = sliderImages;
prevBtn = prevSlideBtn;
nextBtn = nextSlideBtn;
totalCounter = totalSlidesCounter;
currentCounter = currentSlideCounter;
wrapper = slidesWrapper;
field = slidesField;
*/
// ? В слайдерах может быть огромное количество параметров. Ещё могут передаваться настройки автопереключения, свайпа, драга и пр.
// * Теперь, когда мы использовали деструктуризацию, то в файле main.js мы можем в объекте настроек записывать все настройки в виде свойств-значений в абсолютно любом порядке.
function slider({container, slide, prevBtn, nextBtn, totalCounter, currentCounter, wrapper, field}) {
  const slider = document.querySelector(container),
    slidesWrapper = slider.querySelector(wrapper),
    slidesField = slidesWrapper.querySelector(field),
    sliderImages = slidesWrapper.querySelectorAll(slide),
    prevSlideBtn = slider.querySelector(prevBtn),
    nextSlideBtn = slider.querySelector(nextBtn),
    currentSlideCounter = slider.querySelector(currentCounter),
    totalSlidesCounter = slider.querySelector(totalCounter),
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

export default slider;