import { createStore } from 'redux';
import reducer from '../reducers';

// 197.2.3 Здесь мы занимаемся созданием глобального store. Да, store чаще всего выделяют в отдельную папку и файл, хотя мы видим здесь не так уж много кода и это для того, чтобы разному функционалу в приложении соответствовали разные папки и файлы для лучшей модульности и лёгкости ориентировки. Здесь мы импортируем функцию-редьюсер из отдельного файла и помещаем в выполнение метода создания store "createStore", а также вторым аргументом прописываем то, что необходимо для активации Redux DevTools.
// (Go to [/src/reducers/index.js])

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;