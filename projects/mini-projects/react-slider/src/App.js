import {useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const generateRandomNumber = () => Math.floor(Math.random() * (13 - 1) + 1);

const Slider = (props) => {
  const [slide, setSlide] = useState(generateRandomNumber);
  const [autoplay, setAutoplay] = useState(false);

  const getImages = useCallback(() => {
    console.log('getting images');

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