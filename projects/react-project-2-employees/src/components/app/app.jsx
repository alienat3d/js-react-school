import {Component} from 'react';

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
        {name: 'Денис Андреевич Зайцев', salary: 42000, increased: false, rise: false, id: 0},
        {name: 'Дмитрий Дмитриевич Дёмин', salary: 177000, increased: false, rise: false, id: 1},
        {name: 'Алексей Васильевич Цвайг', salary: 400000, increased: true, rise: true, id: 2},
        {name: 'Семён Моисеевич Циммерман', salary: 195000, increased: false, rise: false, id: 3},
        {name: 'Алёна Алексеевна Воробьёва', salary: 105000, increased: true, rise: true, id: 4},
        {name: 'Дмитрий Валерьевич Гонцов', salary: 95000, increased: true, rise: false, id: 5},
        {name: 'Василий Александрович Чёрный', salary: 45000, increased: false, rise: false, id: 6},
        {name: 'Марина Валерьевна Луговая', salary: 125000, increased: false, rise: true, id: 7},
      ],
      term: '',
      filter: 'all'
    };
    this.maxId = 7;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increased: false,
      rise: false,
      id: ++this.maxId
    };
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      };
    });
  };

  // Универсальная функция, которая будет работать сразу с несколькими свойствами подставляя нужное в алгоритм (подробно в [comments/136.2-app.jsx])
  onToggleProp = (evt, id, prop) => {
    const isClick = evt.type === 'click';
    const isKeyDown = evt.type === 'keydown' && (evt.key === ' ' || evt.key === 'Enter');

    if (isClick || isKeyDown) {
      if (evt.key === ' ') evt.preventDefault();

      this.setState(({data}) => ({
        data: data.map(item => {
          if (item.id === id) {
            return {...item, [prop]: !item[prop]};
          }
          return item;
        })
      }));
    }
  };

  // Функция поиска по имени сотрудника и по зарплате
  searchEmployees = (items, term) => {
    if (term.length === 0) return items;

    const convertedValue = Number(term);

    if (!isNaN(convertedValue) && term.trim() !== '') {
      return items.filter(item => {
        return item.salary.toString().indexOf(term) > -1;
      });
    } else {
      return items.filter(item => {
        return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    }
  };

  onUpdateSearch = (term) => this.setState({term});

  onSalaryChange = (id, value) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, salary: parseInt(value, 10) || 0};
        }
        return item;
      })
    }));
  };

  filterEmployees = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'increased':
        return items.filter(item => item.increased);
      case '> 100000':
        return items.filter(item => item.salary > 100000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => this.setState({filter});

  componentDidUpdate(prevProps) {
  // If the parent prop changes, update our local input value
  if (prevProps.salary !== this.props.salary) {
    this.setState({ inputValue: this.props.salary });
  }
}

  render() {
    const {data, term, filter} = this.state;
    const employeesCount = data.length;
    const increasedCount = data.filter(item => item.increased).length;
    const visibleData = this.filterEmployees(this.searchEmployees(data, term), filter);

    return (
      <div className="app">
        <AppInfo
          employeesCount={employeesCount}
          increasedCount={increasedCount}/>

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}/>
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onSalaryChange={this.onSalaryChange}
          onToggleProp={this.onToggleProp}/>

        <EmployeeAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;