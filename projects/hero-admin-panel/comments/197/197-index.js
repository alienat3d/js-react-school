import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/App';
import store from './store';

import './styles/index.scss';

// 197.2.2 Здесь у нас уже подключены к проекту библиотека «React Redux» и его компонент Provider оборачивает все компоненты приложения, чтобы у них из любой точки был доступ к глобальному хранилищу store. Для store у нас есть отдельная папка и файл.
// (Go to [/src/store/index.js])

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

