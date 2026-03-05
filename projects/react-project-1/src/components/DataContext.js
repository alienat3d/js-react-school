import {createContext} from 'react';

export const DataContext = createContext({
  mail: 'name@example.com',
  text: 'Hello World!',
  changeMail: () => console.error('Функция не найдена, проверьте, что компонент внутри Provider'),
});