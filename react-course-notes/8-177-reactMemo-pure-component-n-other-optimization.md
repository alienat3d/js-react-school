*[React.memo, Pure Component и оптимизация скорости работы приложения (177)]*

? 177.0 Ещё один полезный метод для оптимизации «React.memo». Если какой-то компонент всегда рендерит одно и то же при неменяющихся пропсах, то можно его обернуть в вызов этого метода для повышения производительности, мемоизируя результат. «Мемоизация» — значит, что Реакт будет использовать результат последнего рендера, избегая повторного рендеринга. Он затрагивает только изменение пропсов. Если же обёрнутый в memo компонент использует useState, useReducer или useContext, то он будет ререндериться при изменении состояния или контекста.
177.1 Представим, что у нас есть большое веб-приложение, которое рендерится на основании динамических пропсов.

Рассмотрим на тестовом примере: [\projects\react-project-1\src\components\Form2Component.js]

|===:===:===:===>
**links**
 * (EN Документация React.memo): https://react.dev/reference/react/memo
 * (RU Документация React.memo): https://ru.reactjs.org/docs/react-api.html#reactmemo
 * (RU Статья о React.memo): https://dmitripavlutin.com/use-react-memo-wisely/
 * (RU Документация о shouldComponentUpdate): https://ru.reactjs.org/docs/react-component.html#shouldcomponentupdate
 * (RU Документация об оптимизации производительности): https://ru.reactjs.org/docs/optimizing-performance.html