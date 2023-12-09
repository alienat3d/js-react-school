import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeeAddForm from '../employee-add-form/employee-add-form';

import './app.css';

// ? [138.1]
// * 1.0.0 === Реализуем функционал поиска ===
/* 1.0.1 Сперва разбираем алгоритм, который нам требуется для такого функционала:
  1) В компоненте поиска у нас будет сохраняться значение, которое пользователь вводит в строку ввода поиска (это будет стейт);
  2) Это значение мы будем передавать наверх в app.jsx, т.е. сюда, где мы его будем использовать;
  3) Мы берём значение строки из поиска и по ней отфильтруем данные в массиве data (точнее значения свойства объектов "name", что соответствует ФИО сотрудников);
  4) После фильтрации у нас останутся только те сотрудники, что нам нужно отобразить и будут переданы дальше на рендер.
*/
// 1.0.2 Для начала создадим новый стейт "term", где у нас позже будет значение строки поиска. ↓
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Денис Андреевич Зайцев', salary: 42000, increase: false, rise: false, id: 0 },
        { name: 'Дмитрий Дмитриевич Дёмин', salary: 177000, increase: false, rise: false, id: 1 },
        { name: 'Алексей Васильевич Цвайг', salary: 400000, increase: true, rise: true, id: 2 },
        { name: 'Семён Моисеевич Циммерман', salary: 195000, increase: false, rise: false, id: 3 },
        { name: 'Алёна Алексеевна Воробьёва', salary: 105000, increase: true, rise: true, id: 4 },
        { name: 'Дмитрий Валерьевич Гонцов', salary: 95000, increase: true, rise: false, id: 5 },
        { name: 'Василий Александрович Чёрный', salary: 45000, increase: false, rise: false, id: 6 },
        { name: 'Марина Валерьевна Луговая', salary: 125000, increase: false, rise: true, id: 7 },
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 7;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: ++this.maxId
    }
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    });
  }

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item;
      })
    }))
  }
  // * 1.1.0 Напишем метод поиска. Здесь нам понадобится два аргумента: 1) строчка, по которой будем искать, 2) массив данных, который будем фильтровать.
  // 1.1.1 Также стоит предусмотреть разные ситуации: когда пользователь удаляет свой ввод (term.length === 0) — мы просто вернём тот массив, в том виде, как он изначально пришёл (return). Ну, а если условие не выполнится, то мы фильтруем наш массив c объектами методом filter(). Нам нужно в каждом из объектов "item" найти свойство name и сравнить его со значением из term. Можно придумать разные алгоритмы поиска, но пока будем искать любое совпадение, а не по первой букве.
  searchEmployee = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    // 1.1.2 Итак мы возвращаем, используя метод indexOf(), который ищет подстроки (кусочки строки). И если он ничего не находит, то он вернёт "-1", поэтому логично будет записать "> -1". Таким образом мы будем возвращать, только если что-то найдено, а в случае, если ничего найдено не будет, то метод вернёт "-1" и следовательно условие не выполнится и ничего из коллбэка не вернётся. А если выполнится, то вернутся индексы массивов, где была найдена подобная подстрока. Таким образом такое условие нам вернёт массив элементов, которые действительно подойдут под наш поиск.
    return items.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
  }
  // * 1.1.8 Как и в случае с deleteItem и onToggleProp, чтобы "поднять стейт" из SearchPanel компонента, нам нужно создать метод, назовём его onUpdateSearch(). Аргументом он будет принимать строку "term" и его действием будет установка стейта. Здесь мы не зависим от предыдущего стейта, т.ч. можем просто передать term (term: term сократили до term - это сокр. запись объекта). 
  // 1.1.9 Теперь этот метод передадим в компонент. ↓
  onUpdateSearch = (term) => this.setState({ term })

  // 1.0.3 И сразу запишем стейты, применим деструктуризацию, т.к. у нас уже два стейта.
  // 1.1.3 Теперь результаты поиска нам нужно отобразить. Теперь мы хотим отображать не просто data, а сперва их отфильтровать и уже потом отображать.
  // 1.1.4 Помним, что если у нас в строке поиска ничего не будет, то у нас просто вернётся весь массив данных и отрендерится целиком.
  // 1.1.5 Создадим ещё одну переменную visibleData, в которую поместим наш метод с массивом объектов с информацией о сотрудниках и значение строки ввода поиска.
  // 1.1.6 Теперь в проп data передаём уже результат работы метода visibleData, где у нас будет содержатся массив, отфильтрованный по значению строки поиска.
  // todo [перейдём в search-panel\search-panel.jsx]
  // [1.1.9] Передавать мы его будем соответственно в SearchPanel. ↓
  // todo [перейдём в search-panel\search-panel.jsx]

  // * 2.0.0 == Пишем реализацию фильтра ==
  /* 2.0.1 Логика алгоритма будет следующей:
    1) После того, как пользователь кликнет на одну из кнопок фильтра в нашем UI, выбранный фильтр поднимается наверх;
    2) На основании значения этого фильтра фильтруются данные;
    3) На основе этих данных рендерится список сотрудников.
  */
  // 2.0.2 Для начала мы запишем в data новое свойство 'filter' с пустой строкой, куда будет записываться значение фильтра.
  // 2.0.3 Напишем новый метод для фильтрации данных. Когда у нас в условии больше 2-ух случаев, то удобно использовать конструкцию "switch case".
  // 2.0.4 В первый случай запишем, что с помощью метода filter() мы будем возвращать только те объекты, в свойство rise которых будет в значении true.
  // ? Обычно в реакте break; не ставится, т.к. реакт и так знает, что нужно остановиться. Но и написать его не будет ошибкой.
  filterEmployees = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise)
      case '> 100000':
        return items.filter(item => item.salary > 100000)
      default:
        return items;
    }
  }
  // * 2.1.0 Теперь у нас ситуация, когда мы уже фильтруем тот же массив объектов data, по введённому значению в строку поиска. В этом случае нам нужно скомбинировать эти две функции, чтобы фильтрация шла и по введённому значению в поиск и по выбранному пользователем фильтру одновременно. Для этого запишем метод filterEmployees, который также принимает в себя массив 'items' и filter. И вот вместо массива мы запишем другой метод searchEmployee(). Получается, что мы ещё раз фильтруем уже отфильтрованный массив данных. Сперва у нас идёт фильтрация по значению в поиске, а потом по выбранному фильтру.
  // todo [перейдём в app-filter\app-filter.jsx]
  // * 2.2.5 В компонент AppFilter мы передадим текущий стейт filter.
  // todo [вернёмся в app-filter\app-filter.jsx]
  // * 2.3.0 Осталось создать метод onFilterSelect(), который мы передадим как действие во внутрь компонента AppFilter. Очень простой метод изменяющий стейт фильтра.
  // ? Ещё раз обращаем внимание на нейминг тех методов, которые связанны со взаимодействием пользователя со страницей, их мы называем со слова "on...", а остальные методы без этого слова, таким образом понятность кода возрастает.
  // 2.3.1 Теперь передаём его вниз по иерархии, добавляя компоненту AppFilter ещё один атрибут "onFilterSelect" и в него одноимённый метод с контекстом вызова this.
  // todo [вернёмся в app-filter\app-filter.jsx]
  onFilterSelect = (filter) => this.setState({ filter })

  render() {
    const { data, term, filter } = this.state;
    const employeesCount = data.length;
    const increasedCount = data.filter(item => item.increase).length;
    const visibleData = this.filterEmployees(this.searchEmployee(data, term), filter);

    return (
      <div className="app">
        <AppInfo
          employeesCount={employeesCount}
          increasedCount={increasedCount} />

        <div className="search-panel">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch} />
          <AppFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp} />

        <EmployeeAddForm
          onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;