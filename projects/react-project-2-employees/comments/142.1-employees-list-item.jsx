import './employees-list-item.css';

// ? [142.1]

const EmployeesListItem = (props) => { 
  const { name, salary, onDelete, onToggleProp, increase, rise } = props;
  let classNames = 'list-group-item d-flex justify-content-between';
  // * 1.0.0 На самом деле создание подобных классов и стилей мы уже использовали здесь (где мы использовали условия, чтобы добавлять в строку с CSS-классами определённые классы "increase" & "like"). Это и есть динамические классы:
  if (increase) {
    classNames += ' increase';
  }
  if (rise) {
    classNames += ' like';
  }
  return (
    <li className={classNames}>
      <span
        className="list-group-item-label"
        tabIndex={3}
        onClick={onToggleProp}
        data-toggle="rise" >
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