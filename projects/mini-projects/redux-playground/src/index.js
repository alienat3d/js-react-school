import React from 'react';
import {createRoot} from 'react-dom/client';
import {bindActionCreators, createStore} from 'redux';
import reducer from './reducer';
import * as actions from './actions';
import Counter from './components/Counter';

// 193.0 В этом уроке мы добавим React, чтобы потом соединить его с Redux.
// (Go to [/src/Counter.js])

const store = createStore(reducer);
const {dispatch, subscribe, getState} = store;

// 193.2.1 И этот тоже. ↓
// const update = () => document.getElementById('counter').textContent = getState().value;

// subscribe(update);

const {inc, dec, rnd} = bindActionCreators(actions, dispatch);

// 193.2.0 Этот функционал для работы с вёрсткой нам больше не нужен, т.к. мы будем использовать React-компонент.
/*document.getElementById('inc').addEventListener('click', inc);
document.getElementById('dec').addEventListener('click', dec);
document.getElementById('rnd').addEventListener('click', () => {
  const value = Math.floor(Math.random() * 10);
  rnd(value);
});*/

// 193.3 Здесь мы передадим компоненту Counter пару пропсов, во-первых, получение актуального стейта с помощью метода store "getState" (важно, что именно её вызов, т.к. нам нужно получить значение стейта, а не саму функцию в компонент), а также не забудем добавить через "." название свойства "value", где у нас хранится значение счётчика. А ещё передадим все три экшена, однако третий "rnd" у нас будет чуть усложнён, т.к. нам нужно передавать в payload сгенерированное число для него.
// 193.4.0 Осталась ещё одна вещь, хотя счётчик уже работает, но React ещё не знает, когда ему обновлять компоненты. Когда мы использовали метод сохранения стейта setState или хук «useState», то там это происходило автоматически — когда менялся стейт, то запускался ререндер компонента. Здесь мы можем это сделать с помощью метода "subscribe". Напоминаем, что это как бы "слушатель store", который запускает какую-то функцию, когда в store изменился стейт. До этого у нас была функция "update", которая запускалась, когда шло изменение стейта. И вот мы можем обернуть весь "root.render" в функцию "update".
// ! 193.4.1 В настоящих проектах так делать не надо, но мы сделали здесь так для примера, что это будет работать.
const container = document.getElementById('root');
const root = createRoot(container);
// 193.4.2 Теперь, всякий раз, когда будет изменяться стейт — запустится функция update, которая будет ререндерить приложение с обновлённым данными.
const update = () => {
  root.render(
    <React.StrictMode>
      <Counter count={getState().value}
               inc={inc}
               dec={dec}
               rnd={() => {
                 const value = Math.floor(Math.random() * 10);
                 rnd(value);
               }}/>
    </React.StrictMode>,
  );
}

// 193.4.3 И нам нужно один раз запустить эту функцию вручную, иначе у нас будет показывать пустая страница.
// 193.4.4 И вот, у нас уже компонент Реакта работает с одним глобальным стейтом Redux. А вообще, Redux можно использовать не только с нативным JS или React, но и в принципе с любой библиотекой или фреймворком, отвечающим за UI (или часть View на схеме Redux).
// 193.5 А теперь создадим более привычную структуру Реакт-приложения с App и нормальной архитектурой.
update();
subscribe(update);