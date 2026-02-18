*[Реакт-хук «useMemo» (166)]*

? 166.0.0 Ещё один доп. хук, который немного похож на «useCallback», но если первый мемоизирует саму функцию, то «useMemo» мемоизирует результат выполнения этой функции. 

? 166.0.1 Когда нужен? Представим, что у нас есть очень сложная математическая задача, которая решается 2 секунды. Мы не хотим решать её заново каждый раз, когда пользователь просто вводит текст в поле поиска (что вызывает ререндер). useMemo запоминает ответ и выдает его мгновенно, пока не изменятся исходные данные.

166.0.2 Как это работает (Пример):
Допустим, у нас есть список из 10 000 товаров, и мы их фильтруем. Без useMemo фильтрация будет запускаться при любом изменении состояния компонента.
<script>
import React, { useState, useMemo } from 'react';

const ProductList = ({ products }) => {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  // Обернули тяжелое вычисление в useMemo
  const filteredProducts = useMemo(() => {
    console.log("Фильтруем товары... (тяжелая операция)");
    return products.filter(p => p.name.includes(query));
  }, [products, query]); // Пересчитает только если изменится список или запрос

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Счетчик: {count}</button>
      
      {/* При клике на кнопку 'count' ререндера фильтрации НЕ БУДЕТ */}
      <ul>
        {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>
  );
};
</script>

* Когда СТОИТ использовать useMemo:
Тяжелые вычисления: Сложные циклы, глубокая фильтрация, обработка больших массивов данных.

Передача объектов/массивов в дочерние компоненты: Если ребенок обернут в React.memo, он будет перерисовываться при каждом рендере родителя, потому что [] !== [] (новые ссылки). useMemo сохранит одну и ту же ссылку.

* Когда НЕ СТОИТ использовать useMemo:
Для простых операций: Сложение двух чисел или простая конкатенация строк.

Везде подряд: Затраты памяти на создание и хранение кэша могут быть выше, чем польза от экономии миллисекунд на рендере.

Интересный факт: React не гарантирует 100%, что значение в useMemo останется в памяти навсегда. Если памяти будет не хватать, React может очистить кэш и пересчитать значение при следующем рендере. Это называется семантическая гарантия.

Рассмотрим пример тяжёлых вычислений и разницу в производительности с и без хука useMemo: [projects/mini-projects/react-slider/166-MemoExample.js]

---

Маленький лайфхак: Как понять, пора ли использовать useMemo?
Если ты не уверен, достаточно ли «тяжелая» твоя функция, можно замерить время её выполнения прямо в коде:
<script>
// ? Если в консоли ты видишь значения больше 10-20 мс, то useMemo определенно стоит добавить. Если там 0.1 мс — не трать время, обычный расчет будет даже быстрее, чем накладные расходы на работу самого хука.
    console.time('heavy-task');
    const result = heavyComputation(n);
    console.timeEnd('heavy-task');
</script>

---

Чтобы сделать компонент по-настоящему «пуленепробиваемым», нужно использовать связку React.memo + useCallback + useMemo.
Представь ситуацию: у тебя есть родительский компонент (Страница) и дочерний (очень тяжелый список или график). Если ты не оптимизируешь передачу данных, дочерний компонент будет перерисовываться при каждом чихе в родителе.

Сценарий: Список пользователей с фильтрацией
Мы хотим, чтобы список перерисовывался только если изменились сами данные, а не когда мы вводим текст в поле поиска или кликаем на счетчик.
<script>
import React, { useState, useMemo, useCallback } from 'react';

// 1. Оборачиваем дочерний компонент в React.memo.
// Теперь он перерисуется только если его PROPS реально изменились.
const HeavyList = React.memo(({ items, onItemClick }) => {
  console.log("=> Рендер тяжелого списка...");
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

const App = () => {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  // 2. Используем useMemo для данных.
  // Если мы просто напишем users.filter(...), то при каждом рендере 
  // будет создаваться НОВЫЙ массив (новая ссылка), и HeavyList перерисуется.
  const filteredUsers = useMemo(() => {
    return users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]); // Зависит только от поиска

  // 3. Используем useCallback для функции клика.
  // Если передать обычную функцию, то при каждом рендере у неё будет новая ссылка.
  // HeavyList увидит новую ссылку в props и снова перерисуется.
  const handleUserClick = useCallback((id) => {
    console.log("Клик по пользователю:", id);
  }, []); // Ссылка на функцию стабильна всегда

  return (
    <div style={{ padding: '20px' }}>
      <h1>Оптимизированное приложение</h1>
      
      <input 
        placeholder="Поиск..." 
        onChange={(e) => setSearch(e.target.value)} 
      />
      
      <button onClick={() => setCount(count + 1)}>
        Обновить счетчик: {count}
      </button>

      {/* Теперь HeavyList НЕ перерисуется при клике на кнопку счетчика! */}
      <HeavyList items={filteredUsers} onItemClick={handleUserClick} />
    </div>
  );
};
</script>

|===:===:===:===>
**links**
 * (EN Документация): https://react.dev/reference/react/useMemo
 * (RU Документация): https://ru.reactjs.org/docs/hooks-reference.html#usememo
 * (RU Краткий перевод): https://reactdev.ru/types/052/#usememo
 * (RU Гайд по рендеру): https://alexsidorenko.com/blog/react-render-cheat-sheet/