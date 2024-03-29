import { Component } from 'react';

import AppInfo from '../src/components/app-info/app-info';
import SearchPanel from '../src/components/search-panel/search-panel';
import AppFilter from '../src/components/app-filter/app-filter';
import EmployeesList from '../src/components/employees-list/employees-list';
import EmployeeAddForm from '../src/components/employee-add-form/employee-add-form';

import './app.css';

// ? [136.2]
// todo [начало в employees-list-item\app-info.jsx]
// * 1.0.9 Не забудем добавить и в объект data и в метод addItem новое свойство "rise".
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Денис Андреевич Зайцев', salary: 42000, increase: false, rise: false, id: 0 },
        { name: 'Дмитрий Дмитриевич Дёмин', salary: 177000, increase: false, rise: false, id: 1 },
        { name: 'Алексей Васильевич Цвайг', salary: 400000, increase: true, rise: true, id: 2 },
        { name: 'Семён Моисеевич Циммерман', salary: 195000, increase: false, rise: false, id: 3 },
        { name: 'Алёна Алексеевна Воробьёва', salary: 105000, increase: true, rise: false, id: 4 }
      ]
    }
    this.maxId = 4;
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
  // * 1.0.2 Создадим новый метод onToggleIncrease(). Этот метод будет изменять значение increase на противоположный у определённого элемента. И нам тут пригодится id, по которому мы будем находить нужный объект.
  // * 1.1.0 Итак, займёмся логикой наших методов. Нам нужно взять определённый объект, с которым работает пользователь, сделать его копию, поменять в нём свойство, которое он изменяет, создать новый стейт и поменять его в компоненте.
  // 1.1.1 Итак, сперва коллбэке метода setState создадим переменную index, куда мы получим индекс нашего объекта методом findIndex().
  // 1.1.2 Возьмём нужный объект по его индексу и сделаем его копию, чтобы можно было что-то в нём поменять.
  // 1.1.3 Далее берём этот объект по индексу и сделаем его копию, для того, чтобы мы могли в нём что-то поменять. Для наглядности создадим одну промежуточную переменную old. Там будет хранится предыдущий объект.
  // 1.1.4 А теперь создаём новый объект newItem. Теперь у нас в old лежат все свойства и значения, что были в старом объекте. И вот благодаря новому синтаксису деструктуризации и разворота объектов. Мы пропишем "...old", что значит мы развернём все свойства, которые были в объекте old, и сформируем из них новый объект. А теперь мы можем поставить запятую и добавлять новые свойства и если эти свойства будут совпадать с теми, что развернулись оператором расширения "...old", то они просто заменят их значения. Теперь каждый раз, когда сработает этот метод, то будет создаваться новый объект, дальше свойство increase поменяет своё значение на противоположное.
  // 1.1.5 Кроме объекта нам нужно также переработать весь стейт, чтобы он включал новый объект, который мы сформировали. Для этого создадим новый массив, который поместим в newArray. Сперва мы запишем, что нам нужно развернуть data с методом slice от 0 до index. То есть все объекты до того, который изменился. Туда же добавляем объект newItem и остальную часть data после того объекта, что изменился, т.е. "index + 1".
  // 1.1.6 Ну и в итоге в setState мы вернём объект, который будет содержать свойство data, в которое мы помести наш новый, с последними изменениями, массив newArray.
  // ? Тут мы рассмотрели один из самых сложных вариантов, когда мы выдёргиваем случайный объект. В зависимости от сложности стейта есть несколько способов обновления таких объектов, изучить другие можно тут: (https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react/43639228#43639228)
  // * 1.1.7 Особенно интересным способом обработки стейта является способ с использованием метода map(). Пока закомментируем предыдущее решение, хотя оно вполне рабочее также, но довольно громоздкое. Второй же вариант менее понятен, но зато занимает меньше места.
  /*     this.setState(({ data }) => {
        const index = data.findIndex(element => element.id === id)
        const old = data[index];
        const newItem = { ...old, increase: !old.increase };
        const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        return {
          data: newArray
        }
      }) */
  // 1.1.8 Здесь мы возвращаем сразу объект, потому поместим фигурные скобки в круглые. Итак, мы возвращаем объект, у которого будет свойство data. Мы также знаем, что data это массив и если мы к нему применим метод map(), то мы сформируем новый массив. "item" внутри него будет каждый отдельный объект внутри массива. И когда этот коллбэк проходит по каждому из наших объектов внутри data, где мы можем использовать условие, в котором укажем, что если id какого-то объекта внутри массива data совпадёт с тем, по котором кликнул пользователь. То мы внутри коллбэк-функции запусти ещё один return с новым объектом. И в этот новый объект мы можем включить все те свойства, что были до этого и изменяем свойство increase, как в предыдущем примере.
  // 1.1.9 Итак, повторение того, что тут происходит: Т.к. объект стейт мы менять напрямую не можем, поэтому мы возвращаем новый объект, у которого будет свойство data, а в значении будет формироваться новый массив, т.к. map() возвращает новый массив. Причём через коллбэк-функцию, которая находится внутри. Когда у нас идёт перебор всех объектов, мы проверяем id у каждого и если оно совпало с тем, который соответствует элементу на который кликнули, то тогда на этой итерации мы будем возвращать новый объект, который содержит в себе все предыдущие свойства плюс изменённое свойство increase. А каждый раз, когда условие не совпало, мы просто вернём этот объект нетронутым. Как итог мы получим массив объектов с одним изменённым.
  /*   onToggleIncrease = (id) => {
      this.setState(({ data }) => ({
        data: data.map(item => {
          if (item.id === id) {
            return { ...item, increase: !item.increase }
          }
          return item;
        })
      }))
    } */
  // * 1.0.3 Нам понадобится также метод onToggleRise(), который будет делать тоже самое со свойством rise.
  // * 1.2 Ну, а первый метод мы могли бы использовать для изменения второго свойства.
  /*   onToggleRise = (id) => {
      this.setState(({ data }) => {
        const index = data.findIndex(element => element.id === id)
        const old = data[index];
        const newItem = { ...old, rise: !old.rise };
        const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        return {
          data: newArray
        }
      })
    } */
  // * 1.4.0 Теперь у нас так вышло, что методы onToggleIncrease & onToggleRise очень похожи и в принципе мы могли бы оптимизировать код и записать их одним более универсальным методом. Так и сделаем. Тут мы будем менять не конкретное свойство, а какое-то из аргумента "prop"
  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }
  // * 1.0.4 Теперь нужно пробросить этим методы вниз, как мы это уже делали с функциями добавления и удаления сотрудника.
  // todo [перейдём в employees-list.jsx], чтобы использовать эти пропсы.
  // * 1.3.0 Теперь к задаче подсчёта сотрудников. Для этого создадим переменную employees, чтобы в неё записать количество. Сделаем это просто свойством length.
  // * 1.3.1 Далее, чтобы посчитать сколько у нас сотрудников идёт на повышение мы пропишем почти тоже самое, только с методом фильтр, где отфильтруем только те объекты, у которых свойство rise в значении true.
  // 1.3.2 Осталось только в нужный компонент передать эти значения.
  // todo [перейдём в app-info.jsx], чтобы использовать эти пропсы.
  // * 1.4.1 Также удалим один проп, а другой переименуем на onToggleProp.
  // todo [перейдём в employees-list.jsx]
  render() {
    const employeesCount = this.state.data.length;
    const increasedCount = this.state.data.filter(item => item.increase).length;
    return (
      <div className="app">
        <AppInfo
          employeesCount={employeesCount}
          increasedCount={increasedCount} />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp} />

        <EmployeeAddForm
          onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;