function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((content) => {
      content.classList.add('hide');
      content.classList.remove('show', 'fade');
    });

    tabs.forEach((tab) => tab.classList.remove(activeClass));
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add(activeClass);
  }

  tabsParent.addEventListener('click', (evt) => {
    const target = evt.target;

    // Чтобы не было ошибки нужно не забыть убрать точку методом slice(1).
    // if (target && target.classList.contains('tabheader__item')) {
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((tab, index) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();
}

export default tabs;