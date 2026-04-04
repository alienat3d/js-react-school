// 193.1.0 И начнём с того, что мы создадим компонент счётчика, куда перенесём вёрстку для счётчика из [/src/index.html].
import diceIcon from '../resources/dice.png';

// 193.1.1 А ещё нам здесь понадобятся пропсы, чтобы компонент знал о текущем значении счётчика и иметь доступ ко всем трём экшенам для функционирования его кнопок. Расставляем их все на нужные места в вёрстке.
// (Go to [/src/index.js])
const Counter = ({count, dec, inc, rnd}) => {
  return (
    <div className="jumbotron">
      <h1>{count}</h1>
      <div className="buttons-group">
        <button onClick={dec} className="btn btn-primary">-</button>
        <button onClick={inc} className="btn btn-primary">+</button>
        <button onClick={rnd} className="btn"><img src={diceIcon} alt="Dice icon"/></button>
      </div>
    </div>
  );
};

export default Counter;