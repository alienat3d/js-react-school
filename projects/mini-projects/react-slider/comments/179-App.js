import {useReducer, useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// 179.2.1 Функция-редьюсер отвечает за модификацию состояние, заметим, не вызов изменения, как это делает метод "dispatch". Итак, создадим здесь эту функцию. У неё есть два параметра "state" & "action", где "state" — это текущее состояние (до его изменения), которое мы будем модифицировать, а "action" — то действие, что будет модифицировать стейт. ↓
// 179.3.1 И вот на основе того, какое значение было передано с кнопки в функцию reducer (а точнее в её параметр action), то таким образом мы и будем менять/модифицировать стейт разными способами. Для этого используем конструкцию "switch case". В параметре switch мы будем опрашивать значение action.type и на этой основе выполнять те или иные действия. Например, если в свойстве объекта action "type" значение "toggle", то мы будем возвращать свойство autoplay с булевым значением противоположным предыдущему, но, чтобы до текущего значения дотянуться мы указываем свойство "autoplay" от "state". В случае с "slow" или "fast" мы передадим разные числовые значения, означающие миллисекунды между сменой слайдов, а если ничего не совпадёт, то выкидываем ошибку с помощью throw new Error. ↓
function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return {autoplay: !state.autoplay};
    case 'slow':
      return {autoplay: 5000};
    case 'fast':
      return {autoplay: 1000};
    case 'custom':
      // 179.5.3 После чего мы будем записывать значение в миллисекундах в стейт autoplay.
      return {autoplay: convertSecondsToMilliseconds(action.payload)};
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

// 179.4.1 Создадим такую функцию, которая будет выполнять какие-то действия с аргументом, но в итоге вернёт объект со стейтом. ↓
function init(initial) {
  // ...здесь выполняются какие-то действия с initial...
  return {autoplay: initial};
}

// 179.5.2 Оно будет проходить проверку, что не равно 0 и там числовое значение, а затем конвертироваться в миллисекунды, понимаемые JS. ↑
function convertSecondsToMilliseconds(value) {
  if (!value) return false;
  return Math.round(value) * 1000;
}

// 179.4.2.1 ..., которую извлечём из пропсов здесь. ↓
const Slider = ({initial}) => {
  const [slide, setSlide] = useState(0);
  // const [autoplay, setAutoplay] = useState(false);
  // ? 179.2.0 Итак, мы пока закомментируем обычный стейт и вместо него подставим «useReducer» (как мы уже говорили его можно назвать альтернативным «useState»). Здесь у нас также будет две сущности в массиве, первая — название стейта, а вторая функция изменяющая его, которую принято называть "dispatch" (её можно именовать иначе, но лучше не делать это без особой надобности, а если потребуется второй useReducer в том же компоненте, то можно именовать "dispatchAutoplay", например). Сам хук примет 3 аргумента: 1) функцию-редьюсер; 2) начальное состояние; 3) ленивое создание начального состояния. ↑
  // 179.3.2 В хук мы первым аргументом передаём функцию-редьюсер, а вторым — начальное значение. Вторым аргументом может быть как примитивный тип данных, так и объект.
  // 179.4.0 Но в useReducer можно также передать и 3-й аргумент — функцию, лениво создающую изначальное значение. Это может быть полезно в асинхронных операциях или после определённого действия. ↑
  // const [autoplay, dispatch] = useReducer(reducer, {autoplay: false});
  // 179.4.2.0 И вот здесь мы уже вместо объекта передадим переменную initial...
  // 179.4.3 Т.о. первичное значение сперва пройдёт через функцию init. ↓
  const [autoplay, dispatch] = useReducer(reducer, initial, init);

  function changeSlide(i) {
    setSlide(slide => slide + i);
  }

  return (
    <Container>
      <div className="slider w-50 m-auto">
        <img className="d-block w-100" src="/assets/img/01.webp" alt="slide"/>
        <div className="text-center mt-5">Active slide {slide} <br/>{autoplay.autoplay ? 'auto' : null} </div>
        <div className="buttons mt-3">
          <button className="btn btn-primary me-2"
                  onClick={() => changeSlide(-1)}>-1
          </button>
          <button className="btn btn-primary me-2"
                  onClick={() => changeSlide(1)}>+1
          </button>
          {/*<button
                        className="btn btn-primary me-2"
                        onClick={() => setAutoplay(!autoplay)}>toggle autoplay</button>*/}
          {/* 179.3.0 Ну, и добавим сюда ещё пару кнопок для нашего функционала. Первая у нас будет запускать метод dispatch и в него передадим объект. И если прежде (см. закомментированный элемент кнопки вверху) мы передавали изменение стейта (либо коллбэк-функцию, изменяющую значение стейта), то когда вызывается метод dispatch, мы должны передавать объект, у которого главное свойство "type". В других кнопках в dispatch мы поставим "slow" и "fast", для более медленной или быстрой скорости прокрутки. И вот этот самый объект и есть тот самый "action" в функции-редьюсере. ↑ */}
          <button className="btn btn-primary me-2"
                  onClick={() => dispatch({type: 'toggle'})}>toggle autoplay
          </button>
          <button className="btn btn-primary me-2"
                  onClick={() => dispatch({type: 'slow'})}>slow autoplay
          </button>
          <button className="btn btn-primary me-2"
                  onClick={() => dispatch({type: 'fast'})}>fast autoplay
          </button>
          {/* ? 179.5.0 А что, если нам нужно передать какое-то определённое значение в стейт (например установить скорость слайдера из значения в инпуте)? Можно ли это сделать методом dispatch? Да, в таком случае мы просто добавим в этот объект, который передаётся в параметр "action", новое свойство "payload" (можно называть на усмотрение разработчика, но общепринято такое название). Кстати, если нам понадобятся какие-то ещё свойства, то мы можем их также создавать и передавать. */}
          {/* 179.5.1 Итак, мы добавили новый инпут, который будет передавать числовые значения, введённые пользователем через свойство payload. ↑ */}
          <div class="input-group my-2 w-75">
            <input type="number" class="form-control" aria-label="Custom slider autoplay speed in seconds"
                   placeholder="Enter custom slider autoplay in seconds"
                   onChange={(evt) => dispatch({type: 'custom', payload: evt.target.value})}/>
            <div class="input-group-append">
              <span class="input-group-text">seconds</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// 179.4.2.2 А укажем её изначальное значение здесь. ↑
function App() {
  return (
    <Slider initial={false}/>
  );
}

export default App;