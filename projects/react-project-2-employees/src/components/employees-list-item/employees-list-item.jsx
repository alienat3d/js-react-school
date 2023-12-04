import './employees-list-item.css';
// * 2.0.0 Теперь сделаем такой функционал, чтобы по клику на кнопке "печенька" цвет инфо о сотруднике окрашивался в оранжевый, а свойство его объекта increase менялось с true на false и наоборот.
// 2.0.1 Создадим специальную переменную classNames, в которой будет строчка, которая будет содержать все классы, которые находятся в это элементе. А далее у нас будет условие. Если increase в положении true, то мы добавим этому элементу ещё один класс (важно не забыть пробел перед ним для разделения классов).
const EmployeesListItem = ({name, salary, increase}) => {
  let classNames = 'list-group-item d-flex justify-content-between';

  if (increase) {
    classNames += ' increase';
  }
  // 2.0.2 А здесь соответственно подставляем вместо классов переменную classNames.
  return (
    <li className={classNames}>
      <span className="list-group-item-label">{name}</span>
      <input 
        type="text"
        className="list-group-item-input"
        defaultValue={'₽' + salary} />
      <button 
        className="btn-cookie btn-sm"
        type="button">
        <i className="fas fa-cookie"></i>
      </button>
      <button 
        className="btn-trash btn-sm"
        type="button">
        <i className="fas fa-trash"></i>
      </button>
      <i className="fas fa-star"></i>
    </li>
  );
}

export default EmployeesListItem;