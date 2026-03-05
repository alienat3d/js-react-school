import {Component} from 'react';
// 178.5.3 А также здесь и в тех компонентах, где нужен Consumer соответственно тоже импортируем DataContext из этого же вспомогательного компонента. Ошибка исправлена. ↓
import {DataContext} from './DataContext';

// 178.3.4 Здесь мы обернём вёрстку компонента в Consumer. Но мы не можем так просто вставить вёрстку в Consumer, нам нужно поместить её в стрелочную функцию, принимающую value из Provider главного родительского компонента App и возвращать вёрстку.
// 178.3.5 Затем мы вытаскиваем свойство "mail" из этого value. На самом деле в нём лежит объект со свойствами "mail" & "text", так что просто обратимся к "value.mail".
class ClassInputComponent extends Component {
  // 178.6 Кроме того, мы можем также записать присвоение Consumer и здесь, через более современный синтаксис полей класса. Работать будет точно также.
  // (Go to [/src/components/InputComponent.js])
  static contextType = DataContext;

  render() {
    return (
      /*<Consumer>
        {
          value => {
            return (
              <input value={value.mail}
                     type="email"
                     className="form-control"
                     id="email"
                     placeholder="name@example.com"/>
            );
          }
        }
      </Consumer>*/
      // 178.4.0 Ок, это был первый способ передачи данных в классовый компонент при помощи контекста, но есть и второй способ. Здесь мы просто вернём вёрстку с инпутом. ↓
      // 178.4.2 Тогда у нас появляется свойство "context", из которого можно вытащить нужный нам "mail".
      // 178.5.0 И тут мы столкнулись с ошибкой сообщения двух компонентов "циклическая зависимость" (circular dependency), которая происходит потому, что Webpack пытается прочесть сущность Consumer до того, как она была создана. Поэтому лучше всего создать отдельный файл для Реакт контекста и уже из него импортировать необходимые сущности в App & ClassInputComponent.
      // (Go to [/src/components/DataContext.js])
      <input value={this.context.mail}
             type="email"
             className="form-control"
             id="email"
             placeholder="name@example.com"/>
    );
  };
}

// 178.4.1 Дальше за пределами этого компонента нам нужно к нему обратиться и назначить статичное свойство "contextType" и ему назначаем Consumer. ↑
// ClassInputComponent.contextType = Consumer;

export default ClassInputComponent;