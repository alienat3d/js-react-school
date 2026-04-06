import React from 'react';
import {createRoot} from 'react-dom/client';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';

// 194.1 Итак, здесь у нас store, глобальное хранилище Redux, которое нужно соединить с компонентом Counter.
// (Go to [/src/components/Counter.js])
const store = createStore(reducer);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);