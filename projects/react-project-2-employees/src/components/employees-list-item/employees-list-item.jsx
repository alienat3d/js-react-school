import { Component } from 'react';

import './employees-list-item.css';

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