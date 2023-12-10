import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import BootstrapTest from './BootstrapTest';
import styled from 'styled-components';
import { Button } from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// ? [144.1]
// * 1.1.0 Для начала импортируем CSS-стили Bootstrap, которые понадобятся в работе. Теперь мы сможем использовать CSS-классы из библиотеки Bootstrap, ну и все компоненты будут тоже отображаться.
// 1.1.1 Далее смотрим собственно документацию: {https://react-bootstrap.github.io/docs/} и берём нужные нам компоненты оттуда.
// 1.1.2 Ну и за что в первую очередь любят Bootstrap, так это за сетку, которая помогает быстро и красиво адаптировать сайт или приложение. Находим на сайте документации отдельную часть Layout -> Grid.
// 1.1.3 Создадим отдельный файл компонентов BootstrapTest.js, чтобы протестировать работу с библиотекой Bootstrap и перейдём в неё.
// todo [Перейдём в BootstrapTest.js]

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
    <BootstrapTest/>
  </StrictMode>
);