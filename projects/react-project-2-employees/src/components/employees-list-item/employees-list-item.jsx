import {Component} from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.salary
    };
  }

  onChangeSalary = (evt) => {
    const value = evt.target.value;
    const cleanedValue = value.replace(/\D/g, '');
    this.props.onSalaryChange(cleanedValue);
  };

  render() {
    const {name, salary, increased, rise, onDelete, onToggleProp} = this.props;

    let classNames = 'list-group-item d-flex justify-content-between';

    if (increased) {
      classNames += ' increased';
    }
    if (rise) {
      classNames += ' rise';
    }

    return (
      <li className={classNames}>
      <span
        className="list-group-item-label"
        tabIndex={3}
        onClick={onToggleProp}
        data-toggle="rise">
          {name}
      </span>
        <input
          type="text"
          className="list-group-item-input"
          value={'₽' + salary}
          onChange={this.onChangeSalary}
        />
        <button
          className="btn-cookie btn-sm"
          tabIndex={5}
          type="button"
          onClick={onToggleProp}
          data-toggle="increased">
          <i className="fas fa-cookie"></i>
        </button>
        <button
          className="btn-trash btn-sm"
          tabIndex={6}
          type="button"
          onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
        <i className="fas fa-star"></i>
      </li>
    );
  }
}

export default EmployeesListItem;