import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeeAddForm from '../employee-add-form/employee-add-form';

import './app.css';

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