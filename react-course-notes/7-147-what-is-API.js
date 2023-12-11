// * === Что такое API и как работают современные приложения? (147) === * \\

// ? На вопрос «Что такое API?» наверное проще всего ответить: «Это набор готовых функций и свойств, который мы можем использовать.»

// Как пример, представим, что мы разрабатываем мобильное приложение, которому необходимо взаимодействовать с Bluetooth, акселерометром или яркостью экрана. Нам необходимо обратиться к программным внутренностям телефона и сообщить, что в такой-то момент сделай пожалуйста такие-то действия с Bluetooth. Эти определённые программные внутренности и называются API. Это уже набор, вшитых в телефон функций к которым мы будем обращаться.

// * Также и работа с DOM-деревом происходит через DOM API. Там есть такие команды, как querySelector, getElementsById и т.д. Это всё тоже часть функционала DOM API.

// ? Нам постоянно будут встречаться различные API, которые нам потребуются в работе. Есть также экспериментальные, вроде доступа к Bluetooth через браузер (см. ссылку ниже), но надо быть осторожными с подобными API, учитывать их очень маленькую кроссбраузерность.

// * Или если мы вспомним тот же сервис JSON-placeholder, то это и есть фиктивный API серверной части для тестирования и прототипирования наших продуктов.

// ? Ещё есть определение, что «API это договор между нами, где мы обязуемся следовать правилам использования API и им, где он обязуется выполнять какие-то задачи».
/* Здесь будет 3 важных этапа на программном уровне, которые необходимо знать для работы с любым API:
  1) Как мы выполняем саму операцию: (в случае с JSON-placeholder) мы можем отправить GET-запрос, POST-запрос и др. на сервер, либо запустить скрипт в той среде, где активно работает этот API (в терминале редактора кода VS Code мы не можем запустить команду alert() или document.querySelector(), т.к. в редакторе кода просто нет DOM API);
  2) Какие данные мы передаём API: например, это могут быть данные для регистрации или пароль для доступа к определённым функциям;
  3) Результат: это может быть набор каких-то данных или активация определённой сторонней функции, например включился поиск Bluetooth-устройств.
*/

// ? Пока это необходимый минимум, но есть также ещё куча информации про классификации, разделения и т.п., но это уже больше про их разработку. (Внизу есть понятная статья с habr.com про API)

// |===:===:===:===>
/** links:
*  (Web Bluetooth API): https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth
*  (Объёмное API по книгам «Игры престолов»): https://anapioficeandfire.com/
*  (Marvel API): https://developer.marvel.com/
*  (Poke API): https://pokeapi.co/
*  (Weather API): https://openweathermap.org/api
*  (Public APIs): https://github.com/public-apis/public-apis
*  (Статья про API): https://github.com/public-apis/public-apis
*/
