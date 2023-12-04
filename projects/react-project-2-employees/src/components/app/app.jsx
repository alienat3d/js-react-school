import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeeAddForm from '../employee-add-form/employee-add-form';

import './app.css';
// * 1.0.0 Итак, представим, что data нам пришла с сервера и нам нужно на основе неё создать компонент EmployeesList. [далее в employees-list.jsx]
// * 3.0.0 Укажем id каждому из объектов, чтобы реакт мог их различить алгоритмом реконциляции. (см. react-course-notes\6-129-reconciliation-algorithm.js), далее перейдём в [src\components\employees-list\employees-list.jsx]
const data = [
  {name: 'Денис З.', salary: 42000, increase: false, id: 0},
  {name: 'Дмитрий Д.', salary: 177000, increase: false, id: 1},
  {name: 'Алексей Ц.', salary: 400000, increase: true, id: 2},
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