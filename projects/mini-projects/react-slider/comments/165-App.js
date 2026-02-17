import {useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// 165.1.0 Представим ситуацию, что слайдер загружает изображения посредством запросов на сервер. Это вполне рабочая модель и чтобы её эмулировать создадим функцию "getImages", которая будет возвращать массив с изображениями. ↓
/*const getImages = () => {
  console.log('getting images');

  return ['/assets/img/01.webp', '/assets/img/02.webp', '/assets/img/03.webp', '/assets/img/04.webp', '/assets/img/05.webp', '/assets/img/06.webp', '/assets/img/07.webp', '/assets/img/08.webp', '/assets/img/09.webp', '/assets/img/10.webp', '/assets/img/11.webp', '/assets/img/12.webp'];
};*/

const generateRandomNumber = () => Math.floor(Math.random() * (13 - 1) + 1);

const Slider = (props) => {
  const [slide, setSlide] = useState(generateRandomNumber);
  const [autoplay, setAutoplay] = useState(false);

  // 165.2.0 Итак, мы обернули нашу функцию в хук «useCallback», но поведение не изменилось и функция продолжает вызываться всякий раз при ререндере компонента Slider. Почему же так происходит?... ↓
  const getImages = useCallback(() => {
    console.log('getting images');

    return ['/assets/img/01.webp', '/assets/img/02.webp', '/assets/img/03.webp', '/assets/img/04.webp', '/assets/img/05.webp', '/assets/img/06.webp', '/assets/img/07.webp', '/assets/img/08.webp', '/assets/img/09.webp', '/assets/img/10.webp', '/assets/img/11.webp', '/assets/img/12.webp'];
  }, [slide]);

  // 165.2.2 Затем срабатывают "эффекты", после чего компонент ждёт каких-то изменений. Когда меняется его стейт, то вызывается повторный рендер компонента, вызывается функция по генерации картинок и весь цикл повторяется вновь. ↓
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
    console.log('log');
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

  return (
    <Container>
      <div className="slider w-50 m-auto">
        {/* 165.1.1 Теперь здесь полученный массив мы переберём, подставляя изображения в разные слайды. */}
        {/* ? 165.1.2 Логичнее было бы поместить это действие в хук «useEffect», т.е. после того как компонент создался, он делает запрос на сервер и на базе ответа от сервера генерируется вёрстка. Но ситуации бывают разные. Если мы будем кликать по кнопкам, то заметим, что каждый клик у нас вновь вызывается наша фиктивная функция запроса на сервер, а это сильная просадка по скорости работы приложения. Поэтому нам хотелось бы как-то закэшировать (или более правильно сказать «мемоизировать») эту функцию, чтобы она вызывалась разово или по необходимости, а не на каждый ререндер компонента. Для этого и нужен хук «useCallback». Во время рендера он вернёт функцию (точнее ссылку на неё), вместо пересоздания её заново, что существенно оптимизирует производительность приложения. Когда нужна? 1) Передача функций в дочерние компоненты, обернутые в React.memo; 2) Если функция используется как зависимость в другом хуке (например, в useEffect). ↑ */}
        {/* 165.2.1 Если пойти по логическому пути работы компонента, то сначала срабатывает его рендер и внутри отрабатывает функция генерации картинок. ↑ */}
        {/* ? 165.2.3 И дело в том, что вызов функции будет здесь идти всё равно каждый раз, т.к. у нас после имени функции "()". И мемоизировать эту функцию не удастся. Поэтому в документации сказано, что этот приём полезен при передаче функции дочернему компоненту, который не должен каждый раз меняться. ↓ */}
        {/* 165.3.4 Теперь мы можем заменить этот кусочек вёрстки новым компонентом с 1-им пропом для передачи функции. */}
        {/*{ getImages().map((url, index) => (
            <img key={index} className="d-block w-100" src={url} alt={`Slide #${++index}`}/>
          )) }*/}
        <Slide getImages={getImages}/>
        <div className="text-center mt-5">Active slide #{slide} <br/> {autoplay ? 'auto' : null}</div>
        <div className="buttons text-center mt-3">
          <button className="btn btn-primary me-2" onClick={previousSlide}>-1</button>
          <button className="btn btn-primary me-2" onClick={nextSlide}>+1</button>
          <button className="btn btn-primary me-2" onClick={toggleAutoplay}>Toggle Autoplay</button>
        </div>
      </div>
    </Container>
  );
};

// 165.3.0 Реализуем это на примере и для этого создадим дочерний компонент, который будет отвечать за слайды в слайдере. В качестве одного из пропсов он будет получать функцию.
const Slide = ({getImages}) => {
  // 165.3.1 Внутри будет стейт для изображений, в котором изначально пустой массив. Его мы заполним изображениями с нашего фиктивного сервера.
  const [images, setImages] = useState([]);

  // 165.3.2 Далее применим хук useEffect и скажем, что когда компонент будет создан и если он начнёт ререндериться, то мы будем менять кол-во изображений внутри слайдера. Туда помещается коллбэк-функция, которая запускается всякий раз, когда создаётся компонент, либо обновляется. Там будет запускаться метод "setImages", который сохранит новый стейт в компоненте и в него поместим нашу функцию запроса на сервер getImages. А в зависимости можно поместить проп, который приходит извне, т.е. именно функцию "getImages", т.к. она может вполне измениться и только в этом случае нам нужно запускать этот useEffect повторно.
  useEffect(() => {
    setImages(getImages());
  }, [getImages]);

  // 165.3.3 А здесь мы будем возвращать генерацию картинок циклом, как было раньше в вёрстке сверху. ↑
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