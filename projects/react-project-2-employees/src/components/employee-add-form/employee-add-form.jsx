import { Component } from 'react';

import './employee-add-form.css';

class EmployeeAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      salary: ''
    }
  }
  onValueChange = (evt) => {
    if (evt.target.type === 'text') {
      evt.target.value = evt.target.value.replace(/\d/g, '')
      this.setState({
        [evt.target.name]: evt.target.value
      })
    } else {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onAdd(this.state.name, this.state.salary);
    this.setState({
      name: '',
      salary: ''
    })
  }
  render() {
    const { name, salary } = this.state;
    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form 
          className="add-form d-flex"
          onSubmit = {this.onSubmit}>
          <input
            className="form-control new-post-label" type="text"
            placeholder="Как его зовут?"
            name="name"
            value={name}
            onChange={this.onValueChange} />
          <input
            className="form-control new-post-label" type="number"
            placeholder="Зарплата в ₽?"
            name="salary"
            value={salary}
            onChange={this.onValueChange} />
          <button
            className="btn btn-outline-light"
            type="submit">
              Добавить
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeeAddForm;