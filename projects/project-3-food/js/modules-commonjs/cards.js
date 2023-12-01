function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.RURexchangeRate = 98;
      this.convertToRUR();
    }

    convertToRUR() {
      this.price = +this.price * this.RURexchangeRate;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total">
              <span>${this.price}</span> ₽/день
            </div>
          </div>
        `;
      this.parent.append(element);
    }
  }

  const getData = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  };

  getData('http://localhost:3000/menu').then((data) =>
    data.forEach(({ img, altimg, title, descr, price }) =>
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    )
  );

  // * *==*  *==* * //
  // ? Доп. вариант динамического создания карточек с меню.
  /* getData('http://localhost:3000/menu').then((data) => createCard(data));
  
  data.forEach(({ img, altimg, title, descr, price }) => {
    const element = document.createElement('div');
  
    element.classList.add('menu__item');
  
    element.innerHTML = `
        <img src=${img} alt=${altimg}>
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total">
            <span>${price * 98}</span> ₽/день
          </div>
        </div>
      `;
  
    document.querySelector('.menu .container').append(element);
  }); */

  // * *==*  *==* * //
  // FIXME: Comment if don't need to use axios lib.
  // eslint-disable-next-line no-undef
  /* axios.get('http://localhost:3000/menu').then((response) => {
    response.data.forEach(({ img, altimg, title, descr, price }) =>
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    );
  }); */
}

module.exports = cards;