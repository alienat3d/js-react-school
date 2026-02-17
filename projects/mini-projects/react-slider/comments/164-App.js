import {useState, Component, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// 164.1.0 Сначала рассмотрим как у нас это работало в классовых компонентах.
/*class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autoplay: false,
            slide: 0
        }
    }

    // 164.1.1 Здесь мы используем хук жизненного цикла классового компонента «componentDidMount», чтобы менять название вкладки, в зависимости от номера слайда при загрузке компонента.
    componentDidMount() {
      document.title =`Slide: #${this.state.slide}`;
    }

    // 164.1.2 Также, при помощи «componentDidUpdate» мы будем обновлять название вкладки всякий раз, когда будет ререндер компонента. Теперь, когда мы будем изменять стейт, то будет происходить "эффект", то бишь будет запускаться эта операция, которая сменит название вкладки страницы.
    // 164.1.3 И вот, мы уже видим слабости классовых компонентов, здесь у нас происходит дублирование кода, которого мы в идеале хотели бы избегать. Это сделать мы можем как раз таки с помощью хука «useEffect» в функциональном компоненте ниже. ↓
    componentDidUpdate() {
      document.title =`Slide: #${this.state.slide}`;
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

const generateRandomNumber = () => Math.floor(Math.random() * (13 - 1) + 1);

const Slider = (props) => {
  // ? 164.2.3 Ну, и стоит ещё добавить, что функции пересоздаются с некоторыми оговорками. Например, хук стейта «useState» не перезапускается, т.к. Реакт уже видит, что стейт был создан и не перезапускает этот метод заново, а только обновляет данные в нём с помощью set-функции. ↓
  const [slide, setSlide] = useState(generateRandomNumber);
  const [autoplay, setAutoplay] = useState(false);

  // 164.2.0 Итак, мы добавим вызов метода хука «useEffect», который будет принимать коллбэк-функцию, где будут выполняться какие-то операции.
  // ? 164.2.1 Такая функция запоминается и прикрепляется к компоненту, в котором находится. И она будет вызвана, каждый раз, когда компонент обновится (смена пропсов, стейта или forceUpdate()).
  // ? 164.2.2 Как вообще этот хук отслеживает изменения? Принцип основан на обычном замыкании функций в Javascript, ведь эти переменные остаются в области видимости, как в обычной функции. Однако стоит также знать, что эта коллбэк-функция, заключённая внутри «useEffect» меняется с каждым рендером компонента. Т.е. она как бы пересоздаётся каждый раз при вызове функции родительского компонента. Это нужно, чтобы не было багов с замыканиями и можно было получать актуальные данные из состояния. (Более детальный разбор этой механики есть в документации в ссылках) ↑
  // 164.3.0 Однако, у нас есть здесь одна небольшая неприятность, связанная с растратой ресурсов в пустую. Дело в том, что у нас тут есть также и другой стейт "autoplay" и в момент нажатия кнопки, меняющей этот стейт, весь компонент будет ререндериться и запускать функцию внутри хука «useEffect». А нам бы хотелось, чтобы она запускалась только при изменении стейта "slide".
  // 164.3.1 В классовом компоненте мы могли бы передавать аргумент предыдущего стейта и сравнивать его с актуальным. А здесь у нас даже более простой синтаксис. У хука «useEffect» есть и второй аргумент, который выглядит как массив. Если этот массив пуст, то это значит, что функция запустится лишь 1 раз в самом начале и больше не будет запускаться. А если мы передадим туда название стейта или пропа, то она, соответственно, запустится при изменении данных в этом стейте или пропе (хук будет как бы фильтровать за чем следить).
  // ? 164.3.2 На самом деле этот момент довольно важен для оптимизации работы приложения и может существенно ускорить его работу, если хорошенько всё продумать и исключить лишних срабатываний особенно ресурсозатратных операций или при работе с сервером. Представим, что в useEffect грузятся данные, например, как в случае с проектом ComicVain Wiki — персонажи. И если каждый ререндер компонента будет вызывать повторный запрос на сервер с ререндером всего списка персонажей — ты мы не только нагружаем сервер избыточными запросами, а ещё и заставляем устройство пользователя пыхтеть зря. Так делать не нужно. И, с помощью второго аргумента useEffect, мы можем сделать загрузку персонажей только в случае, если это действительно необходимо по какому-то параметру.
  // ? 164.3.3 Конечно мы можем создавать несколько useEffect, комбинируя их под разные задачи. Это даже желательно, если мы будем создавать свой собственный useEffect под каждое отдельное логически законченное действие.
  useEffect(() => {
    autoplay ? console.log('Autoplay is on') : console.log('Autoplay is off');
  }, [autoplay]);

  // 164.4.3 Далее мы добавим обработчик события по клику на всё окно с помощью браузерного API и глобального объекта "window". Затем, чтобы удалить этот слушатель события при удалении со страницы слайдера, нам нужно вернуть коллбэк-функцию с удалением этого слушателя в ней. ↓
  useEffect(() => {
    console.log('effect');
    document.title = `Slide: #${slide}`;

    window.addEventListener('click', logging);

    return () => {
      window.removeEventListener('click', logging);
    };
  }, [slide]);

  // ? 164.4.0 Ещё важный момент, когда речь об оптимизации приложения, что мы всегда должны помнить про те хуки, которые со слушателями каких-то событий. Вспоминаем, что мы должны снимать слушатель всякий раз, когда он больше не нужен. А также таймауты, интервалы и создания соединений между различными сервисами. Все они называются «подписками» — всё то, что может висеть в памяти какое-то время и обмениваться данными с компонентом. Все подписки нужно удалять при удалении компонента, чтобы не было утечек памяти "memory leak".
  // ? 164.4.1 В классовых компонентах мы это делали через хук жизненного цикла «componentWillUnmount», а здесь это реализуется при помощи возвращения коллбэк-функции из него.
  // 164.4.2 Итак, для демонстрации мы создадим специальную функцию логирования, которая просто будет выводить сообщение в консоль. ↑
  function logging() {
    console.log('log');
  }

  const changeSlide = (slideIndex) => setSlide((slide) => slide + slideIndex);

  const toggleAutoplay = () => setAutoplay((autoplay) => !autoplay);

  return (
    <Container>
      <div className="slider w-50 m-auto">
        <img className="d-block w-100"
             src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
             alt="slide"/>
        <div className="text-center mt-5">Active slide #{slide} <br/> {autoplay ? 'auto' : null}
        </div>
        <div className="buttons text-center mt-3">
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
            Toggle Autoplay
          </button>
        </div>
      </div>
    </Container>
  );
};

// 164.4.4 Также нам понадобится функционал, который будет убирать слайдер со страницы, чтобы протестировать наш новый функционал по удалению слушателя вслед за слайдером. Это можно легко сделать добавив родительскому компоненту "App" стейт-флажок "sliderStatus", а затем менять его на противоположное значение при помощи кнопки и убирать или показывать слайдер условным рендером.
function App() {
  const [sliderStatus, setSliderStatus] = useState(true);

  const toggleSliderStatus = () => {
    setSliderStatus((sliderStatus) => !sliderStatus);
  };

  return (
    <>
      {sliderStatus && <Slider/>}
      <button className="position-absolute bottom-0 btn btn-warning m-2"
              onClick={toggleSliderStatus}>
        Turn {sliderStatus ? 'Off' : 'On'} Slider
      </button>
    </>
  );
}

export default App;
