import AppInfo from '../src/components/app-info/app-info';
import SearchPanel from '../src/components/search-panel/search-panel';
import AppFilter from '../src/components/app-filter/app-filter';
import EmployeesList from '../src/components/employees-list/employees-list';
import EmployeeAddForm from '../src/components/employee-add-form/employee-add-form';

import './app.css';
// * 1.0.0 Итак, представим, что data нам пришла с сервера и нам нужно на основе неё создать компонент EmployeesList. [далее в employees-list.jsx]
// * 3.0.0 Укажем id каждому из объектов, чтобы реакт мог их различить алгоритмом реконциляции. (см. react-course-notes\6-129-reconciliation-algorithm.js), далее перейдём в [src\components\employees-list\employees-list.jsx]
const data = [
  {name: 'Денис Андреевич Зайцев', salary: 42000, increased: false, id: 0},
  {name: 'Дмитрий Дмитриевич Дёмин', salary: 177000, increased: false, id: 1},
  {name: 'Алексей Васильевич Цвайг', salary: 400000, increased: true, id: 2},
  {name: 'Семён Моисеевич Циммерман', salary: 195000, increased: false, id: 3},
  {name: 'Алёна Алексеевна Воробьёва', salary: 105000, increased: true, id: 4},
];

function App() {
  return (
    <div className="app">
      <AppInfo/>
      <div className="search-panel">
        <SearchPanel/>
        <AppFilter/>
      </div>
      <EmployeesList data={data}/>
      <EmployeeAddForm/>
    </div>
  );
}

export default App;