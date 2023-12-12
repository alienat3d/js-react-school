import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import MarvelService from './services/MarvelService';

import './style/style.scss';

// ? [148.2] (предыдущая часть services/MarvelService.js)
// * 1.1.3 Создание нового экземпляра класса. Вспомним, чтобы работать с классами на требуется создать их экземпляр.
const marvelService = new MarvelService();
// 1.1.4 Теперь, когда у нас в marvelService потомок класса MarvelService, мы можем обратиться к переменной и запустить метод getAllCharacters(), который будет принимать аргумент res и выводить в консоль этот результат.
// marvelService.getAllCharacters().then(res => console.log(res));
// 1.1.5 Отлично, мы получили данные с Marvel API! То, что нас интересует находится в data -> results: {}
// ? 1.1.6 Но ведь у нас в вёрстке всего 9 персонажей, а остальные будут подгружаться только по клику на кнопке "load more". Для этого в самом API есть опция "limit", там мы укажем 9, а в "offset" укажем сколько персонажей мы пропустим.
// todo [перейдём в MarvelService.js]
// * 1.2.1 Теперь мы вызовем метод getCharacter с id определённого персонажа.
// marvelService.getCharacter(1011052).then(res => console.log(res));
// 1.2.2 Или теперь выведем определённую информацию. Сперва обратимся к массиву results внутри объекта data. Дальше т.к. это массив, то мы можем использовать метод forEach(), чтобы перебрать каждый из объектов внутри. Теперь у нас выведутся только имена персонажей.
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);