import './employees-list-item.css';

// ? [136.4]
// todo [3-я часть в employees-list-item\employees-list.jsx]
// 1.0.8 Наш классовый компонент теперь мы могли бы переработать в функциональный.
// todo [перейдём в app.jsx], чтобы добавить и в объект data и в метод addItem новое свойство "rise".
const EmployeesListItem = (props) => {
  // * 1.0.6 Ну и теперь вытаскиваем эти два новых метода из пропсов, которые мы тут укажем. А дальше эти две функции назначим в обработчики события.
  // 1.0.7 Теперь у нас оба эти состояния контролируются методами, которые находятся далеко на верху иерархии в главном app.jsx и повышения и премии нам логично теперь отслеживать там же. Поэтому и методы, что мы тут записывали (increaseEmployee & riseEmployee), как и стейт в конструкторе, нам в этом компоненте уже не нужны.  
  const { name, salary, onDelete, onToggleProp, increase, rise } = props;
  let classNames = 'list-group-item d-flex justify-content-between';
  if (increase) {
    classNames += ' increase';
  }
  if (rise) {
    classNames += ' like';
  }
  // * 1.4.3 События клика, связанные с этим методом у нас происходят на двух тегах, где у нас ФИО сотрудника и кнопка «печенье». Нам пригодится какая-то метка, которую мы потом можем получить в onToggleProp() после id, запуская её во внутрь метода. И отличным вариантом, который можно применить к любому HTML-элементу — data-атрибуты. Установим их с тем значением, что нас интересует, т.е. с названием этого свойства.
  // todo [перейдём в employees-list.jsx]
  return (
    <li className={classNames}>
      <span
        className="list-group-item-label"
        onClick={onToggleProp}
        data-toggle="rise" >
          {name}
      </span>
      <input
        type="text"
        className="list-group-item-input"
        defaultValue={'₽' + salary} />
      <button
        className="btn-cookie btn-sm"
        type="button"
        onClick={onToggleProp}
        data-toggle="increase" >
        <i className="fas fa-cookie"></i>
      </button>
      <button
        className="btn-trash btn-sm"
        type="button"
        onClick={onDelete}>
        <i className="fas fa-trash"></i>
      </button>
      <i className="fas fa-star"></i>
    </li>
  );
}

export default EmployeesListItem;