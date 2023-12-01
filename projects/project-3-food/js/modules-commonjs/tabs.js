function tabs() {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabcontainer');

  function hideTabContent() {
    tabsContent.forEach((content) => {
      content.classList.add('hide');
      content.classList.remove('show', 'fade');
    });

    tabs.forEach((tab) => tab.classList.remove('tabheader__item_active'));
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add('tabheader__item_active');
  }

  tabsParent.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target && target.classList.contains('tabheader__item')) {
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

module.exports = tabs;