import minusIcon from '../resources/minus.svg';
import plusIcon from '../resources/plus.svg';
import diceIcon from '../resources/dice.png';
import {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

// 194.9 Ну, и финальным бонусом урока, рассмотрим случай, если у нас будет классовый компонент и убедимся, что всё работает также, как и с функциональным. Методу «connect» всё равно с каким видом компонента работать, с функциональным или классовым. А вот, когда мы используем хуки для соединения React & Redux (что мы рассмотрим на следующем уроке), то там мы можем использовать исключительно функциональные компоненты.
class Counter extends Component {
  render() {
    const {count, dec, inc, rnd} = this.props;
    return (
      <div className="jumbotron">
        <h1>{count}</h1>
        <div className="buttons-group">
          <button onClick={dec} className="btn btn-primary"><img src={minusIcon} alt="Minus icon"/></button>
          <button onClick={inc} className="btn btn-primary"><img src={plusIcon} alt="Plus icon"/></button>
          <button onClick={rnd} className="btn"><img src={diceIcon} alt="Dice icon"/></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.value
  };
};

export default connect(mapStateToProps, actions)(Counter);