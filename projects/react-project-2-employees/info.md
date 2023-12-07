126 - Начало работы
128 - Динамическое создание компонентов, на основе локальной базы данных из переменной, используя пропсы.
  https://www.npmjs.com/package/classnames
133 - Практика состоянии на проекте (реализация присвоения премии по клику на печенье)
134 - Работа с формами управляемые и неуправляемые компоненты
  (EN Новая документация): https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  (Базовая документация): https://ru.reactjs.org/docs/forms.html
  (Полезная статья): https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
135 - Иммутабельность состояния и собственные события
  (EN Новая документация): https://react.dev/learn/updating-objects-in-state
  (Статья про findIndex): https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  (Статья про react-id-generator): https://www.npmjs.com/package/react-id-generator
  (uniqueId от lodash): https://lodash.com/docs/4.17.15#uniqueId
  (UUID): https://www.npmjs.com/package/uuid
  (Перевод кусочка новои документации): https://reactdev.ru/archive/react16/optimizing-performance/#using-immutable-data-structures
  (Статья про иммутабельность): https://habr.com/ru/company/developersoft/blog/302118/
/.°===----==°.\
Homework 1:
- В прошлом мы уже подготовили часть функционала для добавления нового сотрудника в employee-add-form.jsx. Нужно его завершить, чтобы новый сотрудник появлялся в массиве данных стейт в app.jsx; (функционал частично похож на удаление, только наоборот, помним про принципы иммутабельности!)
- В новом объекте должно быть поле "id", при создании нужно будет его сгенерировать. Можно либо создать новое свойство "maxID" и когда создаётся новый сотрудник, то мы прибавляем к этому maxID 1. (Можно сделать вариант посложнее, написав функцию по генерации случайного ID, либо взять готовый пакет из npmjs.)
- Не забыть использовать событие onSubmit для отправки формы.

Homework 2:
- Пофиксить баг, чтобы нельзя было создавать сотрудников с пустым контентом.