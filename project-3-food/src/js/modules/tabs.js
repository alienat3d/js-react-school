export const tabsFunc = () => {
  // 1. Получим: 1) все элементы "табы" меню, 2) контент, который к ним относится 3) и всю обёртку для использования делегирования. (А то ведь могут после нас ещё какие-то элементы меню добавиться и это необходимо учесть сразу.)
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabcontainer');

  // 2. Функция скрывающая все ненужные нам табы. Переберём наш псевдомассив через forEach().
  function hideTabContent() {
    // 2.1 Скроем контент у всех табов:
    tabsContent.forEach((content) => {
      content.style.display = 'none';
    });

    // 2.2 Уберём у всех табов модификатор класса "_active":
    tabs.forEach((tab) => {
      tab.classList.remove('tabheader__item_active');
    });
  }
  // 3. Функция будет показывать нам контент таба, по которому кликнул юзер.
  // 3.1.1 Здесь нужно понимать к какому элементу мы обращаемся и этот номер мы будем передавать в функцию как аргумент "index".
  // 3.1.2 Т.к. логично показывать при загрузки страницы первый слайд, то стандартным значением укажем 0, т.е. первый элемент коллекции.
  // 3.2 Не забудем добавить и класс активности.
  function showTabContent(index = 0) {
    tabsContent[index].style.display = 'block';
    tabs[index].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent(); 
};
