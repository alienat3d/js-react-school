// * Задание к уроку #169:
// 1) Создать упрощённый, по сравнению с нашим счётчиком, компонент, где будут лишь функции рандомайзера и сброса;
// 2) Эти, одинаковые для обоих компонентов функции вынести в самописный реакт-хук;
// *3) С помощью Random.org API улучшить функцию рандомайзера (random.org/clients/http/api/);
// *4) Изначальное число счётчика должно получаться от сервера, а не захардкожено и получаться оно должно также через хук.

import {useCounterFunctions} from '../hooks/useCounterFunctions';

const RandomCounter = () => {
  const {count, isRandomizing, randomizeError, onResetCount, onRandomizeCount} = useCounterFunctions();

  return (
    <div className="counter-wrapper">
      <div className="counter">
        {isRandomizing ? '...' : count}
      </div>
      {randomizeError && (
        <p className="error-message">{randomizeError}</p>
      )}
      <div className="controls">
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

export default RandomCounter;