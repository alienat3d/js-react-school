import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const generateRandomNumber = () => Math.floor(Math.random() * (13 - 1) + 1);

const Slider = (props) => {
  const [slide, setSlide] = useState(generateRandomNumber);
  const [autoplay, setAutoplay] = useState(false);

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