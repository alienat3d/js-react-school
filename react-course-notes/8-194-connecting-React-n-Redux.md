*[Соединяем React и Redux при помощи «connect» (194)]*

? 194.0 Продолжаем соединять React с Redux. И начнём мы с рассмотрения их соединения более старым способом с помощью метода «connect». Так их соединяли ещё в самом начале, когда Redux только появился. В дальнейшем мы уже перейдём на более современный способ — хуки, однако полезно знать оба способа. Ведь, помимо того, что нам могут попасться проекты с использованием метода «connect», а также это может быть случай, если мы используем классовые компоненты, вместо функциональных или у нас есть проблема с «зомби-дочерними компонентам» и в ещё пару других случаях. Также и тестирование приложения будет чуточку проще, когда мы используем подход с методом «коннект». И всё же использование хуков более современный, простой и рекомендуемый для новых проектов способ. Итак, перейдём к нашему мини-проекту счётчика: [\projects\mini-projects\redux-playground\src\index.js]

|===:===:===:===>
**links**

* (EN Документация «connect»): https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
* (EN Статья «useSelector vs. connect (react-redux)»): https://www.samdawson.dev/article/react-redux-use-selector-vs-connect
* (RU Статья «React-redux: просто о zombie children and stale props»): https://vadim-budarin.medium.com/react-%D0%BF%D0%BE%D0%BD%D1%8F%D1%82%D0%BD%D0%BE-%D0%BE-zombie-children-and-stale-props-d31247ea08