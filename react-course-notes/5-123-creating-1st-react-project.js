'use strict';

// * === Создаём первое React-приложение. (121) === * \\

// ? Вспомним модульный JS, так вот React JS устроен по такому же принципу — каждый кусочек UI будет описан в отдельном файле, экспортирован, импортирован и все они будут собраны в одно большое приложение.
// ? Для помощи и экономии времени был создан специальный инструмент "Create React App" (CRA) — готовая сборка, которая в одну команду создаст настроенное и готовое к работе приложение.

// todo Итак, если перейти в папку [projects/react-project-1], то мы увидим всё также, как и раньше при работе с Webpack файл-точку входа index.js, в который импортирован App.js, в котором мы будем работать. Также там есть файл базовых CSS-стилей, а также файл тестирования и файл доп. функции WebVitals.

// ? Кстати, эта сборка работает с Webpack и Babel, а следовательно обладает и Hot-reload функционалом, а также Babel преобразовывает синтаксис JSX в нативный JavaScript.

// |===:===:===:===>
/** links:
 * (Create React App): https://github.com/facebook/create-react-app
 * (plugin transform react jsx): https://babeljs.io/docs/en/babel-plugin-transform-react-jsx
 * (react plugin for Chrome): https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
 * */
