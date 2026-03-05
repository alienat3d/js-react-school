// 178.7.0 Теперь здесь рассмотрим применение Реакт контекста в функциональных компонентах. Здесь используется специальный хук «useContext». И, хотя, также и в функциональных компонентах мы могли бы использовать Consumer, но чаще просто подписываются на контекст при помощи этого хука.
import {useContext} from 'react';
import {DataContext} from './DataContext';

const InputComponent = () => {
  // 178.7.1 Внутрь хука аргументом помещается тот контекст, на который мы хотим подписать этот компонент, т.ч. мы импортируем его из [DataContext.js] и помещаем внутрь. Собственно это всё, что нужно сделать.
  // (Go to [/src/App.js])
  const context = useContext(DataContext);

  // 178.8.2 Ну, а теперь, когда эта функция у нас находится в стейте, то мы можем её здесь применить.
  // (Go to [/src/components/DataContext.js])
  return (
    <input value={context.mail}
           type="email"
           className="form-control"
           id="email"
           placeholder="name@example.com"
           onFocus={context.changeMail}/>
  );
};

export default InputComponent;