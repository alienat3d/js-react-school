import { Component } from 'react';

import './App.css';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.counter
    }
  }

  onIncreaseCount = () => {
    if (this.state.count < 50) {
      this.setState(state => ({
        count: state.count + 1
      }));
    }
  }
  onDecreaseCount = () => {
    if (this.state.count > -50) {
      this.setState(state => ({
        count: state.count - 1
      }));
    }
  }
  onRandomizeCount = () => {
    this.setState({
      count: +(Math.random() * (50 - -50) + -50).toFixed(0)
    })
  }
  onResetCount = () => {
    this.setState({
      count: this.props.counter
    })
  }

  render() {
    const {count} = this.state;

    return (
      <div className='app'>
        <div className='counter'>{count}</div>
        <div className='controls'>
          <button onClick={this.onDecreaseCount}>
            <img className='control-btn-img' src='./img/minus.svg' alt='' />
          </button>
          <button onClick={this.onIncreaseCount}>
            <img className='control-btn-img' src='./img/plus.svg' alt='' />
          </button>
          <button onClick={this.onRandomizeCount}>
            <img className='control-btn-img' src='./img/dice.svg' alt='' />
          </button>
          <button onClick={this.onResetCount}>
            <img className='control-btn-img' src='./img/reset.svg' alt='' />
          </button>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <Counter counter={0} />
  );
}

export default App;

// 1) Начальное значение счетчика должно передаваться через props
// 2) INC и DEC увеличивают и уменьшают счетчик соответственно на 1. Без ограничений, но можете добавить границу в -50/50. По достижению границы ничего не происходит
// 3) RND изменяет счетчик в случайное значение от -50 до 50. Конструкцию можете прогуглить за 20 секунд :) Не зависит от предыдущего состояния
// 4) RESET сбрасывает счетчик в 0 или в начальное значение из пропсов. Выберите один из вариантов