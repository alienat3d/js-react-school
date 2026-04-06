import minusIcon from '../resources/minus.svg';
import plusIcon from '../resources/plus.svg';
import diceIcon from '../resources/dice.png';
import {connect} from 'react-redux';
import * as actions from '../actions';

const Counter = ({count, dec, inc, rnd}) => {
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
};

const mapStateToProps = (state) => {
  return {
    count: state.value
  };
};

export default connect(mapStateToProps, actions)(Counter);