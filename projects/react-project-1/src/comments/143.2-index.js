import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from '../App';
import styled from 'styled-components';
import { Button } from '../App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// ? [143.2]
// * 1.2.1 Итак, сперва мы импортируем кнопку, а потом вставляем в нужное нам место.
// * 1.3.0 Но что, если к такому компоненту, который где-то сохранён нам нужно добавить другие стили? Здесь приходит на помощь возможность наследования стилей из другого компонента. 
// 1.3.1 Итак, у нас есть кнопка, к которой нужно добавить другое стили, для этого создаём новую переменную BigButton. И для того, чтобы переназначить какие-то стили можно использовать функцию styled() и аргументов в неё передаём компонент Button.
// * 1.4 А что, если нам нужно, чтобы этот элемент перестал быть тегом button, а например ссылкой? Тогда мы просто добавим атрибут as="название нового тега".
// todo [перейдём в App.js]
const BigButton = styled(Button)`
  border-radius: 15px;
  padding: 4px 10px;
  max-width: 200px;
  text-align: center;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App/>
    <BigButton>CLICK ME</BigButton>
    <BigButton as='a' href='www.google.com'>I’m a link now!</BigButton>
  </StrictMode>
);