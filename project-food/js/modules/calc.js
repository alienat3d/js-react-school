// * Можно заметить, что в калькуляторе очень много разных селекторов и параметров. Да и калькуляторы очень редко похожи друг на друга, вряд ли придётся его переиспользовать, скорее всего проще будет переписать, используя этот за основу. Потому оставим его как есть.
function calc() {
  const result = document.querySelector('.calculating__result > span'),
    inputHeight = document.querySelector('#height'),
    inputWeight = document.querySelector('#weight'),
    inputAge = document.querySelector('#age');

  let gender, height, weight, age, ratio;

  if (localStorage.getItem('gender')) {
    gender = localStorage.getItem('gender');
  } else {
    gender = 'female';
    localStorage.setItem('gender', 'female');
  }
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }
  if (localStorage.getItem('height')) {
    height = localStorage.getItem('height');
    inputHeight.value = height;
  }
  if (localStorage.getItem('weight')) {
    weight = localStorage.getItem('weight');
    inputWeight.value = weight;
  }
  if (localStorage.getItem('age')) {
    age = localStorage.getItem('age');
    inputAge.value = age;
  }

  const calcTotal = () => {
    if (!gender || !height || !weight || !age || !ratio) {
      result.innerHTML = '<img class="calculating__no-data-img" src="./img/calc/no-data.gif" />';
      return;
    }

    if (gender === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  };

  const getStaticInfo = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      element.addEventListener('click', (evt) => {
        if (evt.target.getAttribute('data-ratio')) {
          ratio = +evt.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +evt.target.getAttribute('data-ratio'));
        } else {
          gender = evt.target.getAttribute('id');
          localStorage.setItem('gender', evt.target.getAttribute('id'));
        }

        elements.forEach(element => {
          element.classList.remove(activeClass);
        });

        evt.target.classList.add(activeClass);

        calcTotal();
      });
    });
  };

  const getDynamicInfo = (selector) => {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g || input.value === '')) {
        input.classList.add('input-error');
      } else {
        input.classList.remove('input-error');
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          localStorage.setItem('height', +input.value);
          break;
        case 'weight':
          weight = +input.value;
          localStorage.setItem('weight', +input.value);
          break;
        case 'age':
          age = +input.value;
          localStorage.setItem('age', +input.value);
          break;
      }

      calcTotal();
    });
  };

  const initLocalSettings = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      element.classList.remove(activeClass);

      if (element.getAttribute('id') === localStorage.getItem('gender')) {
        element.classList.add(activeClass);
      }
      if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        element.classList.add(activeClass);
      }
    });

    calcTotal();
  };

  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
}

export default calc;