import { Component } from 'react';

import './employees-list-item.css';
// ? [133]
// * 1.0.0 Реализуем динамическое присвоение премии по клику на кнопке «печенье». Нам потребуется его модифицировать, добавив в него стейт. Идея в том, что когда у нас клик по кнопке «печенье», то в состояние этого компонента запишется, что этому сотруднику дадут премию.
// ? Пока мы будем работать именно с классическим стейтом в классовых компонентах, поэтому переделаем в классы.

class EmployeesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      increase: false,
      rise: false
    }
  }
  // * Что у нас тут: Итак, т.к. новый стейт зависит от предыдущего, то запишем через коллбэк-функцию. Эта коллбэк-функция примет в себя один аргумент - стейт. Чтобы потом не писать потом state.increase, очень часто берут и деструктуризируют прямо в аргументе. Далее, после стрелки круглые скобки, чтобы не прописывать return и возвращаем изменённый объект из setState(). Там мы установили новое значение increase, противоположное предыдущему (т.к. у нас булево значение).
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
  // * Также и здесь нам нужно поменять немного логику, т.к. increase должен теперь приходить не из пропсов, а определяться внутри самого компонента.
  render () {
    const {name, salary} = this.props;
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
          onClick={this.riseEmployee}>{name}</span>
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
          type="button">
          <i className="fas fa-trash"></i>
        </button>
        <i className="fas fa-star"></i>
      </li>
    );
  };
}

export default EmployeesListItem;