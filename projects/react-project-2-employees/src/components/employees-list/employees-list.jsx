import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';
// * 1.0.1 [начало в app.jsx] Итак, сперва мы вытащим data из пропсов и теперь при помощи метода map() переберём и видоизменим массив. Т.к результатом работы метода map() является новый массив, сформированный из коллбэк-функций, то в elements у нас попадёт в итоге массив с компонентами.
// * 1.1.0 Можно чуточку улучшить код, используя спред-операторы. Эти две записи будут идентичны, т.к. спред-оператор разворачивает объект на отдельные элементы.
const EmployeesList = ({ data }) => {

  const elements = data.map(item => {
    return (
      // <EmployeesListItem name={item.name} salary={item.salary} />
      <EmployeesListItem {...item} />
    );
  });
  // 1.0.2 И в итоге мы этот массив "elements" подставляем сюда, где он развернётся в нужную нам вёрстку.
  return (
    <ul className="app-list list-group">
      {elements}
      {/* <EmployeesListItem name='Денис З.' salary={42000}/>
      <EmployeesListItem name='Дмитрий Д.' salary={77000}/>
      <EmployeesListItem name='Алексей Ц.' salary={100000}/> */}
    </ul>
  );
}

export default EmployeesList;