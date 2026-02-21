import {useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// ? 169.4.0 Итак, на этом примере формы видно, что нам часто приходится повторять код, записывать значения строк ввода в стейт и обрабатывать его. И когда полей ввода мало, как здесь, то это не та проблема, что требует внимания, но часто бывает, что полей формы много, да и самих форм не одна (или аналогичные задачи). И вот мы уже сталкиваемся с массивным повторением кода по всему проекту. И чтобы этого избежать мы могли бы написать какую-то универсальную функцию, которая будет это решать.
// 169.5.0 Теперь, когда наш самописный реакт-хук готов, то научимся его использовать. При запуске хука/функции у нас вернётся объект, который можно деструктурировать на переменные. ↓
function useInputWithValidation(initialValue) {
  // 169.4.1 Создадим функцию вне компонента формы, которую назовём начиная со слова "use", что отвечает неймингу реакт-хуков. Т.к. мы заранее не знаем, что будет в изначальном значении стейта, то поставим туда параметр "initialValue" для универсализации функции.
  const [value, setValue] = useState(initialValue);

  // 169.4.2 Далее мы создадим метод, который будет данные из строки ввода записывать в стейт.
  const onChange = evt => setValue(evt.target.value);

  // 169.4.3 Т.к. нам нужна ещё и валидация для строки ввода, то запишем и эту функцию сюда.
  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // 169.4.4 Также мы вернём из этой функции стейт и функции сохранения данных в стейт и валидации.
  return {value, onChange, validateInput};
}

  const Form = () => {
  // const [emailValue, setEmailValue] = useState('');
  // const [textareaValue, setTextareaValue] = useState('');

  // 169.2.0 Представим, что у нас задание написать метод валидации данных email для строки ввода. Напишем функцию для этой задачи.
  /*const validateInput = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };*/

  // ? 169.7 Также стоит сказать, что при каждом вызове хука создаётся свой собственный стейт, т.е. они получаются изолированными друг от друга. Также обычно эти хуки выделяют в отдельных компонент для возможности использования повсюду в приложении. Такие хуки могут содержать любую логику, а также другие хуки, например «useEffect». Мы можем создавать такие хуки, например, для запроса на сервер или запуска таймера/анимации или подписки на сервис.
  // 169.5.1 Теперь вместо того, что мы писали здесь раньше, мы можем создать переменную и присвоить ей вызов нашего нового хука. Она будет у нас использоваться для нашего элемента input.
  const input = useInputWithValidation('');

  // 169.5.2 То же сделаем и для элемента textarea. Внутри этих переменных теперь и стейты и методы, которые мы можем использовать.
  const textarea = useInputWithValidation('');

  // 169.2.1 Также создадим переменную, в которой будет результат выполнения функции validateInput, а аргументом в неё будет помещаться стейт "text". И если функция вернёт true мы будем возвращать один Bootstrap-класс, а если нет — другой.
// 169.5.3 Это условие теперь тоже переделаем под работу с нашим самодельным хуком. ↑
//   const color = validateInput(emailValue) ? 'text-success' : 'text-danger';
  const color = input.validateInput() ? 'text-success' : 'text-danger';

  return (
    <Container>
      <form className="w-50 border mt-5 p-3 m-auto">
        <div className="mb-3">
          {/* 169.1 Здесь мы добавим строку ввода с атрибутом "readOnly", чтобы ввод из второй строки ввода помещать в стейт "text", а затем отображать в первой. */}
          {/* 169.3 Добавим также в первую строку ввода текст из второго стейта textArea, которых будет получаться из ввода в элемент textarea. ↑ */}
          {/* 169.6 Также и здесь мы уже применим свойство стейта из нашего хука. ↑ */}
          <label htmlFor="output" className="form-label mt-3">Output</label>
          {/*<input value={`Email: ${emailValue} | Note: ${textareaValue}`}*/}
          <input value={`Email: ${input.value} | Note: ${textarea.value}`}
                 type="text"
                 className="form-control bg-warning-subtle"
                 id="output"
                 disabled/>
          <label htmlFor="email" className="form-label mt-3">Email address</label>
          {/*<input onChange={(evt) => setEmailValue(evt.target.value)}*/}
          <input onChange={input.onChange}
                 type="email"
                 // value={emailValue}
                 value={input.value}
                 className={`form-control ${color}`}
                 id="email"
                 placeholder="name@example.com"/>
        </div>
        <div className="mb-3">
          <label htmlFor="textarea" className="form-label">Note</label>
          {/*<textarea onChange={(evt) => setTextareaValue(evt.target.value)}*/}
          <textarea onChange={textarea.onChange}
                    value={textarea.value}
                    className="form-control"
                    id="textarea"
                    rows="3"></textarea>
        </div>
      </form>
    </Container>
  );
};

function App() {
  return (
    <Form/>
  );
}

export default App;