import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../App';

// * 1.0.0 Как будет выглядеть создание элемента на странице без помощи ReactDOM:
// 1.0.1 У объекта React есть специальный метод createElement(), в который передаётся как минимум 3 аргумента: 1) название элемента в вёрстке; 2) название CSS-класса (если нет, то надо указать "null"); 3) содержимое (контент).
// 1.0.2 Как видно из примера, всё работает, но создание элемента сложнее, чем было на первом примере.
// ? 1.0.3 Кстати в таком варианте JS напрямую отправит элемент в вёрстку, а Babel работать не будет. Т.к. именно Babel переводит JSX в JS, прежде чем отдать в вёрстку.
/* const elem = React.createElement('h2', {className: 'greetings'}, 'Hello World!'); */
// 1.0.4 Результатом работы метода React.createElement() будет (точнее его создание на этапе VirtualDOM, прежде, чем он попадёт в вёрстку в виде <h2 class="greetings">Hello World!</h2>):
/* const element = {
  type: 'h1', 
  props: {
    className: 'greetings',
    children: 'Hello World!'
  }
}; */
// * 1.1.0 Но в реальных проектах все пользуются конечно же синтаксисом JSX, чтобы быстро и комфортно работать.
// 1.1.1 Так записанный элемент называется react-элементом.
// const elem = <h2>Hello World!</h2>;
// ? 1.1.2 Это был простейший элемент, но он может быть и намного сложнее. И если у нас элемент имеет многострочную структуру, то его мы оборачиваем в ().
// ? 1.1.3 Ещё одно правило таких структур, когда мы создаём многострочный элемент — у него всегда должен быть 1 родитель.
// ? 1.1.4 Иногда нам требуется создать кнопки без контента, как в данном случае и тогда можно его закрывать, будто это самозакрывающийся элемент.
// ? 1.1.5 Если бы текст внутри заголовка h2 был бы переменной, то мы могли бы его переиспользовать. Для этого просто пропишем название переменной в {} в том теге, где мы хотим её использовать. Этот подход очень похож на интерполяцию в нативном JS, только с иным синтаксисом. И мы также можем внутри {} вставлять что угодно, переменные, математические операции, вызовы функций, методов, различные свойства объектов и т.д.
// ? 1.1.6 Однако следует помнить, что в {} нельзя передавать объекты. Т.к. React JS экранирует всё переводя в строчный тип данных из соображений безопасности.
const text = 'Hello World!',
  date = new Date(),
  weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  weekDayNum = date.getDay(),
  monthNum = date.getMonth();

let dateNum = date.getDate();

switch (dateNum) {
  case 1:
    dateNum += 'st';
    break;
  case 2:
    dateNum += 'nd';
    break;
  case 3:
    dateNum += 'rd';
    break;
  default:
    dateNum += 'th';
}

const elem = (
  <div>
    <h2>{text}</h2>
    <p>It says "{text}" in the title above.</p>
    <p className='what-day-is-it'>Today is {weekDayNames[weekDayNum]}. {dateNum} of {monthNames[monthNum]}.</p>
    <input type='text' />
    <label htmlFor=""></label>
    <button tabIndex={0}>Click me!</button>
    <button tabIndex='1'/>
  </div>
);

// * 1.2.0 Также особенность синтаксиса JSX в том, что атрибуты тегов всегда пишутся в формате camelCase, если они состоят из 2-ух и более слов. ↑
// * 1.2.1 Вторая особенность в том, что есть такие атрибуты, которые не совпадают по написанию с обычными, что уже есть в HTML, это: className и htmlFor. Это происходит потому, что "class" & "for" уже зарезервированы в JS для создания классов и циклов.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  elem
);