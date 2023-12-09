import './employees-list-item.css';

// ? [6-140]

const EmployeesListItem = (props) => { 
  const { name, salary, onDelete, onToggleProp, increase, rise } = props;
  let classNames = 'list-group-item d-flex justify-content-between';
  
  if (increase) {
    classNames += ' increase';
  }
  if (rise) {
    classNames += ' like';
  }
  // * 1.0.0 Итак, потренируемся прописывать инлайн-стили на нашем списке сотрудников. Для начала пропишем атрибут "style". Этот атрибут в реакте принимает в себя объект со стилями. Допустим, мы бы хотели увеличить шрифт ФИО сотрудника. Откроем ещё одни фигурные скобки и запишем свойство "font-size". Однако в реакте они прописываются в формате camelCase, т.е. "fontSize", а значение свойства строкой в кавычках или цифрами (реакт автоматически подставит px, после значения).
  // 1.0.1 Это довольно удобно, когда к нам приходит объект стилей, который мы сразу можем применить к элементу. Также можно вынести этот объект стилей в переменную и передавать только переменную.
  // ? 1.0.2 С этим способом есть одна проблема: префиксы автоматически расставляться не будут, придётся их прописывать вручную.
  return (
    <li className={classNames}>
      <span
        className="list-group-item-label"
        tabIndex={3}
        onClick={onToggleProp}
        data-toggle="rise"
        style={{fontSize: 30, color: 'navy', transition: 'all .5s', WebkitTransition: 'all .5s', msTransition: 'all .5s'}} >
          {name}
      </span>
      <input
        type="text"
        className="list-group-item-input"
        tabIndex={4}
        defaultValue={'₽' + salary} />
      <button
        className="btn-cookie btn-sm"
        tabIndex={5}
        type="button"
        onClick={onToggleProp}
        data-toggle="increase" >
        <i className="fas fa-cookie"></i>
      </button>
      <button
        className="btn-trash btn-sm"
        tabIndex={6}
        type="button"
        onClick={onDelete}>
        <i className="fas fa-trash"></i>
      </button>
      <i className="fas fa-star"></i>
    </li>
  );
}

export default EmployeesListItem;