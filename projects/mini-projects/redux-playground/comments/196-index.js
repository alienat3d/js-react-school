import React from 'react';
import {createRoot} from 'react-dom/client';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';

// 196.1 Здесь мы добавим вторым атрибутом такую строчку, как описано в документации к расширению Redux DevTools на Github (см. в ссылках к уроку).
// (Go to [react-course-notes/8-196-redux-devtools.md])
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);