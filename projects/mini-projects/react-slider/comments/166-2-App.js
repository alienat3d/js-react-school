import {useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// 166.2.0 Чтобы рассмотреть действие хука «useMemo» представим, что вычисление общего кол-ва изображений в слайдере это сложная математическая задача, способная на несколько секунд подвесить устройство наших пользователей и нам не хочется её вызывать каждый раз при обновлении этого компонента, если только действительно не требуется перерасчёт. ↓
const countTotalSlides = (num) => {
  console.log('Counting total slides...');
  return num + 10;
};

const generateRandomNumber = () => Math.floor(Math.random() * (13 - 1) + 1);

const Slider = (props) => {
  const [slide, setSlide] = useState(generateRandomNumber);
  const [autoplay, setAutoplay] = useState(false);

  const getImages = useCallback(() => {
    return ['/assets/img/01.webp', '/assets/img/02.webp', '/assets/img/03.webp', '/assets/img/04.webp', '/assets/img/05.webp', '/assets/img/06.webp', '/assets/img/07.webp', '/assets/img/08.webp', '/assets/img/09.webp', '/assets/img/10.webp', '/assets/img/11.webp', '/assets/img/12.webp'];
  }, [slide]);

  useEffect(() => {
    autoplay ? console.log('Autoplay is on') : console.log('Autoplay is off');
  }, [autoplay]);

  useEffect(() => {
    document.title = `Slide: #${slide}`;

    window.addEventListener('click', logging);

    return () => {
      window.removeEventListener('click', logging);
    };
  }, [slide]);

  function logging() {
    // console.log('log');
  }

  const previousSlide = () => {
    if (slide > 1) setSlide(slide => --slide);
  };

  const nextSlide = () => {
    if (slide < 12) setSlide(slide => ++slide);
  };

  const toggleAutoplay = () => {
    setAutoplay((autoplay) => !autoplay);
  };

  // 166.2.1 И здесь, при помощи, только что созданной функции, мы будем подсчитывать кол-во слайдов.
  // 166.2.3 Итак, нам бы хотелось как-то запоминать значение выполнения этой функции, чтобы она не запускалась всякий раз при ререндере родительского компонента, либо только в тот момент, когда это действительно нужно. И в этом нам поможет хук «useMemo». Чтобы это работало нам нужно обернуть вызов функции "countTotalSlides" в хук "useMemo", а также возвращать её через внутреннюю коллбэк-функцию. И не забудем вторым аргументом хука зависимости, от которых будет зависеть работа хука.
  // ? 166.3.0 Ещё раз по шагам как это работает: при первом рендере компонента функция countTotalSlides выполняется и её результат сохраняется в константу totalSlides. Потом, когда родительский компонент обновляется, Реакт видит, что значение totalSlides мемоизировано с помощью хука useMemo и проверяет не обновлялось ли одно из его зависимостей и если нет, то оставляет значение прежним, не запуская внутреннюю функцию.
  // ? 166.3.1 Важно ещё помнить, что в useMemo нельзя помещать побочные эффекты типа запросов, подписок и подобным, относящимся к эффектам манипуляциям, т.к. хук запускается по время рендера и может привести к багам.
  const totalSlides = useMemo(() => {
    return countTotalSlides(slide);
  }, [slide]);

  // ? 166.4.0 Ещё можно добавить не совсем очевидное применение хука с объектами, которые можно также мемоизировать при необходимости.
  // 166.4.2 Поэтому нам бы хотелось, чтобы этот объект был закэширован и соответственно хук useEffect ниже запускал свою функцию, когда стили действительно поменяются, т.е. когда изменится значение slide. Поэтому обернём этот объект также в хук useMemo и зависимостью у него будет стейт slide. Теперь объект style останется неизменным, пока значение slide не изменится, а значит и useEffect ниже не будет запускаться каждый раз, расходуя ресурсы устройств пользователей.
  const style = useMemo(() => ({color: slide > 4 ? 'slate' : 'lightgray'}), [slide]);

  // 166.4.1 И добавим ещё useEffect, чтобы следить за изменением объекта стилей и выдавать сообщение в консоль. И тут мы сразу видим проблему, что несмотря на то, что в зависимостях прописан style, но console.log внутри этого хука запускается всё равно, когда компонент обновляется. Происходит так потому, что с ререндером каждый раз заново создаётся объект "style", а в JS идентичные по внутренностям объекты считаются разными. Соответственно проверка в зависимостях хука не проходит на соответствие и хук запускает функцию внутри снова и снова. Из нативного JS мы знаем, что объекты - ссылочный тип данных и потому сравниваются они тоже по ссылкам, которые вне зависимости от содержимого объекта не равны друг другу. Поэтому и здесь Реакт считает, что раз объект style пересоздался, то это новый объект и снова запускает функцию в хуке. ↑
  useEffect(() => {
    console.log('Styles are changed');
  }, [style]);

  return (
    <Container>
      <div className="slider w-50 m-auto">
        <Slide getImages={getImages}/>
        <div className="text-center mt-5">Active slide #{slide} <br/> {autoplay ? 'auto' : null}</div>
        {/* 166.2.2 И здесь мы будем выводить общее кол-во слайдов. ↑ */}
        <div className="text-center mt-5" style={style}>Total slides {totalSlides}</div>
        <div className="buttons text-center mt-3">
          <button className="btn btn-primary me-2" onClick={previousSlide}>-1</button>
          <button className="btn btn-primary me-2" onClick={nextSlide}>+1</button>
          <button className="btn btn-primary me-2" onClick={toggleAutoplay}>Toggle Autoplay</button>
        </div>
      </div>
    </Container>
  );
};

const Slide = ({getImages}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(getImages());
  }, [getImages]);

  return (
    <>
      {images.map((url, index) =>
        <img key={index} className="d-block w-100" src={url} alt={`Slide #${++index}`}/>)}
    </>
  );
};

function App() {
  const [sliderStatus, setSliderStatus] = useState(true);

  const toggleSliderStatus = () => {
    setSliderStatus((sliderStatus) => !sliderStatus);
  };

  return (
    <>
      {sliderStatus && <Slider/>}
      <button className="position-absolute bottom-0 btn btn-warning m-2" onClick={toggleSliderStatus}>
        Turn {sliderStatus ? 'Off' : 'On'} Slider
      </button>
    </>
  );
}

export default App;