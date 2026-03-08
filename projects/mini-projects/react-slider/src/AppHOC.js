import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const withSlider = (BaseComponent, getData) => {
  return (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
      // setSlide(getDataFromSecondFetch());
      setSlide(getData());
    }, []);

    function changeSlide(i) {
      setSlide(slide => slide + i);
    }

    return <BaseComponent {...props}
                          slide={slide}
                          autoplay={autoplay}
                          setAutoplay={setAutoplay}
                          changeSlide={changeSlide} />;
  };
};

const getDataFromFirstFetch = () => {
  return 10;
};
const getDataFromSecondFetch = () => {
  return 20;
};

const SliderFirst = (props) => {
/*  const [slide, setSlide] = useState(0);
  useEffect(() => {
    setSlide(getDataFromFirstFetch());
  }, []);
  function changeSlide(i) {
    setSlide(slide => slide + i);
  } */

  return (
    <Container>
      <div className="slider w-50 m-auto my-5">
        <h1 className="text-center">{props.name}</h1>
        <img className="d-block w-100" src="/assets/img/10.webp" alt="slide"/>
        <div className="text-center mt-5">Active slide {props.slide}</div>
        <div className="buttons mt-3 d-flex justify-content-center">
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(-1)}>-1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(1)}>+1
          </button>
        </div>
      </div>
    </Container>
  );
};

const SliderSecond = (props) => {
/*  const [slide, setSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  useEffect(() => {
    setSlide(getDataFromSecondFetch());
  }, []);
  function changeSlide(i) {
    setSlide(slide => slide + i);
  } */

  return (
    <Container>
      <div className="slider w-50 m-auto my-5">
        <h2 className="text-center">{props.name}</h2>
        <img className="d-block w-100" src="/assets/img/11.webp" alt="slide"/>
        <div className="text-center mt-5">Active slide {props.slide} <br/>{props.autoplay ? 'auto' : null} </div>
        <div className="buttons mt-3 d-flex justify-content-center">
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(-1)}>-1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(1)}>+1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.setAutoplay(autoplay => !autoplay)}>toggle autoplay
          </button>
        </div>
      </div>
    </Container>
  );
};

const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch);
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch);

const withLogger = (WrappedComponent) => (props) => {
  useEffect(() => {
    console.log('First render happened');
  }, [])

  return <WrappedComponent {...props} />;
}

const TitleComponent = (props) => {
  return <p className="text-center display-4">{props.title}</p>;
}

const TitleComponentWithLogger = withLogger(TitleComponent);

function AppHOC() {
  return (
    <>
      {/*<SliderFirst/>*/}
      {/*<SliderSecond/>*/}
      <TitleComponentWithLogger title='Hello!'/>
      <SliderWithFirstFetch name='The beautiful Eiffel Tower' />
      <hr/>
      <SliderWithSecondFetch name='Another Eiffel Tower slider' />
    </>
  );
}

export default AppHOC;