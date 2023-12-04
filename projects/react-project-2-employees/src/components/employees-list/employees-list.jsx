import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';
// * 1.0.1 [начало в app.jsx] Итак, сперва мы вытащим data из пропсов и теперь при помощи метода map() переберём и видоизменим массив. Т.к результатом работы метода map() является новый массив, сформированный из коллбэк-функций, то в elements у нас попадёт в итоге массив с компонентами.
// * 1.1.0 Можно чуточку улучшить код, используя спред-операторы. Эти две записи будут идентичны, т.к. спред-оператор разворачивает объект на отдельные элементы.
// * 3.0.1 [начало в app.jsx] Также допишем пропс key для этого компонента. И нам необходимо вытащить id из этого объекта, воспользовавшись всё той же деструктуризацией, только частичной. Что мы делаем, так это разделяем объект в item на две части: 1) id, 2) все остальные свойства в itemProps, это такая деструктуризация по остаточному принципу.
// * 3.1.0 Иногда, может случится, что в данных, которые к нам пришли с сервера не содержится этих идентификаторов, не продумали на бэкенде. В таком случае допускается использование индекса элемента. Но такое допускается, только если мы знаем точно, что порядок элементов меняться не будет, иначе в этом смысла совсем нет.
// ! 3.2 Считается плохой практикой назначение пропсов key при помощи различных операций, вроде Math.random().
const EmployeesList = ({ data }) => {

  // const elements = data.map((item, index) => {
  const elements = data.map(item => {
    const {id, ...itemProps} = item;

    return (
      // <EmployeesListItem name={item.name} salary={item.salary} />
      // <EmployeesListItem key={index} {...itemProps} />
      <EmployeesListItem key={id} {...itemProps} />
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