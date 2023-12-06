import { Component } from 'react';

import './employees-list-item.css';

// ? [135]
// todo [начало в employees-list\employees-list.jsx]

class EmployeesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      increase: false,
      rise: false
    }
  }
  increaseEmployee = () => {
    this.setState(({increase}) => ({ 
      increase: !increase 
    }))
  }
  riseEmployee = () => {
    this.setState(({rise}) => ({ 
      rise: !rise 
    }))
  }
  // * 1.0.4 Находим пропсы и добавляем нашу новую функцию onDelete().
  render () {
    const {name, salary, onDelete} = this.props;
    const {increase, rise} = this.state;
    let classNames = 'list-group-item d-flex justify-content-between';
    if (increase) {
      classNames += ' increase';
    }
    if (rise) {
      classNames += ' like';
    }
    // * 1.0.5 Находим кнопку "корзинка" и назначим ей обработчик события.
    // 1.0.8 И в итоге передаём функцию onDelete в обработчик события onClick.
    // ? Также можно передавать вниз и данные и методы и т.п.
    return (
      <li className={classNames}>
        <span 
          className="list-group-item-label"
          onClick={this.riseEmployee}>
            {name}
        </span>
        <input 
          type="text"
          className="list-group-item-input"
          defaultValue={'₽' + salary} />
        <button 
          className="btn-cookie btn-sm"
          type="button"
          onClick={this.increaseEmployee}>
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
  };
}

export default EmployeesListItem;