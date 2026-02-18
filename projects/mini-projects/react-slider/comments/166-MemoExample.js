import React, { useState, useMemo } from 'react';

// 166.1.0 Давайте создадим наглядный пример, который покажет разницу в производительности. Представим, что у нас есть «тяжелая» функция, которая имитирует сложный расчет (например, фильтрацию 10 000 записей или вычисление факториала). Мы добавим кнопку «Счетчик», которая просто меняет состояние.

// Имитация тяжелых вычислений
const memoExample = (num) => {
  console.log('--- Начало тяжелого расчета ---');
  let i = 0;
  while (i < 1000000000) i++; // Искусственная задержка
  return num * 2;
};

const MemoExample = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(10);

  // ВАРИАНТ А: Без useMemo
  // const doubledNumber = heavyComputation(number);
  // Эффект: При каждом нажатии на "Счетчик" приложение будет "зависать" на секунду.

  // ВАРИАНТ Б: С useMemo
  const doubledNumber = useMemo(() => {
    return memoExample(number);
  }, [number]); // Расчет сработает ТОЛЬКО если изменится number

  return (
    <div style={{ padding: '20px' }}>
      <h2>Результат расчета: {doubledNumber}</h2>

      <button onClick={() => setNumber(prev => prev + 1)}>
        Изменить число (Нужен перерасчет)
      </button>

      <hr />

      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Просто обновить стейт (Перерасчет не нужен)
      </button>
    </div>
  );
};

export default MemoExample;