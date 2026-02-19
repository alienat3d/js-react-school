*[Реакт-хук «useRef» (167)]*

? 167.0 Хук «useRef» нужен для создания ссылок на элементы в DOM-дереве. Или иначе говоря это некий контейнер, который хранит значение между рендерами компонента. Главная особенность этого контейнера: когда мы меняем в ней содержимое, React не перерисовывает компонент (в отличие от useState).

У useRef есть две основные цели использования:

1) Доступ к DOM-элементам (напрямую управлять фокусом, скроллом, видео).
2) Хранение мутабельных (изменяемых) переменных, которые не влияют на внешний вид (UI).

1. Доступ к DOM-элементам
В React мы обычно не трогаем DOM напрямую, но иногда это необходимо (например, чтобы установить фокус в поле ввода при нажатии кнопки). Для этого мы создаем реф и привязываем его к элементу через атрибут ref:
<script>
// Пример: Установка фокуса на input
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  // 1. Создаем реф с начальным значением null
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // 3. Обращаемся к DOM-элементу через свойство .current
    // и вызываем нативный метод focus()
    inputEl.current.focus();
  };

  return (
    <>
      {/* 2. Привязываем реф к элементу input */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Установить фокус</button>
    </>
  );
}
</script>

2. Хранение значений (как переменные экземпляра)
Иногда нужно сохранить значение, которое:

Должно «жить» на протяжении всей жизни компонента.

При изменении не должно вызывать перерисовку (re-render).

Если бы мы использовали useState, каждое изменение вызывало бы рендер, что может быть лишним. Обычная переменная (let x = 0) внутри компонента сбрасывалась бы при каждом рендере. useRef решает эту проблему.

Пример: Таймер (Stopwatch)

Нам нужно хранить ID таймера (intervalId), чтобы потом его остановить. Этот ID не нужно показывать на экране, поэтому хранить его в State нет смысла (лишние рендеры).

<script>
import React, { useState, useRef } from 'react';

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  
  // Мы храним ID интервала в рефе.
  // Изменение timerId.current не вызовет перерисовку.
  const timerId = useRef(null);

  const startTimer = () => {
    // Если таймер уже запущен, не запускаем новый
    if (timerId.current) return;

    timerId.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = null; // Очищаем значение в "коробке"
  };

  return (
    <div>
      <h1>Прошло секунд: {seconds}</h1>
      <button onClick={startTimer}>Старт</button>
      <button onClick={stopTimer}>Стоп</button>
    </div>
  );
}
</script>

Рассмотрим ещё один пример на нашей знакомой по прошлым урокам форме: [projects/react-project-1/src/comments/167-App.js]

|===:===:===:===>
**links**
 * (EN Документация): https://react.dev/reference/react/useRef
 * (RU Документация): https://ru.reactjs.org/docs/hooks-reference.html#useref
 * (RU Краткий перевод): https://reactdev.ru/types/052/#useref
 * (RU Гайд по рендеру): https://alexsidorenko.com/blog/react-render-cheat-sheet/