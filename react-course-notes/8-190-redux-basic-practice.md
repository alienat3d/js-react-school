*[Основные принципы Redux — Практика (190)]*

? 190.0 Здесь мы уже рассмотрим основные принципы работы «Redux» на практике, чтобы понять как он работает изнутри. Рассмотрим каждую сущность стейт-менеджера, что мы называли в прошлом уроке по теории, как они устроены и для чего нужны. И начнём мы с обычного Vanilla JS, чтобы также убедиться, что применять эту библиотеку можно не только с React, а в целом можно применять где угодно. Вначале код у нас будет упрощённым для лучше понимания принципов работы. Мы создадим приложение простого счётчика и рассмотрим особенности работы Redux: [\projects\mini-projects\redux-playground\src\index.js]

|===:===:===:===>
**links**

* (EN Документация «Redux»): https://redux.js.org/
* (EN Документация «Redux Toolkit»): https://redux-toolkit.js.org/
* (EN Документация «React Redux»): https://react-redux.js.org/
* (EN Схема из документации): https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif
* (EN Документация «MobX»): https://mobx.js.org/readme.html
* (Redux Dev Tools): https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru