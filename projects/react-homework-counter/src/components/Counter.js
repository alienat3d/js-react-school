import {useCounterFunctions} from '../hooks/useCounterFunctions';

// 169.9.6 Предотвращаем спам-клики в самом UI в компоненте Counter.

const Counter = ({counter}) => {
  const {
    count,
    onDecreaseCount,
    onIncreaseCount,
    isRandomizing,
    randomizeError,
    onRandomizeCount,
    onResetCount
  } = useCounterFunctions(counter);

  return (
    <div className="counter-wrapper">
      <div className="counter">
        {isRandomizing && count === counter ? '...' : count}
      </div>
      {/* 169.9.7 Покажем сообщение ошибки, если что-то не так с нашим запросом на сервер API. */}
      {randomizeError && (
        <p className="error-message">{randomizeError}</p>
      )}
      <div className="controls">
        <button onClick={onDecreaseCount}>
          <img className="control-btn-img" src="./img/minus.svg" alt=""/>
        </button>
        <button onClick={onIncreaseCount}>
          <img className="control-btn-img" src="./img/plus.svg" alt=""/>
        </button>
        {/* 169.9.8 Заблокируем кнопку-триггер рандомайзера, пока флажок isRandomizing - true. */}
        {/* (Go to [/src/hooks/useCounterFunctions.js]) */}
        <button
          onClick={onRandomizeCount}
          disabled={isRandomizing}
          style={{opacity: isRandomizing ? 0.5 : 1}}
        >
          <img className="control-btn-img" src="./img/dice.svg" alt="Dice"/>
        </button>
        <button onClick={onResetCount}>
          <img className="control-btn-img" src="./img/reset.svg" alt=""/>
        </button>
      </div>
    </div>
  );
};

export default Counter;