// import {Component} from 'react';
import {useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// 163.1.0 Итак, здесь у нас был компонент слайдера написанный на классовых компонентах, но его мы закомментируем...
/*class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autoplay: false,
            slide: 0
        }
    }

    changeSlide = (i) => {
        this.setState(({slide}) => ({
            slide: slide + i
        }))
    }

    toggleAutoplay = () => {
        this.setState(({autoplay}) => ({
            autoplay: !autoplay
        }))
    }

    render() {
        return (
            <Container>
                <div className="slider w-50 m-auto">
                    <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                    <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
                    <div className="buttons mt-3">
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(-1)}>-1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(1)}>+1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={this.toggleAutoplay}>toggle autoplay</button>
                    </div>
                </div>
            </Container>
        )
    }
}*/

// 163.3.1 Представим, что у нас есть некая функция, которая делает вычисления. Для примера возьмём генератор случайного числа в диапазоне от 1 до 12. ↓
const generateRandomNumber = () => {
  console.log('Random number generated');
  return Math.floor(Math.random() * (12 - 1) + 1);
}

// 163.1.1 ... и перепишем ту же логику, но уже в виде функционального компонента. Для этого создадим переменную стейта и присвоим ей вызов хука "useState". По сути своей этот хук — это спец. функция, которая аргументом принимает изначальное значение стейта, а возвращает в переменную собственно сам стейт и функцию, меняющую этот стейт.
const Slider = (props) => {

  // const myState = useState();
  // 163.1.2 Однако, для удобства принято записывать вместо переменной сразу в деструктурированном состоянии, где функцию обычно принято называть "set(называние стейта)".
  // 163.3.0 Остался ещё оптимизационный вопрос по вычислению начального стейта. Итак, в чём проблема? Если изначальное состояние стейта должно вычисляться в какой-то операции, то мы её можем передавать внутрь хука «useState». ↑
  // 163.3.2 Также надо помнить, что если мы запишем эту функцию с "()" то она будет запускаться не один раз, а каждый раз при обновлении компонента, в котором она находится.
  // ? 163.4 Ещё раз для напоминания, что при каждом вызове метода сохранения стейта у нас будет ререндериться весь компонент, в котором он находится.
  const [slide, setSlide] = useState(generateRandomNumber);
  const [autoplay, setAutoplay] = useState(false);

  // ? 163.2.0 Кстати, можно также создать и несколько стейтов в одну строку. Этот способ, на мой взгляд менее понятен для прочтения, т.к. здесь уже стейт у нас будет объектом и при сохранении мы тоже будем обновлять этот объект.
  const [state, setState] = useState({slide: 0, autoplay: false});

  // 163.2.1 И тогда наши функции будут выглядеть следующим образом. И здесь нужно помнить, что в отличие от классовых компонентов, где можно было записывать в возврат результата-коллбэка лишь изменяемое свойство, то здесь так делать уже нельзя, иначе остальные свойства объекта state пропадут. Поэтому мы используем spread-оператор для добавления всех остальных свойств, которые у нас были в стейте в этот объект перед обновлением его. Также заметим, что т.к. мы работаем с объектом "state", то и обращаемся мы к нему для опроса значения свойства в этом объекте "state.slide" или "state.autoplay". Также и в вёрстке нам придётся обращаться к ним через объект "state.".
  // 163.2.2 Поскольку данный способ не слишком понятен для чтения и в нём проще запутаться, то почти всегда используют первый: "для каждого стейта — отдельная строчка".
  // const changeSlide = (slideIndex) =>
  //   setSlide((state) => ({...state, slide: state.slide + slideIndex}));
  // const toggleAutoplay = () =>
  //   setAutoplay((state) => ({...state, autoplay: !state.autoplay}));

  // 163.1.3 Также, при создании функции, которая меняет номер слайда, не забудем, что когда мы создаём функцию, где след. значение зависит от предыдущего, то для стабильной работы требуется callback-функция. Об этом важно помнить, т.к. на это может влиять точность вычислений и правильная работа приложения.
  const changeSlide = (slideIndex) => setSlide((slide) => slide + slideIndex);

  const toggleAutoplay = () => setAutoplay((autoplay) => !autoplay);

  return (
    <Container>
      <div className="slider w-50 m-auto">
        <img className="d-block w-100"
             src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
             alt="slide"/>
        <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}
        </div>
        <div className="buttons mt-3">
          <button className="btn btn-primary me-2"
                  onClick={() => changeSlide(-1)}>
            -1
          </button>
          <button className="btn btn-primary me-2"
                  onClick={() => changeSlide(1)}>
            +1
          </button>
          <button className="btn btn-primary me-2"
                  onClick={toggleAutoplay}>
            toggle autoplay
          </button>
        </div>
      </div>
    </Container>
  );
};


function App() {
  return (
    <Slider/>
  );
}

export default App;
