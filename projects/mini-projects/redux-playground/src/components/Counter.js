import minusIcon from '../resources/minus.svg';
import plusIcon from '../resources/plus.svg';
import diceIcon from '../resources/dice.png';
import {useDispatch, useSelector} from 'react-redux';
import {inc, dec, rnd} from '../actions';

const Counter = () => {
  const counter = useSelector(state => state.count);

  const dispatch = useDispatch();

  return (
    <div className="jumbotron">
      <h1>{counter}</h1>
      <div className="buttons-group">
        <button onClick={() => dispatch(dec())} className="btn btn-primary"><img src={minusIcon} alt="Minus icon"/></button>
        <button onClick={() => dispatch(inc())} className="btn btn-primary"><img src={plusIcon} alt="Plus icon"/></button>
        <button onClick={() => dispatch(rnd())} className="btn"><img src={diceIcon} alt="Dice icon"/></button>
      </div>
    </div>
  );
};

export default Counter;