import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

// ? [136.3]
// todo [2-ая часть в employees-list-item\app.jsx]

// * 1.0.5 Укажем в деструктуризации только что созданные в app.jsx пропсы "onToggleIncrease" и "onToggleRise", а также добавим их в EmployeesListItem и передадим в коллбэк id.
// todo [перейдём в employees-list-item.jsx], чтобы перебросить эти пропсы далее к нужному тегу самого компоненту EmployeesListItem.
// * 1.4.1 Здесь мы также уберём один из методов, а другой заменим на onToggleProp.
// 1.4.2 Теперь, после id нам также нужно передать название нашего пропа, чтобы реакт понимал что конкретно ему менять. Это должна быть строка и она должна быть получена с элемента, на котором произошло событие.
// todo [перейдём в employees-list-item.jsx], чтобы расставить нужные data-атрибуты.
// * 1.4.4 И вот как мы можем получить дата-атрибут: у нас есть объект события, который мы можем получить и который приходит автоматически в evt. Далее мы обращаемся к evt.currentTarget и затем применим метод getAttribute() с указанием названия атрибута, значение которого мы хотим получить. Теперь по клику на ФИО мы получим "rise", а по клику на кнопку «печенье» — "increase".
// ? currentTarget — использовали, чтобы нивелировать всплытие событий и получать только тот элемент, который действительно нужен.
const EmployeesList = ({ data, onDelete, onToggleProp}) => {
  const elements = data.map(item => {
    const {id, ...itemProps} = item;

    return (
      <EmployeesListItem 
        key={id} 
        {...itemProps} 
        onDelete={() => onDelete(id)}
        onToggleProp={(evt) => onToggleProp(id, evt.currentTarget.getAttribute('data-toggle'))} />
    );
  });
  return (
    <ul className="app-list list-group">
      {elements}
    </ul>
  );
}

export default EmployeesList;